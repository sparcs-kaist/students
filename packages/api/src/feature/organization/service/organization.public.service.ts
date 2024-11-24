import { Injectable, NotFoundException } from "@nestjs/common";

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
   * @param organizationId, date
   * @returns OrganizationWithPresidentT
   * @description 해당 시간의 해당 기관의 president 정보와 함께 반환합니다.
   */
  async getOrganizationWithPresidentByOrganizationIdAndDate(
    organizationId: number,
    date: Date,
  ): Promise<OrganizationWithPresidentT> {
    const res =
      await this.organizationRepository.getOrganizationWithPresidentById(
        organizationId,
        date,
      );
    if (!res) {
      throw new NotFoundException(
        `Organization with ID ${organizationId} not found.`,
      );
    }
    return res[0];
  }

  /**
   * @param organizationId, semesterId
   * @returns OrganizationWithPresidentT
   * @description 해당 학기 마지막 날의 해당 기관의 president 정보와 함께 반환합니다. 즉, 기간을 정확히 명시하기 보단 학기 id를 통해 찾을 수 있도록 합니다.
   */
  async getOrganizationWithPresidentByOrganizationIdAndSemesterId(
    organizationId: number,
    semesterId: number,
  ): Promise<OrganizationWithPresidentT> {
    const { endTerm } =
      await this.semesterPublicService.getSemesterById(semesterId);

    const res = await this.getOrganizationWithPresidentByOrganizationIdAndDate(
      organizationId,
      endTerm,
    );
    return res;
  }
}
