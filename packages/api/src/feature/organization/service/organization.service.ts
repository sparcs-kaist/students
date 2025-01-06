import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  ApiOrg001RequestParam,
  ApiOrg001ResponseOK,
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
  ApiOrg003RequestBody,
  ApiOrg003ResponseCreated,
  ApiOrg004RequestBody,
  ApiOrg004ResponseOK,
  ApiOrg005RequestBody,
  ApiOrg005ResponseCreated,
  ApiOrg006RequestBody,
  ApiOrg006ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";
import { OrganizationPresidentTypeE } from "@sparcs-students/interface/common/enum/organization.enum";

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { UserPublicService } from "src/feature/user/service/user.public.service";

import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly semesterPublicService: SemesterPublicService,
    private readonly userPublicService: UserPublicService,
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

  async postOrganizationPresident(
    body: ApiOrg003RequestBody,
  ): Promise<ApiOrg003ResponseCreated> {
    // president 가 있으면 president를 retire처리 하고, 새로운 president를 생성함.

    const ckAlready =
      await this.organizationRepository.ckOrganizationPresidentAlready(
        body.userId,
      );

    if (ckAlready > 0) {
      throw new HttpException(
        "Organization President already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    const { ignorePrev, ...bodyExceptIgnorePrev } = body;
    if (!ignorePrev) {
      const ck =
        await this.organizationRepository.ckOrganizationPresidentBeforeCreate(
          bodyExceptIgnorePrev,
        );
      if (ck > 0) {
        // 기존의 president 존재 -> replace하기
        const previousDay = new Date(body.startTerm); // body.startTerm 복사
        previousDay.setDate(previousDay.getDate() - 1); // 하루 감소
        const update =
          await this.organizationRepository.updateOrganizationPresidentRetire(
            ck, // organizationPresidentId
            previousDay, // endTerm
          );
        if (update < 1) {
          throw new HttpException(
            "Failed to update organization president",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } else if (
      body.organizationPresidentTypeE === OrganizationPresidentTypeE.Chief
    ) {
      // ignorePrev: true 가 cheif인 경우를 거르기 위함

      throw new HttpException(
        "Chief cannot be ignorePrev",
        HttpStatus.BAD_REQUEST,
      );
    }
    const organizationPresidentId =
      await this.organizationRepository.createOrganizationPresident(
        bodyExceptIgnorePrev,
      );

    if (organizationPresidentId < 1) {
      throw new HttpException(
        "Failed to create organization President",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { organizationPresidentId };
  }

  async putOrganizationPresidentRetire(
    body: ApiOrg004RequestBody,
  ): Promise<ApiOrg004ResponseOK> {
    const resSelectPresident =
      await this.organizationRepository.selectOrganizationPresidentById(
        body.organizationPresidentId,
      );
    if (resSelectPresident.length === 0) {
      throw new NotFoundException("Organization President not found");
    } else if (resSelectPresident[0].endTerm !== null) {
      throw new HttpException(
        "Organization President already retired",
        HttpStatus.BAD_REQUEST,
      );
    }
    const update =
      await this.organizationRepository.updateOrganizationPresidentRetire(
        body.organizationPresidentId,
        body.endTerm,
      );
    if (update < 1) {
      throw new HttpException(
        "Failed to update organization president",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const res =
      await this.organizationRepository.selectOrganizationPresidentById(
        body.organizationPresidentId,
      );
    if (res.length === 0 || res.length > 1) {
      throw new HttpException("Unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      organizationPresidentId: res[0].id,
      organizationId: res[0].organizationId,
      userId: res[0].userId,
      startTerm: res[0].startTerm,
      endTerm: res[0].endTerm,
      organizationPresidentTypeE: res[0].organizationPresidentTypeEnumId,
      phoneNumber: res[0].phoneNumber,
    };
  }

  async postOrganizationMember(
    body: ApiOrg005RequestBody,
  ): Promise<ApiOrg005ResponseCreated> {
    await this.userPublicService.getUserById(body.userId); // user 존재하는지 확인

    const ckMemberAlready =
      await this.organizationRepository.ckOrganizationMemberBeforeCreate(body);
    if (ckMemberAlready > 0) {
      throw new HttpException(
        "Organization Member already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const organizationMemberId =
      await this.organizationRepository.createOrganizationMember(body);
    if (organizationMemberId < 1) {
      throw new HttpException(
        "Failed to create organization member",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { organizationMemberId };
  }

  async postOrganizationManager(
    body: ApiOrg006RequestBody,
  ): Promise<ApiOrg006ResponseCreated> {
    await this.userPublicService.getUserById(body.userId); // user 존재하는지 확인

    // member 존재하는지 확인
    const memberCheck =
      await this.organizationRepository.selectOrganizationMemberByUserIdAndOrganizationId(
        body.userId,
        body.organizationId,
      );
    if (memberCheck.length === 0) {
      throw new NotFoundException("Organization Member not exists");
    }

    // member의 기간이 semester 기간 안에 있는 지 확인. 일부 겹치는 것은 허용
    const { startTerm, endTerm } =
      await this.semesterPublicService.getSemesterById(body.semesterId);
    memberCheck.forEach(member => {
      if (
        member.startTerm > endTerm ||
        (member.endTerm !== null && member.endTerm < startTerm)
      ) {
        // 해당 멤버가 해당 학기 기간에 조금도 겹치지 않는 경우
        throw new HttpException(
          "Organization Member is not in semester",
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    const ckManagerAlready =
      await this.organizationRepository.ckOrganizationManagerBeforeCreate(body);
    if (ckManagerAlready > 0) {
      throw new HttpException(
        "Organization Manager already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const organizationManagerId =
      await this.organizationRepository.createOrganizationManager(body);
    if (organizationManagerId < 1) {
      throw new HttpException(
        "Failed to create organization manager",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { organizationManagerId };
  }
}
