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
}
