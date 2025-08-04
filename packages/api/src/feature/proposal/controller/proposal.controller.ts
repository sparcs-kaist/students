import { Controller, Get } from "@nestjs/common";

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ProposalService } from "../service/proposal.service";
import { MProjectProposal } from "../model/project-proposal.model";

@Controller()
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Public()
  @Get("/proposal/hello")
  async hello(): Promise<MProjectProposal> {
    return {
      id: 1,
      organization: {
        id: 1,
      },
      semester: {
        id: 1,
      },
    };
  }
}
