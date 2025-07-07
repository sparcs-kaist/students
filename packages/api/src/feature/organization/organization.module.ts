import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { OrganizationService } from "./service/organization.service";
import { OrganizationController } from "./controller/organization.controller";
import { OrganizationPublicService } from "./service/organization.public.service";
import { OrganizationRepository } from "./repository/organization.repository";
import { TeamRepository } from "./repository/organization.team.repository";

@Module({
  imports: [DrizzleModule, SemesterModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationRepository,
    TeamRepository,
    OrganizationPublicService,
  ],
  exports: [OrganizationPublicService],
})
export class OrganizationModule {}
