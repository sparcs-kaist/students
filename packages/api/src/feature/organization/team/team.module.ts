import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserModule } from "src/feature/user/user.module";
import { TeamService } from "./service/team.service";
import { TeamController } from "./controller/team.controller";
import { TeamRepository } from "./repository/team.repository";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [],
})
export class TeamModule {}
