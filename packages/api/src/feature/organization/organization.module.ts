import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { OrganizationService } from "./service/organization.service";
import { OrganizationuapresidentController } from "./controller/organization.uapresident.controller";
import { OrganizationpresidentController } from "./controller/organization.president.controller";
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

@Module({
  imports: [DrizzleModule, SemesterModule],
  controllers: [
    OrganizationuapresidentController,
    OrganizationpresidentController,
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
  ],
  exports: [OrganizationPublicService],
})
export class OrganizationModule {}
