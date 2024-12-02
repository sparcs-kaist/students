import { Injectable, Inject } from "@nestjs/common";

import {
  Agenda,
  ProjectProposal,
  ProjectProposalRevision,
  ProjectProposalRevisionT,
  ProjectProposalT,
  ProjectProposalTimeline,
  ProjectProposalTimelineT,
} from "@sparcs-students/api/drizzle/schema";
import { ApiPrp001ResponseOK } from "@sparcs-students/interface/api/proposal/index";
import { AgendaAcceptedStatusE } from "@sparcs-students/interface/common/enum/meeting.enum";

import { asc, isNull, and, eq, desc, inArray, isNotNull } from "drizzle-orm";

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
      acceptedStatus:
        row.agendaExists && row.agendaAccepted
          ? AgendaAcceptedStatusE.Accepted
          : AgendaAcceptedStatusE.Rejected,
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

  async selectProjectProposalWithRevision() //   target: {
  //   projectProposal: Partial<ProjectProposalT>;
  //   projectProposalRevision: Partial<ProjectProposalRevisionT>;
  // }
  : Promise<
    {
      projectProposal: ProjectProposalT;
      projectProposalRevision: ProjectProposalRevisionT;
    }[]
  > {
    // TODO: 둘 다 join하는 것 나중에 만들 것임
    return [];
  }

  async selectProjectProposal(
    target: Partial<ProjectProposalT>,
    isNullCondition?: Partial<Record<keyof ProjectProposalT, boolean>>,
    orderByCondition?: Partial<
      Record<keyof ProjectProposalT, "ASC" | "DESC">
    >[],
  ): Promise<ProjectProposalT[]> {
    const { id, organizationId, semesterId, revisionId } = target;
    let query = this.db.select().from(ProjectProposal).$dynamic();

    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(ProjectProposal.id, id));
    }

    if (organizationId) {
      whereConditions.push(eq(ProjectProposal.organizationId, organizationId));
    }

    if (semesterId) {
      whereConditions.push(eq(ProjectProposal.semesterId, semesterId));
    }

    if (revisionId) {
      whereConditions.push(eq(ProjectProposal.revisionId, revisionId));
    }

    // 삭제된 항목 제외
    whereConditions.push(isNull(ProjectProposal.deletedAt));

    if (isNullCondition) {
      Object.entries(isNullCondition).forEach(([key, value]) => {
        whereConditions.push(
          value
            ? isNull(ProjectProposal[key as keyof ProjectProposalT])
            : isNotNull(ProjectProposal[key as keyof ProjectProposalT]),
        );
      });
    }

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }
    const orderByConditions = orderByCondition.map(order => {
      const [key, value] = Object.entries(order)[0]; // 각 항목을 키와 값으로 분리
      return value === "ASC"
        ? asc(ProjectProposal[key as keyof ProjectProposalT])
        : desc(ProjectProposal[key as keyof ProjectProposalT]);
    });
    if (orderByConditions.length > 0) {
      query = query.orderBy(...orderByConditions);
    }
    // 쿼리 실행
    const res = await query.execute();
    return res;
  }

  async insertProjectProposal(
    organizationId: number,
    semesterId: number,
  ): Promise<number> {
    await this.db
      .insert(ProjectProposal)
      .values({ organizationId, semesterId })
      .execute();
    const res = await this.selectProjectProposal(
      {
        organizationId,
        semesterId,
      },
      {},
      [{ id: "ASC" }],
    );
    if (res.length === 0) {
      return 0;
    }

    return res[res.length - 1].id;
  }

  async updateProjectProposal(
    target: Partial<ProjectProposalT>, // 수정할 필드를 담은 객체
    condition: Partial<ProjectProposalT>, // 조건
  ): Promise<boolean> {
    const { id, organizationId, semesterId, revisionId } = condition;

    let query = this.db.update(ProjectProposal).set(target).$dynamic();

    // 조건 설정
    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(ProjectProposal.id, id));
    }

    if (organizationId) {
      whereConditions.push(eq(ProjectProposal.organizationId, organizationId));
    }

    if (semesterId) {
      whereConditions.push(eq(ProjectProposal.semesterId, semesterId));
    }

    if (revisionId) {
      whereConditions.push(eq(ProjectProposal.revisionId, revisionId));
    }

    // 삭제된 항목 제외 (deletedAt이 null이어야만 업데이트)
    whereConditions.push(isNull(ProjectProposal.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    await query.execute();

    // 업데이트가 완료되었으므로 true 반환
    return true;
  }

  async selectProjectProposalRevision(
    target: Partial<ProjectProposalRevisionT> & {
      orderByIdAsc?: boolean;
    },
  ): Promise<ProjectProposalRevisionT[]> {
    const { id, documentId, name, orderByIdAsc } = target;
    let query = this.db.select().from(ProjectProposalRevision).$dynamic();

    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(ProjectProposalRevision.id, id));
    }

    if (documentId) {
      whereConditions.push(eq(ProjectProposalRevision.documentId, documentId));
    }

    if (name) {
      whereConditions.push(eq(ProjectProposalRevision.name, name));
    }

    // TODO: 나중에 다른 항목으로 조회가 필요할 경우 추가

    // 삭제된 항목 제외
    whereConditions.push(isNull(ProjectProposalRevision.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    if (orderByIdAsc) {
      query = query.orderBy(asc(ProjectProposalRevision.id));
    }

    // 쿼리 실행
    const res = await query.execute();

    return res;
  }

  async insertProjectProposalRevision(
    documentId: number,
    name: string,
  ): Promise<number> {
    await this.db
      .insert(ProjectProposalRevision)
      .values({ documentId, name })
      .execute();
    const res = await this.selectProjectProposalRevision({
      documentId,
      name,
      orderByIdAsc: true,
    });
    if (res.length === 0) {
      return 0;
    }

    return res[res.length - 1].id;
  }

  async updateProjectProposalRevision(
    values: Partial<ProjectProposalRevisionT>, // 수정할 필드를 담은 객체
    condition: Partial<ProjectProposalRevisionT>, // 조건
  ): Promise<boolean> {
    // 업데이트된 행 수를 반환
    const { id, documentId, name } = condition;

    let query = this.db.update(ProjectProposalRevision).set(values).$dynamic();
    // 조건 설정
    const whereConditions = [];
    if (id) {
      whereConditions.push(eq(ProjectProposalRevision.id, id));
    }
    if (documentId) {
      whereConditions.push(eq(ProjectProposalRevision.documentId, documentId));
    }
    if (name) {
      whereConditions.push(eq(ProjectProposalRevision.name, name));
    }
    // 삭제된 항목 제외 (deletedAt이 null이어야만 업데이트)
    whereConditions.push(isNull(ProjectProposalRevision.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    await query.execute();

    // 업데이트된 행 수를 반환
    return true;
  }

  async selectUnsubmittedProjectProposalRevisionWithProjectProposal(
    organizationId: number,
    semesterId: number,
  ): Promise<ProjectProposalWithRevision[]> {
    // 가장 최신의 updatedAt 값을 가져오는 서브쿼리
    const res = await this.db
      .select()
      .from(ProjectProposalRevision)
      .innerJoin(
        ProjectProposal,
        eq(ProjectProposal.id, ProjectProposalRevision.documentId),
      )
      .where(
        and(
          eq(ProjectProposal.organizationId, organizationId),
          eq(ProjectProposal.semesterId, semesterId),
          isNull(ProjectProposalRevision.submittedAt),
          isNull(ProjectProposalRevision.deletedAt),
        ),
      );

    return res.map(row => ({
      projectProposal: row.project_proposal,
      projectProposalRevision: row.project_proposal_revision,
    }));
  }

  async updateProjectProposalRevisionSubmit(
    targetIds: {
      projectProposalId: number;
      projectProposalRevisionId: number;
    }[],
  ): Promise<boolean> {
    const revisionIds = targetIds.map(ids => ids.projectProposalRevisionId);

    await this.db.transaction(async tx => {
      // submittedAt을 현재 시간으로 업데이트
      tx.update(ProjectProposalRevision)
        .set({ submittedAt: new Date() })
        .where(inArray(ProjectProposalRevision.id, revisionIds))
        .execute();

      // ProjectProposal의 revisionId를 업데이트
      // 여러 개의 업데이트를 트랜잭션 안에서 한 번에 처리
      const updateQueries = targetIds.map(
        ({ projectProposalId, projectProposalRevisionId }) =>
          tx
            .update(ProjectProposal)
            .set({ revisionId: projectProposalRevisionId })
            .where(eq(ProjectProposal.id, projectProposalId))
            .execute(),
      );

      // 모든 업데이트가 병렬로 실행되도록 Promise.all 사용
      await Promise.all(updateQueries);

      // 위의 코드는 아래와 같이 forEach로도 작성 가능
      // targetIds.forEach(ids => {
      //   tx.update(ProjectProposal)
      //     .set({ revisionId: ids.projectProposalRevisionId })
      //     .where(eq(ProjectProposal.id, ids.projectProposalId))
      //     .execute();
      // });
    });

    return true;
  }
}
