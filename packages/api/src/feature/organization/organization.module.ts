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
    OrganizationPublicService,
    OrganizationPresidentRepository,
    OrganizationMemberRepository,
    OrganizationManagerRepository,
  ],
  exports: [OrganizationPublicService],
})
export class OrganizationModule {}
