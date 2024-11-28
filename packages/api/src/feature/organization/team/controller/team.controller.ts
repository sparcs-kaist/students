import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
  ApiOrg007RequestBody,
  ApiOrg007RequestUrl,
  ApiOrg007ResponseCreated,
  apiOrg007,
} from "@sparcs-students/interface/api/organization/index";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";

import { TeamService } from "../service/team.service";

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post(ApiOrg007RequestUrl)
  @UsePipes(new ZodPipe(apiOrg007))
  async postTeam(
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    return this.teamService.postTeam(body);
  }
}
