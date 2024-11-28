import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { OrganizationModule } from "src/feature/organization/organization.module";
import { UserModule } from "src/feature/user/user.module";
import { ProjectProposalRepository } from "./repository/project-proposal.repository";
import { ProjectProposalService } from "./service/project-proposal.service";
import { ProjectProposalController } from "./controller/project-proposal.controller";

@Module({
  imports: [OrganizationModule, DrizzleModule, UserModule],
  providers: [ProjectProposalRepository, ProjectProposalService],
  controllers: [ProjectProposalController],
})
export class ProjectProposalModule {}
