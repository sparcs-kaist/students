import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationT } from "src/drizzle/schema";
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
    }
    return organizations[0];
  }

  /**
   * @param id organizationId, semesterId
   * @returns OrganizationT id에 해당하는 semester의 마지막 OrganizationWithPresidentT 객체를 리턴합니다.
   * @description 해당 id의 organization이 없으면 404 exception을 throw 합니다.
   */
  async getOrganizationWithPresidentByIdAndSemester(
    id: number,
    semesterId: number,
  ): Promise<OrganizationWithPresidentT> {
    const { endTerm } =
      await this.semesterPublicService.getSemesterById(semesterId);

    return this.getOrganizationWithPresidentByIdAndDate(id, endTerm);
  }
}
