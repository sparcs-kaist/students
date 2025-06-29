import { Injectable } from "@nestjs/common";
import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationPublicService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
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
}
