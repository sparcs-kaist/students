import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BaseRepositoryQuery } from "@sparcs-students/api/common/base/base.repository";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { OrganizationRepository } from "../repository/organization.repository";
import { OrganizationPresidentRepository } from "../repository/organization.president.repository";
import { OrganizationMemberRepository } from "../repository/organization.member.repository";
import { OrganizationManagerRepository } from "../repository/organization.manager.repository";

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
    private readonly organizationManagerRepository: OrganizationManagerRepository,
    private readonly semesterPublicService: SemesterPublicService,
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

  async getApplying() {
    const allOrganizations = await this.organizationRepository.find({});
    const semesters = await this.semesterPublicService.fetchSemesterAll();

    const organizationLists = await Promise.all(
      semesters.map(async semester => {
        const organizationsInSemester = allOrganizations.filter(
          org =>
            org.startTerm >= semester.startTerm &&
            (org.endTerm === null || org.startTerm <= semester.endTerm),
        );

        const typeMap = new Map();
        organizationsInSemester.forEach(org => {
          if (!typeMap.has(org.organizationTypeEnum)) {
            typeMap.set(org.organizationTypeEnum, []);
          }
          typeMap.get(org.organizationTypeEnum).push(org);
        });

        const organizationTypes = await Promise.all(
          Array.from(typeMap.entries()).map(
            async ([organizationTypeEnum, organizations]) => {
              const filteredOrganizations = await Promise.all(
                organizations.map(async org => {
                  const members = await this.organizationMemberRepository.find({
                    organizationId: org.id,
                    startTerm: null,
                    endTerm: null,
                  });

                  if (members.length === 0) return null;

                  return {
                    id: org.id,
                    name: org.name,
                    nameEng: org.nameEng,
                    members: members.map(m => ({
                      id: m.id,
                      student: {
                        id: m.student.id,
                      },
                    })),
                  };
                }),
              );

              return {
                organizationTypeEnum,
                organizations: filteredOrganizations.filter(Boolean),
              };
            },
          ),
        );

        return {
          halfYear: {
            year: semester.year,
            name: semester.name,
          },
          organizationTypes: organizationTypes.filter(
            type => type.organizations.length > 0,
          ),
        };
      }),
    );

    return { organizationLists };
  }

  async createMember(body) {
    const { OrganizationMember } = body;

    // 단체에 가입 신청한 사람 ( startTerm === null ) 을 확인
    const appliedMember = await this.organizationMemberRepository.find({
      organizationId: OrganizationMember.organization.id,
      studentId: OrganizationMember.student.id,
      startTerm: null,
      endTerm: null,
    });

    if (appliedMember.length === 0) {
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
    } else {
      await this.organizationMemberRepository.patch(
        {
          organizationId: OrganizationMember.organizationId,
          studentId: OrganizationMember.studentId,
          startTerm: null,
        },
        model => ({
          ...model,
          duration: OrganizationMember.duration,
        }),
      );
    }

    const createdMember = await this.organizationMemberRepository.find({
      organizationId: OrganizationMember.organization.id,
      studentId: OrganizationMember.student.id,
    });

    return { organizationMember: createdMember };
  }

  async createManager(body) {
    const { OrganizationManager } = body;

    const existingManager = await this.organizationManagerRepository.find({
      organizationId: OrganizationManager.organization.id,
      studentId: OrganizationManager.student.id,
      endTerm: null,
    });

    if (existingManager.length === 0) {
      await this.organizationManagerRepository.create({
        organization: OrganizationManager.organization,
        student: OrganizationManager.student,
        duration: OrganizationManager.duration,
      });
    } else {
      throw new ConflictException({
        status: "Error",
        message: "Already Manager",
      });
    }

    const createdManager = await this.organizationManagerRepository.find({
      organizationId: OrganizationManager.organization.id,
      studentId: OrganizationManager.student.id,
    });

    return { organizationManager: createdManager };
  }
}
