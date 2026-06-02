import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BaseRepositoryQuery } from "@sparcs-students/api/common/base/base.repository";
import type {
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
  ApiOrg004RequestBody,
  ApiOrg016RequestBody,
  ApiOrg017RequestBody,
  ApiOrg019RequestBody,
  ApiOrg020RequestBody,
  ApiOrg022RequestBody,
  ApiOrg024RequestBody,
} from "@sparcs-students/interface/api/organization/index";
import type { ITeamRequestCreate } from "@sparcs-students/interface/api/organization/type/organization.type";
import type {
  ITeamMemberRequestCreate,
  ITeamLeaderRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";
import { DrizzleAsyncProvider } from "@sparcs-students/api/drizzle/drizzle.provider";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq, isNull, and } from "drizzle-orm";
import { Student } from "@sparcs-students/api/drizzle/schema/user.schema";
import { OrganizationRepository } from "../repository/organization.repository";

import { OrganizationPresidentRepository } from "../repository/organization.president.repository";
import { OrganizationMemberRepository } from "../repository/organization.member.repository";
import { OrganizationManagerRepository } from "../repository/organization.manager.repository";

import { TeamRepository } from "../repository/organization.team.repository";
import { TeamMemberRepository } from "../repository/organization.team.member.repository";
import { TeamLeaderRepository } from "../repository/organization.team.leader.repository";
import { OperatingCommitteeRepository } from "../repository/organization.operatingcommittee.repository";
import { OperatingCommitteeMemberRepository } from "../repository/organization.operatingcommittee.member.repository";
import { StaffRepository } from "../repository/staff.repository";
import { UapresidentRepository } from "../repository/uapresident.repository";

type OrganizationPresidentQuery = {
  id: number;
  organizationId: number;
  organizationPresidentTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type OrganizationMemberQuery = {
  id: number;
  organizationId: number;
  organizationMemberTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type OrganizationManagerQuery = {
  id: number;
  organizationId: number;
  organizationManagerTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type TeamMemberQuery = {
  id: number;
  teamId: number;
  teamMemberTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type TeamLeaderQuery = {
  id: number;
  teamId: number;
  teamLeaderTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type OperatingCommitteeMemberQuery = {
  id: number;
  operatingCommitteeId: number;
  operatingCommitteeMemberTypeEnum: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type StaffQuery = {
  id: number;
  studentId: number;
  startTerm: Date;
  endTerm: Date | null;
};

type UapresidentServiceQuery = {
  id: number;
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
    private readonly teamRepository: TeamRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamLeaderRepository: TeamLeaderRepository,
    private readonly operatingCommitteeRepository: OperatingCommitteeRepository,
    private readonly operatingCommitteeMemberRepository: OperatingCommitteeMemberRepository,
    private readonly staffRepository: StaffRepository,
    private readonly uapresidentRepository: UapresidentRepository,
    @Inject(DrizzleAsyncProvider)
    private readonly db: MySql2Database,
  ) {}

  async checkOrganizationPresident(studentId, organizationId) {
    const isPresident = await this.organizationPresidentRepository.find({
      studentId,
      organizationId,
      endTerm: null,
    });
    if (isPresident.length === 0) {
      throw new ConflictException({
        status: "Error",
        message: "Not a president of this organization",
      });
    }
  }

  async checkTeamPresident(studentId, teamId) {
    const team = await this.teamRepository.fetch(teamId);
    if (!team) throw new NotFoundException("Team not found");

    await this.checkOrganizationPresident(studentId, team.organization.id);
  }

  async checkOperatingCommitteePresident(studentId, operatingCommitteeId) {
    const operatingCommittee =
      await this.operatingCommitteeRepository.fetch(operatingCommitteeId);
    if (!operatingCommittee)
      throw new NotFoundException("Operating Committee not found");

    await this.checkOrganizationPresident(
      studentId,
      operatingCommittee.organization.id,
    );
  }

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

  async deleteOrganization(param) {
    const existing = await this.organizationRepository.find({
      id: param.id,
    });
    if (!existing.length) {
      throw new ConflictException("Organization does not exist.");
    }

    await this.organizationRepository.delete({
      id: param.id,
    });
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

  async retirePresident(presidentId: number, body: ApiOrg004RequestBody) {
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

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedPresident = await this.organizationPresidentRepository.patch(
      { id: presidentId } as BaseRepositoryQuery<
        OrganizationPresidentQuery,
        number
      >,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      organizationPresident: updatedPresident[0],
    };
  }

  async getApplying(student) {
    const { studentId } = student;

    const myOrganizations = await this.organizationPresidentRepository.find({
      studentId,
      endTerm: null,
    });

    const organizationIds = myOrganizations.map(m => m.organization.id);

    if (organizationIds.length === 0) {
      throw new ConflictException({
        status: "Error",
        message: "Not president",
      });
    }

    const allOrganizations =
      await this.organizationRepository.fetchAll(organizationIds);

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
          semester: {
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

  async createMember(student, body) {
    const { OrganizationMember } = body;
    const { studentId } = student;
    await this.checkOrganizationPresident(
      studentId,
      OrganizationMember.organization.id,
    );

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

  async createManager(student, body) {
    const { OrganizationManager } = body;
    const { studentId } = student;
    await this.checkOrganizationPresident(
      studentId,
      OrganizationManager.organization.id,
    );

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

  async postOrganizationTeamForPresident(
    student,
    body: ITeamRequestCreate,
  ): Promise<ApiOrg007ResponseCreated> {
    const { studentId } = student;
    await this.checkOrganizationPresident(studentId, body.organization.id);

    // TODO: Type 수정
    const existing = await this.teamRepository.find({
      organizationId: body.organization.id,
      name: body.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("duplicated team");
    }
    const newTeam = await this.teamRepository.create(body);
    return { team: newTeam[0] };
  }

  async postOrganizationTeamMemberForPresident(
    student,
    body: ITeamMemberRequestCreate,
  ): Promise<ApiOrg008ResponseCreated> {
    const { studentId } = student;
    await this.checkTeamPresident(studentId, body.team.id);

    // TODO: Type 수정
    const existing = await this.teamMemberRepository.find({
      teamId: body.team.id,
      studentId: body.student.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("duplicated member");
    }
    const newMember = await this.teamMemberRepository.create(body);
    return { teamMemberId: newMember[0] };
  }

  async postOrganizationTeamLeaderForPresident(
    student,
    body: ITeamLeaderRequestCreate,
  ): Promise<ApiOrg009ResponseCreated> {
    const { studentId } = student;
    await this.checkTeamPresident(studentId, body.team.id);

    // TODO: Type 수정
    const existing = await this.teamLeaderRepository.find({
      teamId: body.team.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    if (existing.length > 0) {
      throw new ConflictException("leader exists");
    }
    const newLeader = await this.teamLeaderRepository.create(body);
    return { teamLeaderId: newLeader[0] };
  }

  async createOperatingCommittee(student, body) {
    const { studentId } = student;
    await this.checkOrganizationPresident(studentId, body.organization.id);

    const existing = await this.operatingCommitteeRepository.find({
      organizationId: body.organization.id,
      name: body.name,
    });
    if (existing.length > 0) {
      throw new ConflictException("duplicated operatingCommittee");
    }
    const newOperatingCommittee =
      await this.operatingCommitteeRepository.create(body);
    return { operatingCommittee: newOperatingCommittee[0] };
  }

  async createOperatingCommitteeMember(student, body) {
    const { studentId } = student;
    await this.checkOperatingCommitteePresident(
      studentId,
      body.operatingCommittee.id,
    );

    const existing = await this.operatingCommitteeMemberRepository.find({
      operatingCommitteeId: body.operatingCommittee.id,
      studentId: body.student.id,
    });
    if (existing.length > 0) {
      throw new ConflictException("duplicated member");
    }
    const newMember =
      await this.operatingCommitteeMemberRepository.create(body);
    return { operatingCommitteeMember: newMember[0] };
  }

  async retireMember(student, memberId: number, body: ApiOrg016RequestBody) {
    const memberList = [
      await this.organizationMemberRepository.fetch(memberId),
    ];

    if (memberList.length === 0 || !memberList[0]) {
      throw new ConflictException("Member not found");
    }

    const member = memberList[0];
    const { studentId } = student;
    await this.checkOrganizationPresident(studentId, member.organization.id);

    if (
      member.duration.endTerm !== undefined &&
      member.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedMember = await this.organizationMemberRepository.patch(
      { id: memberId } as BaseRepositoryQuery<OrganizationMemberQuery, number>,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      OrganizationMember: updatedMember[0],
    };
  }

  async retireManager(student, managerId: number, body: ApiOrg017RequestBody) {
    const managerList = [
      await this.organizationManagerRepository.fetch(managerId),
    ];

    if (managerList.length === 0 || !managerList[0]) {
      throw new ConflictException("Manager not found");
    }

    const manager = managerList[0];
    const { studentId } = student;
    await this.checkOrganizationPresident(studentId, manager.organization.id);

    if (
      manager.duration.endTerm !== undefined &&
      manager.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedManager = await this.organizationManagerRepository.patch(
      { id: managerId } as BaseRepositoryQuery<
        OrganizationManagerQuery,
        number
      >,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      OrganizationManager: updatedManager[0],
    };
  }

  async deleteTeam(student, param) {
    const existing = await this.teamRepository.find({
      id: param.id,
    });
    if (!existing.length) {
      throw new ConflictException("Team does not exist.");
    }

    const { studentId } = student;
    await this.checkTeamPresident(studentId, param.id);

    await this.teamRepository.delete({
      id: param.id,
    });
  }

  async retireTeamMember(
    student,
    teamMemberId: number,
    body: ApiOrg019RequestBody,
  ) {
    const teamMemberList = [
      await this.teamMemberRepository.fetch(teamMemberId),
    ];

    if (teamMemberList.length === 0 || !teamMemberList[0]) {
      throw new ConflictException("Team Member not found");
    }

    const teamMember = teamMemberList[0];
    const { studentId } = student;

    await this.checkTeamPresident(studentId, teamMember.team.id);

    if (
      teamMember.duration.endTerm !== undefined &&
      teamMember.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedTeamMember = await this.teamMemberRepository.patch(
      { id: teamMemberId } as BaseRepositoryQuery<TeamMemberQuery, number>,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      TeamMember: updatedTeamMember[0],
    };
  }

  async retireTeamLeader(
    student,
    teamLeaderId: number,
    body: ApiOrg020RequestBody,
  ) {
    const teamLeaderList = [
      await this.teamLeaderRepository.fetch(teamLeaderId),
    ];

    if (teamLeaderList.length === 0 || !teamLeaderList[0]) {
      throw new ConflictException("Team Leader not found");
    }

    const teamLeader = teamLeaderList[0];
    const { studentId } = student;
    await this.checkTeamPresident(studentId, teamLeader.team.id);

    if (
      teamLeader.duration.endTerm !== undefined &&
      teamLeader.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedTeamLeader = await this.teamLeaderRepository.patch(
      { id: teamLeaderId } as BaseRepositoryQuery<TeamLeaderQuery, number>,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      TeamLeader: updatedTeamLeader[0],
    };
  }

  async deleteOperatingCommittee(student, param) {
    const existing = await this.operatingCommitteeRepository.find({
      id: param.id,
    });
    if (!existing.length) {
      throw new ConflictException("Operating Committee does not exist.");
    }

    const { studentId } = student;
    await this.checkOperatingCommitteePresident(studentId, existing[0].id);

    await this.operatingCommitteeRepository.delete({
      id: param.id,
    });
  }

  async retireOperatingCommitteeMember(
    student,
    operatingCommitteeMemberId: number,
    body: ApiOrg022RequestBody,
  ) {
    const operatingCommitteeMemberList = [
      await this.operatingCommitteeMemberRepository.fetch(
        operatingCommitteeMemberId,
      ),
    ];

    if (
      operatingCommitteeMemberList.length === 0 ||
      !operatingCommitteeMemberList[0]
    ) {
      throw new ConflictException("Operating Committee Member not found");
    }

    const operatingCommitteeMember = operatingCommitteeMemberList[0];
    const { studentId } = student;
    await this.checkOperatingCommitteePresident(
      studentId,
      operatingCommitteeMember.operatingCommittee.id,
    );

    if (
      operatingCommitteeMember.duration.endTerm !== undefined &&
      operatingCommitteeMember.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedOperatingCommitteeMember =
      await this.operatingCommitteeMemberRepository.patch(
        { id: operatingCommitteeMemberId } as BaseRepositoryQuery<
          OperatingCommitteeMemberQuery,
          number
        >,
        model => ({
          ...model,
          duration: {
            ...model.duration,
            endTerm: finalEndTerm,
          },
        }),
      );

    return {
      OperatingCommitteeMember: updatedOperatingCommitteeMember[0],
    };
  }

  async createStaff(body) {
    const { staff } = body;

    // 기존 집행부원 확인
    const existingStaff = await this.staffRepository.find({
      studentId: staff.student.id,
      endTerm: null,
    });
    // 중복 확인
    if (existingStaff.length > 0) {
      throw new ConflictException({
        status: "Error",
        message: "Already Staff existed",
      });
    }

    const createdStaff = await this.staffRepository.create({
      student: staff.student,
      duration: staff.duration,
    });

    return { staff: createdStaff };
  }

  async retireStaff(staffId: number, body: ApiOrg024RequestBody) {
    const staffList = [await this.staffRepository.fetch(staffId)];

    if (staffList.length === 0 || !staffList[0]) {
      throw new NotFoundException({
        status: "Error",
        message: "Staff Not Found",
      });
    }

    const staff = staffList[0];

    if (
      staff.duration.endTerm !== undefined &&
      staff.duration.endTerm !== null
    ) {
      throw new ConflictException({
        status: "Error",
        message: "Already Retired",
      });
    }

    const finalEndTerm = body.endTerm ?? new Date();

    const updatedStaff = await this.staffRepository.patch(
      { id: staffId } as BaseRepositoryQuery<StaffQuery, number>,
      model => ({
        ...model,
        duration: {
          ...model.duration,
          endTerm: finalEndTerm,
        },
      }),
    );

    return {
      staff: updatedStaff[0],
    };
  }

  /**
   * 현재 총학생회장이 다음 총학생회장에게 권한을 위임합니다.
   * 1. 학번으로 다음 학생을 조회합니다.
   * 2. 현재 UAPresident(currentStudentId)의 임기를 종료합니다.
   * 3. 새 UAPresident 레코드를 생성합니다.
   */
  async delegateUapresident(
    currentStudentId: number,
    body: { studentNumber: number; startTerm: Date },
  ) {
    // 1. 학번으로 다음 학생 조회
    const [nextStudent] = await this.db
      .select({ id: Student.id })
      .from(Student)
      .where(
        and(
          eq(Student.studentNumber, body.studentNumber),
          isNull(Student.deletedAt),
        ),
      )
      .limit(1);

    if (!nextStudent) {
      throw new NotFoundException({
        status: "Error",
        message: "Student Not Found",
      });
    }

    // 2. 이미 UAPresident인지 확인
    const existing = await this.uapresidentRepository.find({
      studentId: nextStudent.id,
      endTerm: null as unknown as Date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    if (existing.length > 0) {
      throw new ConflictException({
        status: "Error",
        message: "Already UAPresident",
      });
    }

    // 3. 현재 UAPresident 임기 일괄 종료 (Promise.all로 병렬 처리)
    const currentRecords = await this.uapresidentRepository.find({
      studentId: currentStudentId,
      endTerm: null as unknown as Date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const now = new Date();

    await Promise.all(
      currentRecords.map(record =>
        this.uapresidentRepository.patch(
          { id: record.id } as BaseRepositoryQuery<
            UapresidentServiceQuery,
            number
          >,
          model => ({
            ...model,
            duration: { ...model.duration, endTerm: now },
          }),
        ),
      ),
    );

    // 4. 새 UAPresident 생성
    const newRecords = await this.uapresidentRepository.create({
      student: { id: nextStudent.id },
      duration: { startTerm: body.startTerm, endTerm: null },
    });

    return { newUapresidentId: newRecords[0].id };
  }
}
