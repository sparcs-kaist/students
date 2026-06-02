import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { StudentProfile } from "@sparcs-students/api/common/decorators/get-user.decorator";

import { OrganizationRepository } from "../repository/organization.repository";
import { OrganizationMemberRepository } from "../repository/organization.member.repository";

@Injectable()
export class OrganizationPublicService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationMemberRepository: OrganizationMemberRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getOrganizationList() {
    const allOrganizations = await this.organizationRepository.find({});
    const semesters = await this.semesterPublicService.fetchSemesterAll();

    const organizationLists = semesters.map(semester => {
      // 학기 기간과 기구 활동 기간이 겹치는 기구들을 올바르게 필터링하기 위해 날짜 비교 로직 수정
      const organizationsInSemester = allOrganizations.filter(
        org =>
          new Date(org.startTerm) <= new Date(semester.endTerm) &&
          (org.endTerm === null ||
            new Date(org.endTerm) >= new Date(semester.startTerm)),
      );

      const typeMap = new Map();

      organizationsInSemester.forEach(org => {
        if (!typeMap.has(org.organizationTypeEnum)) {
          typeMap.set(org.organizationTypeEnum, []);
        }
        typeMap.get(org.organizationTypeEnum).push(org);
      });

      return {
        semester: {
          year: semester.year,
          name: semester.name,
        },
        organizationTypes: Array.from(typeMap.entries()).map(
          ([organizationTypeEnum, organizations]) => ({
            organizationTypeEnum,
            organizations,
          }),
        ),
      };
    });

    return { organizationLists };
  }

  /**
   * 학생이 소속(또는 신청 중)인 단체를 멤버십 기준으로 나열합니다.
   */
  async getMyOrganizationMemberships(student: StudentProfile) {
    // BaseRepositoryFindQuery + OrganizationMemberQuery infers `never` for flat
    // filters in some TS versions; runtime find() accepts partial keys.
    const members = await this.organizationMemberRepository.find({
      studentId: student.studentId,
    } as never);

    const byOrganizationId = new Map<
      number,
      {
        membershipId: number;
        organizationId: number;
        name: string;
        nameEng: string;
      }
    >();

    await Promise.all(
      members.map(async member => {
        try {
          const org = await this.organizationRepository.fetch(
            member.organization.id,
          );
          const row = {
            membershipId: member.id,
            organizationId: org.id,
            name: org.name,
            nameEng: org.nameEng,
          };
          if (!byOrganizationId.has(org.id)) {
            byOrganizationId.set(org.id, row);
          }
        } catch {
          /* 단체가 삭제되었거나 조회 불가 */
        }
      }),
    );

    const organizations = Array.from(byOrganizationId.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ko"),
    );

    return { organizations };
  }

  async getOrganizationListByType(body) {
    const allOrganizations = await this.organizationRepository.find({});
    const semesters = await this.semesterPublicService.fetchSemesterAll();

    const { semesterId, organizationTypeEnum } = body;

    const semester = semesters.find(s => s.id === semesterId);
    if (!semester) {
      throw new NotFoundException("Semester not found");
    }

    // 학기 기간과 기구 활동 기간이 겹치는 기구들을 올바르게 필터링하기 위해 날짜 비교 로직 수정
    const organizationsInSemester = allOrganizations.filter(
      org =>
        new Date(org.startTerm) <= new Date(semester.endTerm) &&
        (org.endTerm === null ||
          new Date(org.endTerm) >= new Date(semester.startTerm)),
    );

    const organizationsOfType =
      organizationTypeEnum !== undefined
        ? organizationsInSemester.filter(
            org => org.organizationTypeEnum === organizationTypeEnum,
          )
        : organizationsInSemester;

    return {
      organizationLists: organizationsOfType,
    };
  }

  async applyMember(student, body) {
    const { studentId } = student;
    const organizationId = body.OrganizationMember.organization.id;

    // 이미 신청한 사람인지 확인
    const appliedMember = await this.organizationMemberRepository.find({
      organizationId,
      studentId,
      startTerm: null,
      endTerm: null,
    });

    if (appliedMember.length === 0) {
      // 이미 현재 멤버인지 확인
      const existingMember = await this.organizationMemberRepository.find({
        organizationId,
        studentId,
        endTerm: null,
      });

      if (existingMember.length === 0) {
        await this.organizationMemberRepository.create({
          organization: { id: organizationId },
          student: { id: studentId },
          duration: { startTerm: null, endTerm: null },
        });
      } else {
        throw new ConflictException({
          status: "Error",
          message: "Already Member",
        });
      }
    } else {
      throw new ConflictException({
        status: "Error",
        message: "Already Applied",
      });
    }

    const createdMember = await this.organizationMemberRepository.find({
      organizationId,
      studentId,
    });

    return { organizationMember: createdMember };
  }
}
