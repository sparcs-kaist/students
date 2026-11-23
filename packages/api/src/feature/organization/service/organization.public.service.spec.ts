import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import { MOrganizationMember } from "../model/organization.member.model";
import { OrganizationMemberRepository } from "../repository/organization.member.repository";
import { OrganizationRepository } from "../repository/organization.repository";
import { OrganizationPublicService } from "./organization.public.service";

describe("OrganizationPublicService", () => {
  describe("getMyOrganizationMemberships", () => {
    it("marks applications and omits ended memberships", async () => {
      const members = [
        new MOrganizationMember({
          id: 1,
          organization: { id: 10 },
          student: { id: 5 },
          duration: { startTerm: null, endTerm: null },
        }),
        new MOrganizationMember({
          id: 2,
          organization: { id: 11 },
          student: { id: 5 },
          duration: { startTerm: new Date("2025-01-01"), endTerm: null },
        }),
        new MOrganizationMember({
          id: 3,
          organization: { id: 12 },
          student: { id: 5 },
          duration: {
            startTerm: new Date("2024-01-01"),
            endTerm: new Date("2024-12-31"),
          },
        }),
      ];
      const memberRepository = {
        find: jest.fn().mockResolvedValue(members),
      } as unknown as OrganizationMemberRepository;
      const organizationRepository = {
        fetch: jest.fn(async id => ({
          id,
          name: `Organization ${id}`,
          nameEng: `Organization ${id}`,
        })),
      } as unknown as OrganizationRepository;
      const service = new OrganizationPublicService(
        organizationRepository,
        memberRepository,
        {} as SemesterPublicService,
      );

      const result = await service.getMyOrganizationMemberships({
        studentId: 5,
      });

      expect(result.organizations).toEqual([
        {
          membershipId: 1,
          organizationId: 10,
          name: "Organization 10",
          nameEng: "Organization 10",
          isApplying: true,
        },
        {
          membershipId: 2,
          organizationId: 11,
          name: "Organization 11",
          nameEng: "Organization 11",
          isApplying: false,
        },
      ]);
      expect(organizationRepository.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
