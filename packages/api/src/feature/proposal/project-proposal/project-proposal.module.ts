import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";
import { OrganizationModule } from "src/feature/organization/organization.module";
import { ProjectProposalRepository } from "./project-proposal.repository";
import { ProjectProposalService } from "./project-proposal.service";
import { ProjectProposalController } from "./project-proposal.controller";

@Module({
  imports: [OrganizationModule, DrizzleModule],
  providers: [ProjectProposalRepository, ProjectProposalService],
  controllers: [ProjectProposalController],
})
export class ProjectProposalModule {}
