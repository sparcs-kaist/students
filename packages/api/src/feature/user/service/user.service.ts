import { Injectable, NotFoundException } from "@nestjs/common";

import { OrganizationPublicService } from "@sparcs-students/api/feature/organization/service/organization.public.service";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly organizationService: OrganizationPublicService,
  ) {}

  async getMyInfo(userId: number) {
    const profile =
      await this.userRepository.findStudentProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundException("Student profile not found");
    }

    const { organizations } =
      await this.organizationService.getMyOrganizationMemberships({
        studentId: profile.studentId,
      });

    return {
      student: {
        id: profile.studentId,
        studentNumber: profile.studentNumber,
        user: {
          id: profile.userId,
          sid: profile.sid,
          uid: profile.uid,
          email: profile.email,
          name: profile.name,
        },
        department: profile.department,
      },
      organizations,
    };
  }
}
