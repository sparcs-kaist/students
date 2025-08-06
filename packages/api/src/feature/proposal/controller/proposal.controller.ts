import { Controller, Get } from "@nestjs/common";

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ProposalPublicService } from "../service/proposal.public.service";
import { MProjectProposal } from "../model/project-proposal.model";

@Controller()
export class ProposalController {
  constructor(private readonly proposalService: ProposalPublicService) {}

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
