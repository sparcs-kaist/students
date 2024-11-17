import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { OrganizationService } from "./service/organization.service";
import { OrganizationController } from "./controller/organization.controller";

@Module({
  imports: [DrizzleModule, SemesterModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
