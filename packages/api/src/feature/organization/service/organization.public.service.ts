import { Injectable } from "@nestjs/common";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import {
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";

import { ITeamRequestCreate } from "@sparcs-students/interface/api/organization/type/organization.type";
import {
  ITeamMemberRequestCreate,
  ITeamLeaderRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { OrganizationRepository } from "../repository/organization.repository";
import { TeamRepository } from "../repository/organization.team.repository";
import { TeamMemberRepository } from "../repository/organization.team.member.repository";
import { TeamLeaderRepository } from "../repository/organization.team.leader.repository";

@Injectable()
export class OrganizationPublicService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly teamRepository: TeamRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamLeaderRepository: TeamLeaderRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  // TODO: Public 서비스에서 제외
  async postOrganizationTeamForPresident(
    body: ITeamRequestCreate,
  ): Promise<ApiOrg007ResponseCreated> {
    // TODO: 중복 확인
    const newTeam = await this.teamRepository.create(body);
    return { team: newTeam[0] };
  }

  // TODO: Public 서비스에서 제외
  async postOrganizationTeamMemberForPresident(
    body: ITeamMemberRequestCreate,
  ): Promise<ApiOrg008ResponseCreated> {
    // TODO: 중복 확인
    const newMember = await this.teamMemberRepository.create(body);
    return { teamMemberId: newMember[0] };
  }

  // TODO: Public 서비스에서 제외
  async postOrganizationTeamLeaderForPresident(
    body: ITeamLeaderRequestCreate,
  ): Promise<ApiOrg009ResponseCreated> {
    // TODO: 중복 확인
    const newMember = await this.teamLeaderRepository.create(body);
    return { teamLeaderId: newMember[0] };
  }
}
