import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  ApiOrg001RequestParam,
  ApiOrg001ResponseOK,
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
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

  async postOrganization(
    body: ApiOrg002RequestBody,
  ): Promise<ApiOrg002ResponseCreated> {
    const ck =
      await this.organizationRepository.ckOrganizationBeforeCreate(body);
    if (ck > 0) {
      throw new HttpException(
        "Organization already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const organizationId =
      await this.organizationRepository.createOrganization(body);
    if (organizationId < 1) {
      throw new HttpException(
        "Failed to create organization",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { organizationId };
  }
}
