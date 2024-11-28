import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  ApiOrg007RequestBody,
  ApiOrg007ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";
import { UserPublicService } from "@sparcs-students/api/feature/user/service/user.public.service";
import { TeamRepository } from "../repository/team.repository";

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async postTeam(
    body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    const ck = await this.teamRepository.ckTeamBeforeCreate(body);
    if (ck !== 0) {
      throw new HttpException("Team already exists", HttpStatus.BAD_REQUEST);
    }
    const teamId = await this.teamRepository.insertTeam(body);
    if (teamId === 0) {
      throw new HttpException(
        "Team creation failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { teamId };
  }
}
