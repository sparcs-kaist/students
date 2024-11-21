import { Injectable } from "@nestjs/common";

import {
  ApiOrg001RequestParam,
  ApiOrg001ResponseOK,
} from "@sparcs-students/interface/api/organization/index";

import { SemesterPublicService } from "src/feature/semester/semester.public.service";

import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getOrganizationsBySemesterId(
    param: ApiOrg001RequestParam,
  ): Promise<ApiOrg001ResponseOK> {
    const { startTerm, endTerm } =
      await this.semesterPublicService.getSemesterById(param.semesterId);
    const organizations =
      await this.organizationRepository.getOrganizationsByTerms(
        startTerm,
        endTerm,
      );
    // 변환 작업: OriginalResponse -> ApiOrg001ResponseOK
    const organizationTypesMap = organizations.reduce((acc, curr) => {
      const { organization, organizationTypeEnum } = curr;
      // organization type이 이미 존재하는지 확인
      let organizationType = acc.get(organizationTypeEnum.id);
      if (!organizationType) {
        organizationType = {
          id: organizationTypeEnum.id,
          name: organizationTypeEnum.name,
          organizations: [],
        };
        acc.set(organizationTypeEnum.id, organizationType);
      }

      // organization 추가
      organizationType.organizations.push({
        id: organization.id,
        name: organization.name,
        name_eng: organization.nameEng,
      });

      return acc;
    }, new Map<number, ApiOrg001ResponseOK["organizationTypes"][number]>());

    // Map을 배열로 변환
    const organizationTypes = Array.from(organizationTypesMap.values());

    return { organizationTypes };
  }
}
