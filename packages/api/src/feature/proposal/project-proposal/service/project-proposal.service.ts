import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  ApiPrp001RequestQuery,
  ApiPrp001ResponseOK,
  ApiPrp002ResponseOK,
  ApiPrp004RequestBody,
  ApiPrp004ResponseCreated,
  ApiPrp005RequestBody,
  ApiPrp005RequestParam,
  ApiPrp005ResponseOK,
  ApiPrp006RequestBody,
  ApiPrp006ResponseOK,
} from "@sparcs-students/interface/api/proposal/index";
import { UserPublicService } from "@sparcs-students/api/feature/user/service/user.public.service";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/semester.public.service";
import { OrganizationPublicService } from "src/feature/organization/service/organization.public.service";
import { TeamPublicService } from "src/feature/organization/team/service/team.public.service";
import { ProjectProposalRepository } from "../repository/project-proposal.repository";

@Injectable()
export class ProjectProposalService {
  constructor(
    private readonly projectProposalRepository: ProjectProposalRepository,
    private readonly organizationPublicService: OrganizationPublicService,
    private readonly userPublicService: UserPublicService,
    private readonly teamPublicService: TeamPublicService,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getProjectProposalsForStudentsBySemesterId(
    param: ApiPrp001RequestQuery,
  ): Promise<ApiPrp001ResponseOK> {
    const organizationInfo =
      await this.organizationPublicService.getOrganizationWithPresidentByOrganizationIdAndSemesterId(
        param.organizationId,
        param.semesterId,
      );
    const projectProposals =
      await this.projectProposalRepository.getProjectProposalsForStudentsByOrganizationIdAndSemesterId(
        param.organizationId,
        param.semesterId,
      );
    if (projectProposals.length === 0) {
      throw new NotFoundException(
        `ProjectProposals with Organization ID ${param.organizationId} and semesterId ${param.semesterId} not found`,
      );
    }

    const submitDate =
      await this.projectProposalRepository.getProjectProposalSubmitDate(
        param.organizationId,
        param.semesterId,
      );
    if (submitDate.length === 0) {
      throw new NotFoundException(
        `ProjectProposal submitdate with Organization ID ${param.organizationId} and semesterId ${param.semesterId} not found`,
      );
    } else if (submitDate.length > 1) {
      throw new HttpException(
        "unreachable: multiple submitDate",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      semesterId: param.semesterId,
      organizationId: param.organizationId,
      organizationName: organizationInfo.organization.name,
      organizationPresidentId: organizationInfo.user.id,
      organizationPresidentName: organizationInfo.user.name,
      submitDate: submitDate[0],
      projects: projectProposals,
    };
  }

  async getProjectProposalByIdForStudent(
    projectId: number,
  ): Promise<ApiPrp002ResponseOK> {
    const prpRevs =
      await this.projectProposalRepository.getProjectProposalRevisionById(
        projectId,
      );
    if (prpRevs.length === 0) {
      throw new NotFoundException(
        `ProjectProposal with Project ID ${projectId} not found`,
      );
    }
    const projectProposalRevision = prpRevs[0];

    const team = await this.teamPublicService.getTeamById(
      projectProposalRevision.teamId,
    );
    const manager = await this.userPublicService.getUserById(
      projectProposalRevision.managerId,
    );

    const timeLines =
      await this.projectProposalRepository.getProjectProposalTimelinesByProjectId(
        projectId,
      );

    return {
      projectName: projectProposalRevision.name,
      startTerm: projectProposalRevision.startTerm,
      endTerm: projectProposalRevision.endTerm,
      teamName: team.name,
      managerName: manager.name,
      purpose: projectProposalRevision.purpose,
      target: projectProposalRevision.target,
      detail: projectProposalRevision.detail,
      timeLines,
      budgetProposals: undefined,
    };
  }

  async postProjectProposal(
    body: ApiPrp004RequestBody,
  ): Promise<ApiPrp004ResponseCreated> {
    // semetster 존재하는 지 확인
    await this.semesterPublicService.getSemesterById(body.semesterId);
    // organization 존재하는 지 확인
    await this.organizationPublicService.getOrganizationById(
      body.organizationId,
    );
    // 해당 semester에 organization이 존재하는 지 확인
    const checkOrganizationInSemester =
      await this.organizationPublicService.checkOrganizationInSemester(
        body.organizationId,
        body.semesterId,
      );
    if (!checkOrganizationInSemester) {
      throw new NotFoundException(
        `Organization with ID ${body.organizationId} not found in semester with ID ${body.semesterId}`,
      );
    }

    // 제대로 들어갔는 지 count 하기 위한 용도
    const count1ProjectProposal =
      await this.projectProposalRepository.selectProjectProposal({
        organizationId: body.organizationId,
        semesterId: body.semesterId,
      });

    // ProjectProposal 생성
    const resPrpId = await this.projectProposalRepository.insertProjectProposal(
      body.organizationId,
      body.semesterId,
    );
    const count2ProjectProposal =
      await this.projectProposalRepository.selectProjectProposal({
        organizationId: body.organizationId,
        semesterId: body.semesterId,
      });

    // ProjectProposal 생성이 제대로 되었는 지 확인
    if (count1ProjectProposal.length + 1 !== count2ProjectProposal.length) {
      throw new HttpException(
        "ProjectProposal creation failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const count1ProjectProposalRevision =
      await this.projectProposalRepository.selectProjectProposalRevision({
        documentId: resPrpId,
        name: body.name,
      });

    // ProjectProposalRevision 생성
    const resPrpRevId =
      await this.projectProposalRepository.insertProjectProposalRevision(
        resPrpId,
        body.name,
      );

    const count2ProjectProposalRevision =
      await this.projectProposalRepository.selectProjectProposalRevision({
        documentId: resPrpId,
        name: body.name,
      });

    if (
      count1ProjectProposalRevision.length + 1 !==
      count2ProjectProposalRevision.length
    ) {
      throw new HttpException(
        "ProjectProposalRevision creation failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // ProjectProposal의 revisionId를 업데이트
    await this.projectProposalRepository.updateProjectProposal(
      {
        revisionId: resPrpId,
      },
      {
        revisionId: resPrpRevId,
      },
    );

    return {
      projectProposalId: resPrpId,
    };
  }

  async putProjectProposalContent(
    param: ApiPrp005RequestParam,
    body: ApiPrp005RequestBody,
  ): Promise<ApiPrp005ResponseOK> {
    // ProjectProposalRevision 존재하는 지 확인
    const prpRev =
      await this.projectProposalRepository.selectProjectProposalRevision({
        documentId: param.projectProposalId,
        orderByIdAsc: true,
      });
    if (prpRev.length === 0) {
      throw new NotFoundException(
        `ProjectProposalRevision with ProjectProposalID ${param.projectProposalId} not found`,
      );
    }
    const projectProposalRevision = prpRev[prpRev.length - 1];

    if (body.teamId || body.managerId) {
      const prp = await this.projectProposalRepository.selectProjectProposal({
        id: projectProposalRevision.documentId,
      });
      if (prp.length === 0) {
        throw new NotFoundException(
          `ProjectProposal with ID ${projectProposalRevision.documentId} not found`,
        );
      }
      const projectProposal = prp[0];
      const { organizationId } = projectProposal;
      // team, manager의 유효성 검사
      if (body.teamId) {
        const team = await this.teamPublicService.getTeamById(body.teamId);
        if (team.organizationId !== organizationId) {
          throw new HttpException(
            `Team with ID ${body.teamId} is not in Organization with ID ${organizationId}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (body.managerId) {
        await this.userPublicService.getUserById(body.managerId);
        const checkManagerInOrganization =
          await this.organizationPublicService.getOrganizationMemberByUserAndOrgAndSemester(
            body.managerId,
            organizationId,
            projectProposal.semesterId,
          );
        if (!checkManagerInOrganization) {
          throw new HttpException(
            `User with ID ${body.managerId} is not in Organization with ID ${organizationId} and Semester with ID ${projectProposal.semesterId}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
    // TODO: prepareStartTerm, prepareEndTerm, startTerm, endTerm의 유효성 검사 (이건 총학 정책이 필요할 듯)

    // 검증용 파라미터들
    let projectProposalRevisionUpdated: boolean;

    if (projectProposalRevision.submittedAt !== null) {
      // ProPrpRev가 제출된 상태 => 새로운 PrpRev를 생성해야 함
      const resPrpRevId =
        await this.projectProposalRepository.insertProjectProposalRevision(
          param.projectProposalId,
          body.name,
        );
      if (resPrpRevId === 0) {
        throw new HttpException(
          "ProjectProposalRevision creation failed",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // ProjectProposalRevision의 내용을 업데이트
      projectProposalRevisionUpdated =
        await this.projectProposalRepository.updateProjectProposalRevision(
          {
            ...body,
          },
          {
            id: resPrpRevId,
          },
        );
    } else {
      // ProPrpRev가 제출되지 않은 상태 => 해당 PrpRev를 업데이트
      projectProposalRevisionUpdated =
        await this.projectProposalRepository.updateProjectProposalRevision(
          {
            ...body,
          },
          {
            id: projectProposalRevision.id,
          },
        );
    }
    if (!projectProposalRevisionUpdated) {
      throw new HttpException(
        "ProjectProposalRevision update failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { projectProposalId: param.projectProposalId };
  }

  async putProjectProposalSubmit(
    body: ApiPrp006RequestBody,
  ): Promise<ApiPrp006ResponseOK> {
    await this.organizationPublicService.checkOrganizationInSemester(
      body.organizationId,
      body.semesterId,
    );

    // ProjectProposalRevision 존재하는 지 확인
    const unsubmittedPrpRevs =
      await this.projectProposalRepository.selectUnsubmittedProjectProposalRevisionWithProjectProposal(
        body.organizationId,
        body.semesterId,
      );
    if (unsubmittedPrpRevs.length === 0) {
      throw new NotFoundException(
        `Unsubmitted ProjectProposalRevision with Organization ID ${body.organizationId} and Semester ID ${body.semesterId} not found`,
      );
    }
    // ProjectProposalRevision 제출이 가능한 지 확인
    await Promise.all(
      unsubmittedPrpRevs.map(async row => {
        const revision = row.projectProposalRevision;

        // deleted_at 제외하고, 다른 값들이 null인지 체크
        const hasNullFields = Object.keys(revision)
          .filter(
            key =>
              key !== "deletedAt" &&
              key !== "agendaId" &&
              key !== "submittedAt",
          )
          .some(key => revision[key] === null);

        if (hasNullFields) {
          const nullKeys = Object.keys(revision).filter(
            key => revision[key] === null,
          );
          throw new HttpException(
            `ProjectProposalRevision with ID ${revision.id} has null fields, name: ${revision.name} || keys: ${JSON.stringify(nullKeys)}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }),
    );
    // ProjectProposalRevision 제출
    const unsubmittedPrpRevIds = unsubmittedPrpRevs.map(prpRev => ({
      projectProposalId: prpRev.projectProposal.id,
      projectProposalRevisionId: prpRev.projectProposalRevision.id,
    }));

    await this.projectProposalRepository.updateProjectProposalRevisionSubmit(
      unsubmittedPrpRevIds,
    );

    // ProjectProposalRevision 제출이 제대로 되었는 지 확인
    const unsubmittedPrpRevCheck =
      await this.projectProposalRepository.selectUnsubmittedProjectProposalRevisionWithProjectProposal(
        body.organizationId,
        body.semesterId,
      );

    if (unsubmittedPrpRevCheck.length !== 0) {
      throw new HttpException(
        "ProjectProposalRevision submission failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // ProjectProposal의 revisionId를 업데이트

    return {
      submittedIds: unsubmittedPrpRevIds,
    };
  }
}
