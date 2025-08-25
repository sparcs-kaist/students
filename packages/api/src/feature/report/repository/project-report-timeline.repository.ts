import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectReportTimeline } from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IProjectReportTimelineCreate,
  MProjectReportTimeline,
} from "@sparcs-students/api/feature/report/model/project-report-timeline.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectReportTimelineQuery = {
  // id: number; // id 는 기본 내장
  projectReportRevisionId: number;
};

type ProjectReportTimelineOrderByKeys = "id";
type ProjectReportTimelineQuerySupport = EmptyObject; // Query Support 용

type ProjectReportTimelineTable = typeof ProjectReportTimeline;
type ProjectReportTimelineDbSelect =
  InferSelectModel<ProjectReportTimelineTable>;
type ProjectReportTimelineDbUpdate = Partial<ProjectReportTimelineDbSelect>;
type ProjectReportTimelineDbInsert =
  InferInsertModel<ProjectReportTimelineTable>;

type ProjectReportTimelineFieldMapKeys = BaseTableFieldMapKeys<
  ProjectReportTimelineQuery,
  ProjectReportTimelineOrderByKeys,
  ProjectReportTimelineQuerySupport
>;

export type ProjectReportTimelineRepositoryFindQuery = BaseRepositoryFindQuery<
  ProjectReportTimelineQuery,
  ProjectReportTimelineOrderByKeys
>;
export type ProjectReportTimelineRepositoryQuery =
  BaseRepositoryQuery<ProjectReportTimelineQuery>;

@Injectable()
export class ProjectReportTimelineRepository extends BaseSingleTableRepository<
  MProjectReportTimeline,
  IProjectReportTimelineCreate,
  ProjectReportTimelineTable,
  ProjectReportTimelineQuery,
  ProjectReportTimelineOrderByKeys,
  ProjectReportTimelineQuerySupport
> {
  constructor() {
    super(ProjectReportTimeline, MProjectReportTimeline);
  }

  protected dbToModelMapping(
    result: ProjectReportTimelineDbSelect,
  ): MProjectReportTimeline {
    return new MProjectReportTimeline({
      id: result.id,
      projectReportRevision: { id: result.projectReportRevisionId },
      duration: { startTerm: result.startTerm, endTerm: result.endTerm },
      detail: result.detail,
      note: result.note,
    });
  }

  protected modelToDBMapping(
    model: MProjectReportTimeline,
  ): ProjectReportTimelineDbUpdate {
    return {
      id: model.id,
      projectReportRevisionId: model.projectReportRevision.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
      detail: model.detail,
      note: model.note,
    };
  }

  protected createToDBMapping(
    model: IProjectReportTimelineCreate,
  ): ProjectReportTimelineDbInsert {
    return {
      projectReportRevisionId: model.projectReportRevision.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
      detail: model.detail,
      note: model.note,
    };
  }

  protected fieldMap(
    field: ProjectReportTimelineFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectReportTimelineFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectReportTimeline,
      projectReportRevisionId: ProjectReportTimeline,
      startTerm: ProjectReportTimeline,
      endTerm: ProjectReportTimeline,
      detail: ProjectReportTimeline,
      note: ProjectReportTimeline,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
