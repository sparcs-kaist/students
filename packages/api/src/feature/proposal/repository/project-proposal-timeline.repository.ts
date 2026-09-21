import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectProposalTimeline } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IProjectProposalTimelineCreate,
  MProjectProposalTimeline,
} from "@sparcs-students/api/feature/proposal/model/project-proposal-timeline.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectProposalTimelineQuery = {
  id: number;
  projectProposalRevision: number;
};

type ProjectProposalTimelineOrderByKeys = "id" | "projectProposalRevision";
type ProjectProposalTimelineQuerySupport = EmptyObject; // Query Support 용

type ProjectProposalTimelineTable = typeof ProjectProposalTimeline;
type ProjectProposalTimelineDbSelect =
  InferSelectModel<ProjectProposalTimelineTable>;
type ProjectProposalTimelineDbUpdate = Partial<ProjectProposalTimelineDbSelect>;
type ProjectProposalTimelineDbInsert =
  InferInsertModel<ProjectProposalTimelineTable>;

type ProjectProposalTimelineFieldMapKeys = BaseTableFieldMapKeys<
  ProjectProposalTimelineQuery,
  ProjectProposalTimelineOrderByKeys,
  ProjectProposalTimelineQuerySupport
>;

export type ProjectProposalTimelineRepositoryFindQuery =
  BaseRepositoryFindQuery<
    ProjectProposalTimelineQuery,
    ProjectProposalTimelineOrderByKeys
  >;
export type ProjectProposalTimelineRepositoryQuery =
  BaseRepositoryQuery<ProjectProposalTimelineQuery>;

@Injectable()
export class ProjectProposalTimelineRepository extends BaseSingleTableRepository<
  MProjectProposalTimeline,
  IProjectProposalTimelineCreate,
  ProjectProposalTimelineTable,
  ProjectProposalTimelineQuery,
  ProjectProposalTimelineOrderByKeys,
  ProjectProposalTimelineQuerySupport
> {
  constructor() {
    super(ProjectProposalTimeline, MProjectProposalTimeline);
  }

  protected dbToModelMapping(
    result: ProjectProposalTimelineDbSelect,
  ): MProjectProposalTimeline {
    return new MProjectProposalTimeline({
      id: result.id,
      projectProposalRevision: { code: result.projectProposalRevision },
      startTerm: result.startTerm,
      endTerm: result.endTerm,
      detail: result.detail,
      note: result.note,
    });
  }

  protected modelToDBMapping(
    model: MProjectProposalTimeline,
  ): ProjectProposalTimelineDbUpdate {
    return {
      id: model.id,
      projectProposalRevision: model.projectProposalRevision.code,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
      detail: model.detail,
      note: model.note,
    };
  }

  protected createToDBMapping(
    model: IProjectProposalTimelineCreate,
  ): ProjectProposalTimelineDbInsert {
    return {
      projectProposalRevision: model.projectProposalRevision.code,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
      detail: model.detail,
      note: model.note,
    };
  }

  protected fieldMap(
    field: ProjectProposalTimelineFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectProposalTimelineFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectProposalTimeline,
      projectProposalRevision: ProjectProposalTimeline,
      startTerm: ProjectProposalTimeline,
      endTerm: ProjectProposalTimeline,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
