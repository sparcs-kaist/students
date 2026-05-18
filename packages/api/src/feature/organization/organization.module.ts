import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { OrganizationService } from "./service/organization.service";
import { OrganizationUapresidentController } from "./controller/organization.uapresident.controller";
import { OrganizationPresidentController } from "./controller/organization.president.controller";
import { OrganizationController } from "./controller/organization.controller";
import { OrganizationPublicService } from "./service/organization.public.service";
import { OrganizationRepository } from "./repository/organization.repository";
import { OrganizationPresidentRepository } from "./repository/organization.president.repository";
import { OrganizationMemberRepository } from "./repository/organization.member.repository";
import { OrganizationManagerRepository } from "./repository/organization.manager.repository";
import { TeamRepository } from "./repository/organization.team.repository";
import { TeamMemberRepository } from "./repository/organization.team.member.repository";
import { TeamLeaderRepository } from "./repository/organization.team.leader.repository";
import { OperatingCommitteeRepository } from "./repository/organization.operatingcommittee.repository";
import { OperatingCommitteeMemberRepository } from "./repository/organization.operatingcommittee.member.repository";
import { StaffRepository } from "./repository/staff.repository";
import { UapresidentRepository } from "./repository/uapresident.repository";

@Module({
  imports: [DrizzleModule, SemesterModule],
  controllers: [
    OrganizationUapresidentController,
    OrganizationPresidentController,
    OrganizationController,
  ],
  providers: [
    OrganizationService,
    OrganizationRepository,
    TeamRepository,
    TeamMemberRepository,
    TeamLeaderRepository,
    OrganizationPublicService,
    OrganizationPresidentRepository,
    OrganizationMemberRepository,
    OrganizationManagerRepository,
    OperatingCommitteeRepository,
    OperatingCommitteeMemberRepository,
    StaffRepository,
    UapresidentRepository,
  ],
  exports: [OrganizationPublicService],
})
export class OrganizationModule {}
