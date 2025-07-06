import { ConflictException, Injectable } from "@nestjs/common";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

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

      return {
        halfYear: {
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

  async applyMember(student, body) {
    const { studentId } = student;
    const organizationId = body.OrganizationMember.organization.id;

    console.log(studentId);

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
