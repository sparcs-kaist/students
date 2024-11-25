import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrganizationT, TeamT } from "src/drizzle/schema";
import { SemesterPublicService } from "src/feature/semester/semester.public.service";

import {
  OrganizationRepository,
  OrganizationWithPresidentT,
} from "../repository/organization.repository";

@Injectable()
export class OrganizationPublicService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  /**
   * @param id organization id
   * @returns OrganizationT id에 해당하는 OrganizationT 객체를 리턴합니다.
   * @description 해당 id의 organization이 없으면 404 exception을 throw 합니다.
   */
  async getOrganizationById(id: number): Promise<OrganizationT> {
    const organizations =
      await this.organizationRepository.getOrganizationById(id);
    if (organizations.length === 0) {
      throw new NotFoundException(`Organization with ID ${id} not found.`);
    }
    return organizations[0];
  }

  /**
   * @param id organizationId, date
   * @returns OrganizationT id에 해당하는 OrganizationT 객체를 리턴합니다.
   * @description 해당 id의 organization이 없으면 404 exception을 throw 합니다.
   */
  async getOrganizationWithPresidentByIdAndDate(
    id: number,
    date: Date,
  ): Promise<OrganizationWithPresidentT> {
    const organizations =
      await this.organizationRepository.getOrganizationWithPresidentById(
        id,
        date,
      );
    if (organizations.length === 0) {
      throw new NotFoundException(`Organization with ID ${id} not found.`);
    } else if (organizations.length > 1) {
      throw new HttpException(
        `Unreachable: Organization with ID ${id} has multiple records.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return organizations[0];
  }

  /**
   * @param id organizationId, semesterId
   * @returns OrganizationT id에 해당하는 semester의 가장 후임인 OrganizationWithPresidentT 객체를 리턴합니다.
   * @description 해당 id의 organization이 없으면 404 exception을 throw 합니다.
   * 가장 후임인 이유는, 새학 등 학기 중에 president가 바뀔 가능성을 고려하였습니다.
   */
  async getOrganizationWithPresidentByOrganizationIdAndSemesterId(
    organizationId: number,
    semesterId: number,
  ): Promise<OrganizationWithPresidentT> {
    const { endTerm } =
      await this.semesterPublicService.getSemesterById(semesterId);

    const res = await this.getOrganizationWithPresidentByIdAndDate(
      organizationId,
      endTerm,
    );
    return res;
  }

  /**
   * @param teamId
   * @returns OrganizationWithPresidentT
   * @description 해당 id의 organization이 없으면 404 exception을 throw 합니다.
   * 가장 후임인 이유는, 새학 등 학기 중에 president가 바뀔 가능성을 고려하였습니다.
   */
  async getTeamById(teamId: number): Promise<TeamT> {
    const res = await this.organizationRepository.getTeamById(teamId);
    if (res.length === 0) {
      throw new NotFoundException(`Team with ID ${teamId} not found.`);
    }
    return res[0];
  }
}
