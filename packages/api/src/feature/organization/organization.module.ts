import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { UserModule } from "src/feature/user/user.module";
import { OrganizationService } from "./service/organization.service";
import { OrganizationController } from "./controller/organization.controller";
import { OrganizationPublicService } from "./service/organization.public.service";
import { OrganizationRepository } from "./repository/organization.repository";

@Module({
  imports: [DrizzleModule, SemesterModule, UserModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationRepository,
    OrganizationPublicService,
  ],
  exports: [OrganizationPublicService],
})
export class OrganizationModule {}
