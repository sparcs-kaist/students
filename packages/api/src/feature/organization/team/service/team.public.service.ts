import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TeamT } from "@sparcs-students/api/drizzle/schema";
import { TeamRepository } from "../repository/team.repository";

@Injectable()
export class TeamPublicService {
  constructor(private readonly teamRepository: TeamRepository) {}

  /**
   * @param teamId
   * @returns TeamT id에 해당하는 TeamT 객체를 리턴합니다.
   * @description 해당 id의 Team이 없으면 404 exception을 throw 합니다.
   */
  async getTeamById(teamId: number): Promise<TeamT> {
    const res = await this.teamRepository.selectTeam({ id: teamId });
    if (res.length === 0) {
      throw new NotFoundException(`Team with ID ${teamId} not found.`);
    } else if (res.length > 1) {
      throw new HttpException(
        `Unreachable: Team with ID ${teamId} has multiple records.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res[0];
  }
}
