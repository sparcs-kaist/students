import { Injectable, Inject } from "@nestjs/common";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import {
  ApiOrg001ResponseOK,
  ApiOrg002ResponseCreated,
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { OrganizationTypeEnum } from "@sparcs-students/interface/common/enum/organization.enum";

import {
  IOrganizationRequestCreate,
  ITeamRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import {
  ITeamMemberRequestCreate,
  ITeamLeaderRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { OrganizationRepository } from "../repository/organization.repository";
import { TeamRepository } from "../repository/team.repository";
import { TeamLeaderRepository } from "../repository/team.leader.repository";
import { TeamMemberRepository } from "../repository/team.member.repository";

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
    private readonly organizationRepository: OrganizationRepository,
    private readonly teamRepository: TeamRepository,
    private readonly teamLeaderRepository: TeamLeaderRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getOrganizationsLookUp(): Promise<ApiOrg001ResponseOK> {
    const halfYears = await this.semesterPublicService.fetchHalfYearAll();
    const result = await Promise.all(
      halfYears.map(async halfYear => {
        const organizations = await this.organizationRepository.fetchAll(
          halfYear.duration,
        );

        // OrganizationType별로 그룹화
        const organizationTypeMap = new Map<
          OrganizationTypeEnum,
          { organizations: typeof organizations }
        >();

        organizations.forEach(org => {
          if (!organizationTypeMap.has(org.organizationTypeEnum)) {
            organizationTypeMap.set(org.organizationTypeEnum, {
              organizations: [],
            });
          }
          organizationTypeMap
            .get(org.organizationTypeEnum)
            ?.organizations.push(org);
        });

        // organizationTypeMap을 배열로 변환
        const organizationTypes = Array.from(organizationTypeMap.entries()).map(
          ([type, data]) => ({
            organizationTypeEnum: type, // OrganizationTypeEnum의 int 값
            organizations: data.organizations,
          }),
        );

        return {
          halfYear,
          organizationTypes,
        };
      }),
    );
    return { organizationLists: result };
  }

  async postUAPresidentOrganization(
    name: IOrganizationRequestCreate["name"],
    nameEng: IOrganizationRequestCreate["nameEng"],
    organizationTypeEnum: IOrganizationRequestCreate["organizationTypeEnum"],
    foundingYear: IOrganizationRequestCreate["foundingYear"],
    duration: IOrganizationRequestCreate["duration"],
    organizationStateEnum: IOrganizationRequestCreate["organizationStateEnum"],
  ): Promise<ApiOrg002ResponseCreated> {
    // TODO: 총학생회장 권한 검증

    const organization = await this.organizationRepository.insert({
      name,
      nameEng,
      organizationTypeEnum,
      foundingYear,
      duration,
      organizationStateEnum,
    });

    return { organization };
  }

  async postPresidentOrganizationsTeam(
    name: ITeamRequestCreate["name"],
    organization: ITeamRequestCreate["organization"],
    duration: ITeamRequestCreate["duration"],
  ): Promise<ApiOrg007ResponseCreated> {
    const team = await this.teamRepository.insert({
      name,
      organization,
      duration,
    });

    return { id: team.id };
  }

  async postPresidentOrganizationsTeamsMember(
    duration: ITeamMemberRequestCreate["duration"],
    team: ITeamMemberRequestCreate["team"],
    student: ITeamMemberRequestCreate["student"],
  ): Promise<ApiOrg008ResponseCreated> {
    const member = await this.teamMemberRepository.insert({
      duration,
      team,
      student,
    });

    return { id: member.id };
  }

  async postPresidentOrganizationsTeamsLeader(
    duration: ITeamLeaderRequestCreate["duration"],
    student: ITeamLeaderRequestCreate["student"],
    team: ITeamLeaderRequestCreate["team"],
    title: ITeamLeaderRequestCreate["title"],
  ): Promise<ApiOrg009ResponseCreated> {
    const leader = await this.teamLeaderRepository.insert({
      duration,
      team,
      student,
      title,
    });

    return { id: leader.id };
  }
}
