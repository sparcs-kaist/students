import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectProposalRevision } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IProjectProposalRevisionCreate,
  MProjectProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/project-proposal-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectProposalRevisionQuery = {
  // id: number; // id 는 기본 내장
  projectProposalId: number;
  code: number;
  submittedAt: Date;
};

type ProjectProposalRevisionOrderByKeys = "id";
type ProjectProposalRevisionQuerySupport = EmptyObject; // Query Support 용

type ProjectProposalRevisionTable = typeof ProjectProposalRevision;
type ProjectProposalRevisionDbSelect =
  InferSelectModel<ProjectProposalRevisionTable>;
type ProjectProposalRevisionDbUpdate = Partial<ProjectProposalRevisionDbSelect>;
type ProjectProposalRevisionDbInsert =
  InferInsertModel<ProjectProposalRevisionTable>;

type ProjectProposalRevisionFieldMapKeys = BaseTableFieldMapKeys<
  ProjectProposalRevisionQuery,
  ProjectProposalRevisionOrderByKeys,
  ProjectProposalRevisionQuerySupport
>;

export type ProjectProposalRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    ProjectProposalRevisionQuery,
    ProjectProposalRevisionOrderByKeys
  >;
export type ProjectProposalRevisionRepositoryQuery =
  BaseRepositoryQuery<ProjectProposalRevisionQuery>;

@Injectable()
export class ProjectProposalRevisionRepository extends BaseSingleTableRepository<
  MProjectProposalRevision,
  IProjectProposalRevisionCreate,
  ProjectProposalRevisionTable,
  ProjectProposalRevisionQuery,
  ProjectProposalRevisionOrderByKeys,
  ProjectProposalRevisionQuerySupport
> {
  constructor() {
    super(ProjectProposalRevision, MProjectProposalRevision);
  }

  protected dbToModelMapping(
    result: ProjectProposalRevisionDbSelect,
  ): MProjectProposalRevision {
    return new MProjectProposalRevision({
      id: result.id,

      projectProposal: { id: result.projectProposalId },

      name: result.name,

      method: result.method,

      prepareStartTerm: result.prepareStartTerm,
      prepareEndTerm: result.prepareEndTerm,

      startTerm: result.startTerm,
      endTerm: result.endTerm,

      team: { id: result.teamId },

      manager: { id: result.managerId },

      purpose: result.purpose,

      target: result.target,

      detail: result.detail,

      note: result.note,

      code: result.code,

      submittedAt: result.submittedAt,
    });
  }

  protected modelToDBMapping(
    model: MProjectProposalRevision,
  ): ProjectProposalRevisionDbUpdate {
    return {
      id: model.id,

      projectProposalId: model.projectProposal.id,

      name: model.name,

      method: model.method,

      prepareStartTerm: model.prepareStartTerm,
      prepareEndTerm: model.prepareEndTerm,

      startTerm: model.startTerm,
      endTerm: model.endTerm,

      teamId: model.team.id,

      managerId: model.manager.id,

      purpose: model.purpose,

      target: model.target,

      detail: model.detail,

      note: model.note,

      submittedAt: model.submittedAt,
    };
  }

  protected createToDBMapping(
    model: IProjectProposalRevisionCreate,
  ): ProjectProposalRevisionDbInsert {
    return {
      projectProposalId: model.projectProposal.id,

      name: model.name,

      method: model.method,

      prepareStartTerm: model.prepareStartTerm,
      prepareEndTerm: model.prepareEndTerm,

      startTerm: model.startTerm,
      endTerm: model.endTerm,

      teamId: model.team.id,

      managerId: model.manager.id,

      purpose: model.purpose,

      target: model.target,

      detail: model.detail,

      note: model.note,

      code: model.code,
    };
  }

  protected fieldMap(
    field: ProjectProposalRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectProposalRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectProposalRevision,
      projectProposalId: ProjectProposalRevision,
      code: ProjectProposalRevision,
      submittedAt: ProjectProposalRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
