import { Module, forwardRef } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserModule } from "src/feature/user/user.module";
import { SemesterModule } from "src/feature/semester/semester.module";
import { TeamService } from "./service/team.service";
import { TeamController } from "./controller/team.controller";
import { TeamRepository } from "./repository/team.repository";
/* eslint-disable import/no-cycle */
import { OrganizationModule } from "../organization.module";
import { TeamPublicService } from "./service/team.public.service";
/* eslint-disable import/no-cycle */

@Module({
  imports: [
    DrizzleModule,
    UserModule,
    SemesterModule,
    forwardRef(() => OrganizationModule),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, TeamPublicService],
  exports: [TeamPublicService],
})
export class TeamModule {}
