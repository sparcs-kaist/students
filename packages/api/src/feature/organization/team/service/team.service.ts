import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiOrg007RequestBody,
  ApiOrg007ResponseCreated,
  ApiOrg008RequestBody,
  ApiOrg008ResponseCreated,
  ApiOrg009RequestBody,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";
import { UserPublicService } from "@sparcs-students/api/feature/user/service/user.public.service";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { OrganizationPublicService } from "@sparcs-students/api/feature/organization/service/organization.public.service";
import { TeamRepository } from "../repository/team.repository";

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userPublicService: UserPublicService,
    private readonly organizationPublicService: OrganizationPublicService,
    private readonly semesterPublicService: SemesterPublicService,
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

  async postTeamMember(
    body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    // userId와 teamId의 유효성 체크
    await this.userPublicService.getUserById(body.userId);
    const ckTeam = await this.teamRepository.selectTeam({ id: body.teamId });
    if (ckTeam.length === 0) {
      throw new NotFoundException("Team not found");
    } else if (ckTeam.length > 1) {
      throw new HttpException(
        "Unreachable: Team has multiple records",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const { startTerm, endTerm } =
      await this.semesterPublicService.getSemesterById(ckTeam[0].semesterId);

    // team member OrganizationMember인지 체크
    await this.organizationPublicService.getOrganizationMemberByUserAndOrgAndSemester(
      body.userId,
      ckTeam[0].organizationId,
      ckTeam[0].semesterId,
    );

    // team member 중복 체크
    const ckMember = await this.teamRepository.ckTeamMemberBeforeCreate(
      body.userId,
      body.teamId,
    );
    if (ckMember !== 0) {
      throw new HttpException(
        "Team member already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    // team member 생성
    const teamMemberId = await this.teamRepository.insertTeamMember(
      body.userId,
      body.teamId,
      startTerm,
      endTerm,
    );
    if (teamMemberId === 0) {
      throw new HttpException(
        "Team member creation failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { teamMemberId };
  }

  async postTeamLeader(
    body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    // userId와 teamId의 유효성 체크
    await this.userPublicService.getUserById(body.userId);
    const ckTeam = await this.teamRepository.selectTeam({ id: body.teamId });
    if (ckTeam.length === 0) {
      throw new NotFoundException("Team not found");
    } else if (ckTeam.length > 1) {
      throw new HttpException(
        "Unreachable: Team has multiple records",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const { startTerm, endTerm } =
      await this.semesterPublicService.getSemesterById(ckTeam[0].semesterId);

    // team leader user 가 TeamMember인지 체크
    const countTeamMember = await this.teamRepository.selectTeamMember({
      userId: body.userId,
      teamId: body.teamId,
    });
    if (countTeamMember.length === 0) {
      throw new NotFoundException("Team member not found");
    } else if (countTeamMember.length > 1) {
      throw new HttpException(
        "Unreachable: Team member has multiple records",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // team leader 중복 체크
    const ckLeader = await this.teamRepository.ckTeamLeaderBeforeCreate(
      body.userId,
      body.teamId,
    );
    if (ckLeader !== 0) {
      throw new HttpException(
        "Team leader already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    // team leader 생성
    const teamLeaderId = await this.teamRepository.insertTeamLeader(
      body.userId,
      body.teamId,
      body.role,
      startTerm,
      endTerm,
    );
    if (teamLeaderId === 0) {
      throw new HttpException(
        "Team leader creation failed",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { teamLeaderId };
  }
}
