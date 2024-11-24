import { Injectable, Inject } from "@nestjs/common";

import {
  Agenda,
  ProjectProposal,
  ProjectProposalRevision,
} from "@sparcs-students/api/drizzle/schema";
import { ApiPrp001ResponseOK } from "@sparcs-students/interface/api/proposal/index";

import { and, eq, desc } from "drizzle-orm";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

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
      .select({
        projectName: ProjectProposalRevision.name,
        proposalId: ProjectProposal.id,
        startTerm: ProjectProposalRevision.startTerm,
        endTerm: ProjectProposalRevision.endTerm,
        agendaAccepted: Agenda.accepted,
        agendaExists: ProjectProposalRevision.agendaId,
      })
      .from(ProjectProposal)
      .innerJoin(
        ProjectProposalRevision,
        eq(ProjectProposal.revisionId, ProjectProposalRevision.id),
      )
      .leftJoin(Agenda, eq(ProjectProposalRevision.agendaId, Agenda.id))
      .where(
        and(
          eq(ProjectProposal.organizationId, organizationId),
          eq(ProjectProposal.semesterId, semesterId),
        ),
      );

    return res.map(row => ({
      name: row.projectName,
      projectProposalId: row.proposalId,
      startTerm: row.startTerm,
      endTerm: row.endTerm,
      acceptedStatus: row.agendaExists && row.agendaAccepted ? 1 : 2,
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
}
