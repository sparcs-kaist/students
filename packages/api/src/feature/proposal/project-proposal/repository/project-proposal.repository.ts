import { Injectable, Inject } from "@nestjs/common";

import {
  Agenda,
  AgendaAcceptedStatusEnum,
  ProjectProposal,
  ProjectProposalRevision,
  ProjectProposalRevisionT,
  ProjectProposalT,
  ProjectProposalTimeline,
  ProjectProposalTimelineT,
} from "@sparcs-students/api/drizzle/schema";
import { ApiPrp001ResponseOK } from "@sparcs-students/interface/api/proposal/index";

import { or, isNull, isNotNull, and, eq, desc } from "drizzle-orm";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

export type ProjectProposalWithRevision = {
  projectProposal: ProjectProposalT;
  projectProposalRevision: ProjectProposalRevisionT;
};

@Injectable()
export class ProjectProposalRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  /**
   * @param organizationId, semester id
   * @returns 해당 동아리와 학기에 해당하는 ProjectProposals list 객체를 리턴합니다.
   * @description 이미 사업계획서를 모두 심사한 후를 기준으로 하는 상태로, 일반 학생들도 볼 수 있는 상태입니다.
   */
  async getProjectProposalsForStudentsByOrganizationIdAndSemesterId(
    organizationId: number,
    semesterId: number,
  ): Promise<ApiPrp001ResponseOK["projects"]> {
    const res = await this.db
      .select()
      .from(ProjectProposal)
      .innerJoin(
        ProjectProposalRevision,
        eq(ProjectProposal.revisionId, ProjectProposalRevision.id),
      )
      .leftJoin(Agenda, eq(ProjectProposalRevision.agendaId, Agenda.id))
      .leftJoin(
        AgendaAcceptedStatusEnum,
        or(
          and(
            isNotNull(ProjectProposalRevision.agendaId),
            eq(Agenda.accepted, true),
            eq(AgendaAcceptedStatusEnum.id, 1), // 조건에 따라 `id = 1`
          ),
          and(
            or(
              isNull(ProjectProposalRevision.agendaId),
              eq(Agenda.accepted, false),
            ),
            eq(AgendaAcceptedStatusEnum.id, 2), // 조건에 따라 `id = 2`
          ),
        ),
      )
      .where(
        and(
          eq(ProjectProposal.organizationId, organizationId),
          eq(ProjectProposal.semesterId, semesterId),
        ),
      );
    return res.map(row => ({
      name: row.project_proposal_revision.name,
      projectProposalId: row.project_proposal.id,
      startTerm: row.project_proposal_revision.startTerm,
      endTerm: row.project_proposal_revision.endTerm,
      acceptedStatus: row.agenda_accepted_status_enum.name,
    }));
  }

  /**
   * @param organizationId, semesterId
   * @returns 해당 기구 해당 학기에 해당하는 ProjectProposal의 제출연월일을 리턴합니다.
   * @description 가장 최근의 제출일을 리턴합니다.
   */
  async getProjectProposalSubmitDate(
    organizationId: number,
    semesterId: number,
  ): Promise<Date[]> {
    const res = await this.db
      .select()
      .from(ProjectProposal)
      .innerJoin(
        ProjectProposalRevision,
        eq(ProjectProposal.revisionId, ProjectProposalRevision.id),
      )
      .innerJoin(Agenda, eq(ProjectProposalRevision.agendaId, Agenda.id))
      .where(
        and(
          eq(ProjectProposal.semesterId, semesterId),
          eq(ProjectProposal.organizationId, organizationId),
        ),
      )
      .orderBy(desc(Agenda.submittedAt))
      .limit(1);

    return res.map(row => row.agenda.submittedAt);
  }

  /**
   * @param projectProposalId
   * @returns 사업계획서 id에 해당하는 revisionId에 해당하는 ProjectProposalRevision 객체를 리턴합니다.
   *
   */

  async getProjectProposalRevisionById(
    projectProposalId: number,
  ): Promise<ProjectProposalRevisionT[]> {
    const res = await this.db
      .select()
      .from(ProjectProposal)
      .innerJoin(
        ProjectProposalRevision,
        eq(ProjectProposal.revisionId, ProjectProposalRevision.id),
      )
      .where(eq(ProjectProposalRevision.id, projectProposalId))
      .limit(1);

    return res.map(row => row.project_proposal_revision);
  }

  async getProjectProposalTimelinesByProjectId(
    projectId: number,
  ): Promise<ProjectProposalTimelineT[]> {
    const res = await this.db
      .select()
      .from(ProjectProposalTimeline)
      .where(eq(ProjectProposalTimeline.id, projectId));

    return res;
  }
}
