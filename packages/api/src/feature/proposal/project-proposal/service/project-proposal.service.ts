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
} from "@sparcs-students/interface/api/proposal/index";
import { UserPublicService } from "@sparcs-students/api/feature/user/service/user.public.service";
import { OrganizationPublicService } from "src/feature/organization/service/organization.public.service";
import { ProjectProposalRepository } from "../repository/project-proposal.repository";

@Injectable()
export class ProjectProposalService {
  constructor(
    private readonly projectProposalRepository: ProjectProposalRepository,
    private readonly organizationPublicService: OrganizationPublicService,
    private readonly userPublicService: UserPublicService,
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

    const team = await this.organizationPublicService.getTeamById(
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
}
