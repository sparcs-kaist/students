import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BaseRepositoryQuery } from "@sparcs-students/api/common/base/base.repository";
import { OrganizationRepository } from "../repository/organization.repository";
import { OrganizationPresidentRepository } from "../repository/organization.president.repository";
import { OrganizationMemberRepository } from "../repository/organization.member.repository";

type OrganizationPresidentQuery = {
  id: number;
  organizationId: number;
  organizationPresidentTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationPresidentRepository: OrganizationPresidentRepository,
    private readonly organizationMemberRepository: OrganizationMemberRepository,
  ) {}

  async createOrganization(body) {
    const organizationData = body.organization;

    // name 중복 확인
    const existing = await this.organizationRepository.find({
      name: organizationData.name,
    });
    if (existing.length > 0) {
      throw new ConflictException("existing organization.");
    }

    // 생성
    const newOrganization =
      await this.organizationRepository.create(organizationData);
    return {
      organization: newOrganization,
    };
  }

  async createPresident(body) {
    const { OrganizationPresident, ignorePrev } = body;

    // 기존 단체장 확인
    const existingPresident = await this.organizationPresidentRepository.find({
      organizationId: OrganizationPresident.organization.id,
      organizationPresidentTypeEnum:
        OrganizationPresident.organizationPresidentTypeEnum,
      endTerm: null,
    });
    // 중복 확인
    if (!ignorePrev && existingPresident.length > 0) {
      throw new ConflictException({
        status: "Error",
        message: "Already President existed",
      });
    }
    // 부회장은 중복 가능
    if (
      ignorePrev &&
      OrganizationPresident.organizationPresidentTypeEnum === 1
    ) {
      throw new ForbiddenException({
        status: "Error",
        message: "President cannot be duplicated",
      });
    }

    const existingMember = await this.organizationMemberRepository.find({
      organizationId: OrganizationPresident.organization.id,
      studentId: OrganizationPresident.student.id,
      endTerm: null,
    });

    if (existingMember.length === 0) {
      await this.organizationMemberRepository.create({
        organization: OrganizationPresident.organization,
        student: OrganizationPresident.student,
        duration: OrganizationPresident.duration,
      });
    }

    const createdPresident = await this.organizationPresidentRepository.create(
      OrganizationPresident,
    );

    return { organizationPresident: createdPresident };
  }

  async retirePresident(presidentId: number, body: { endTerm: Date }) {
    const presidentList = [
      await this.organizationPresidentRepository.fetch(presidentId),
    ];

    if (presidentList.length === 0) {
      throw new NotFoundException("President not found");
    }

    const president = presidentList[0];

    if (
      president.duration.endTerm !== undefined &&
      president.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const updatedPresident = await this.organizationPresidentRepository.patch(
      { id: presidentId } as BaseRepositoryQuery<
        OrganizationPresidentQuery,
        number
      >,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: body.endTerm,
        },
      }),
    );

    return {
      organizationPresident: updatedPresident[0],
    };
  }

  async createMember(body) {
    const { OrganizationMember } = body;

    const existingMember = await this.organizationMemberRepository.find({
      organizationId: OrganizationMember.organization.id,
      studentId: OrganizationMember.student.id,
      endTerm: null,
    });

    if (existingMember.length === 0) {
      await this.organizationMemberRepository.create({
        organization: OrganizationMember.organization,
        student: OrganizationMember.student,
        duration: OrganizationMember.duration,
      });
    } else {
      throw new ConflictException({
        status: "Error",
        message: "Already Member",
      });
    }

    const createdMember = await this.organizationMemberRepository.find({
      organizationId: OrganizationMember.organization.id,
      studentId: OrganizationMember.student.id,
    });

    return { organizationPresident: createdMember };
  }
}
