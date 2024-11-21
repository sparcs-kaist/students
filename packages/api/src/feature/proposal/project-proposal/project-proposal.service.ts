import { Injectable, NotFoundException } from "@nestjs/common";

import {
  ApiPrp001RequestQuery,
  ApiPrp001ResponseOK,
} from "@sparcs-students/interface/api/proposal/index";
import { OrganizationPublicService } from "src/feature/organization/service/organization.public.service";
import { ProjectProposalRepository } from "./project-proposal.repository";

@Injectable()
export class ProjectProposalService {
  constructor(
    private readonly projectProposalRepository: ProjectProposalRepository,
    private readonly organizationPublicService: OrganizationPublicService,
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
}
