import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrganizationMemberT, OrganizationT } from "src/drizzle/schema";
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
   * @param userId, organizationId, startTerm, endTerm
   * @returns OrganizationMemeberT 해당 학기 해당 단체에 해당하는 OrganizationMemberT 객체를 리턴합니다.
   * @description 해당 시기에 해당하는 OrganizationMember가 없으면 404 exception을 throw 합니다.
   */
  async getOrganizationMemberByUserAndOrgAndDate(
    userId: number,
    organizationId: number,
    startTerm: Date,
    endTerm: Date,
  ): Promise<OrganizationMemberT> {
    const res = await this.organizationRepository.selectOrganizationMember({
      userId,
      startTerm,
      endTerm,
      organizationId,
    });
    if (res.length === 0) {
      throw new NotFoundException(
        `OrganizationMember with userId ${userId} not found.`,
      );
    } else if (res.length > 1) {
      throw new HttpException(
        `Unreachable: OrganizationMember with userId ${userId} has multiple records.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res[0];
  }

  /**
   * @param userId, organizationId, semesterId
   * @returns OrganizationMemeberT 해당 학기 해당 단체에 해당하는 OrganizationMemberT 객체를 리턴합니다.
   * @description 해당 시기에 해당하는 OrganizationMember가 없으면 404 exception을 throw 합니다.
   */
  async getOrganizationMemberByUserAndOrgAndSemester(
    userId: number,
    organizationId: number,
    semesterId: number,
  ): Promise<OrganizationMemberT> {
    const { startTerm, endTerm } =
      await this.semesterPublicService.getSemesterById(semesterId);
    return this.getOrganizationMemberByUserAndOrgAndDate(
      userId,
      organizationId,
      startTerm,
      endTerm,
    );
  }

  /**
   * @param organizationId, semesterId
   * @returns boolean 단체가 해당 학기에 존재했으면 true, 아니면 false를 리턴합니다.
   * @description organizationId에 해당하는 단체가 semesterId에 해당하는 학기에 존재하는지 확인합니다.
   * 해당 시기에 해당하는 Organization이 없었더라도 404Error를 발생시키지 않습니다.
   */
  async checkOrganizationInSemester(
    organizationId: number,
    semesterId: number,
  ): Promise<boolean> {
    const semester =
      await this.semesterPublicService.getSemesterById(semesterId);
    const organizations = await this.organizationRepository.selectOrganization({
      id: organizationId,
      startTerm: semester.startTerm,
      endTerm: semester.endTerm,
    });
    if (organizations.length > 1) {
      throw new HttpException(
        `Unreachable: Organization with ID ${organizationId} has multiple records.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return organizations.length !== 0;
  }
}
