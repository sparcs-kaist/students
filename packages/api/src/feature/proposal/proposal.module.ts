import { Module } from "@nestjs/common";
import { ProjectProposalModule } from "./project-proposal/project-proposal.module";

@Module({
  imports: [ProjectProposalModule],
})
export class ProposalModule {}
