import { Injectable } from "@nestjs/common";

import {
  BaseMultiTableRepository,
  MultiInsertModel,
  MultiSelectModel,
  MultiUpdateModel,
} from "@sparcs-students/api/common/base/base.multi.repository";
import {
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import {
  ProjectReportRevision,
  ProjectReportTimeline,
} from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IProjectReportRevisionCreate,
  MProjectReportRevision,
} from "@sparcs-students/api/feature/report/model/project-report-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { DocumentItemStatusEnum } from "@sparcs-students/interface/common/type/revision-base.type";

export type ProjectReportRevisionQuery = {
  organizationId: number;
  semesterId: number;
  projectReportId: number;
  documentStatusEnum: DocumentItemStatusEnum;
  submittedAt: Date;
  cogAgendaId: number;
  gsrcAgendaId: number;
};

type ProjectReportRevisionOrderByKeys = "id" | "documentStatusEnum";
type ProjectReportRevisionQuerySupport = EmptyObject;

type ProjectReportRevisionTable = {
  main: typeof ProjectReportRevision;
  oneToOne: EmptyObject;
  oneToMany: {
    projectReportTimeline: typeof ProjectReportTimeline;
  };
};
type ProjectReportRevisionDbSelect =
  MultiSelectModel<ProjectReportRevisionTable>;
type ProjectReportRevisionDbUpdate =
  MultiUpdateModel<ProjectReportRevisionTable>;
type ProjectReportRevisionDbInsert = MultiInsertModel<
  ProjectReportRevisionTable,
  "projectReportRevisionId"
>;

type ProjectReportRevisionFieldMapKeys = BaseTableFieldMapKeys<
  ProjectReportRevisionQuery,
  ProjectReportRevisionOrderByKeys,
  ProjectReportRevisionQuerySupport
>;

@Injectable()
export class ProjectReportRevisionRepository extends BaseMultiTableRepository<
  MProjectReportRevision,
  IProjectReportRevisionCreate,
  "projectReportRevisionId",
  ProjectReportRevisionTable,
  ProjectReportRevisionQuery,
  ProjectReportRevisionOrderByKeys,
  ProjectReportRevisionQuerySupport
> {
  constructor() {
    super(
      {
        main: ProjectReportRevision,
        oneToOne: {},
        oneToMany: {
          projectReportTimeline: ProjectReportTimeline,
        },
      },
      MProjectReportRevision,
      "projectReportRevisionId",
    );
  }

  protected dbToModelMapping(
    result: ProjectReportRevisionDbSelect,
  ): MProjectReportRevision {
    return new MProjectReportRevision({
      id: result.main.id,
      projectReport: { id: result.main.projectReportId },
      name: result.main.name,
      method: result.main.method,
      prepareDuration: {
        startTerm: result.main.prepareStartTerm,
        endTerm: result.main.prepareEndTerm,
      },
      duration: {
        startTerm: result.main.startTerm,
        endTerm: result.main.endTerm,
      },
      timelines: result.oneToMany.projectReportTimeline.map(timeline => ({
        duration: {
          startTerm: timeline.startTerm,
          endTerm: timeline.endTerm,
        },
        detail: timeline.detail,
        note: timeline.note,
      })),
      team: { id: result.main.teamId },
      manager: { id: result.main.managerId },
      participation: result.main.participation,
      // purpose: result.main.purpose,
      // target: result.main.target,
      result: result.main.result,
      unmet: result.main.unmet,
      detail: result.main.detail,
      note: result.main.note,
      // documentStatusEnum: result.main.documentStatusEnum,
      submittedAt: result.main.submittedAt,
      cogAgenda: { id: result.main.cogAgendaId },
      gsrcAgenda: { id: result.main.gsrcAgendaId },
      // isRemoved: result.main.isRemoved,
    });
  }

  protected modelToDBMapping(
    model: MProjectReportRevision,
  ): ProjectReportRevisionDbUpdate {
    return {
      main: {
        id: model.id,
        projectReportId: model.projectReport.id,
        name: model.name,
        method: model.method,
        prepareStartTerm: model.prepareDuration.startTerm,
        prepareEndTerm: model.prepareDuration.endTerm,
        startTerm: model.duration.startTerm,
        endTerm: model.duration.endTerm,
        teamId: model.team.id,
        managerId: model.manager.id,
        participation: model.participation,
        // purpose: model.purpose,
        // target: model.target,
        result: model.result,
        unmet: model.unmet,
        detail: model.detail,
        note: model.note,
        // documentStatusEnum: model.documentStatusEnum,
        submittedAt: model.submittedAt,
        cogAgendaId: model.cogAgenda?.id,
        gsrcAgendaId: model.gsrcAgenda?.id,
        // isRemoved: model.isRemoved,
      },
      oneToOne: {},
      oneToMany: {
        projectReportTimeline: model.timelines.map(timeline => ({
          startTerm: timeline.duration.startTerm,
          endTerm: timeline.duration.endTerm,
          detail: timeline.detail,
          note: timeline.note,
        })),
      },
    };
  }

  protected createToDBMapping(
    model: IProjectReportRevisionCreate,
  ): ProjectReportRevisionDbInsert {
    return {
      main: {
        projectReportId: model.projectReport.id,
        name: model.name,
        method: model.method,
        prepareStartTerm: model.prepareDuration.startTerm,
        prepareEndTerm: model.prepareDuration.endTerm,
        startTerm: model.duration.startTerm,
        endTerm: model.duration.endTerm,
        teamId: model.team.id,
        managerId: model.manager.id,
        participation: model.participation,
        // purpose: model.purpose,
        // target: model.target,
        result: model.result,
        unmet: model.unmet,
        detail: model.detail,
        note: model.note,
        // documentStatusEnum: model.documentStatusEnum,
        // isRemoved: model.isRemoved,
      },
      oneToOne: {},
      oneToMany: {
        projectReportTimeline: model.timelines.map(timeline => ({
          startTerm: timeline.duration.startTerm,
          endTerm: timeline.duration.endTerm,
          detail: timeline.detail,
          note: timeline.note,
        })),
      },
    };
  }

  protected fieldMap(
    field: ProjectReportRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectReportRevisionFieldMapKeys,
      TableWithID | null
    > = {
      projectReportId: ProjectReportRevision,
      name: ProjectReportRevision,
      method: ProjectReportRevision,
      prepareStartTerm: ProjectReportRevision,
      prepareEndTerm: ProjectReportRevision,
      startTerm: ProjectReportRevision,
      endTerm: ProjectReportRevision,
      teamId: ProjectReportRevision,
      managerId: ProjectReportRevision,
      participation: ProjectReportRevision,
      result: ProjectReportRevision,
      unmet: ProjectReportRevision,
      detail: ProjectReportRevision,
      note: ProjectReportRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
