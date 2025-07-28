import { Injectable, Inject, ConflictException } from "@nestjs/common";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

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

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import { OrganizationRepository } from "../repository/organization.repository";
import { TeamRepository } from "../repository/organization.team.repository";
import { TeamMemberRepository } from "../repository/organization.team.member.repository";
import { TeamLeaderRepository } from "../repository/organization.team.leader.repository";

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
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
    // TODO: Type 수정
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await this.teamRepository.find({
      organizationId: body.organization.id,
      name: body.name,
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("duplicated team");
    }
    const newTeam = await this.teamRepository.create(body);
    return { team: newTeam[0] };
  }

  // TODO: Public 서비스에서 제외
  async postOrganizationTeamMemberForPresident(
    body: ITeamMemberRequestCreate,
  ): Promise<ApiOrg008ResponseCreated> {
    // TODO: Type 수정
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await this.teamMemberRepository.find({
      teamId: body.team.id,
      studentId: body.student.id,
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("duplicated member");
    }
    const newMember = await this.teamMemberRepository.create(body);
    return { teamMemberId: newMember[0] };
  }

  // TODO: Public 서비스에서 제외
  async postOrganizationTeamLeaderForPresident(
    body: ITeamLeaderRequestCreate,
  ): Promise<ApiOrg009ResponseCreated> {
    // TODO: Type 수정
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await this.teamLeaderRepository.find({
      teamId: body.team.id,
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("leader exists");
    }
    const newLeader = await this.teamLeaderRepository.create(body);
    return { teamLeaderId: newLeader[0] };
  }
}
