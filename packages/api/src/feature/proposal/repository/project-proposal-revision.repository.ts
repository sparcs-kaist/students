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
  ProjectProposalRevision,
  ProjectProposalTimeline,
} from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IProjectProposalRevisionCreate,
  MProjectProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/project-proposal-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { DocumentItemStatusEnum } from "@sparcs-students/interface/common/type/revision-base.type";

export type ProjectProposalRevisionQuery = {
  organizationId: number;
  semesterId: number;
  projectProposalId: number;
  documentStatusEnum: DocumentItemStatusEnum;
  submittedAt: Date;
  cogAgendaId: number;
  gsrcAgendaId: number;
};

type ProjectProposalRevisionOrderByKeys = "id" | "documentStatusEnum";
type ProjectProposalRevisionQuerySupport = EmptyObject;

type ProjectProposalRevisionTable = {
  main: typeof ProjectProposalRevision;
  oneToOne: EmptyObject;
  oneToMany: {
    projectProposalTimeline: typeof ProjectProposalTimeline;
  };
};
type ProjectProposalRevisionDbSelect =
  MultiSelectModel<ProjectProposalRevisionTable>;
type ProjectProposalRevisionDbUpdate =
  MultiUpdateModel<ProjectProposalRevisionTable>;
type ProjectProposalRevisionDbInsert = MultiInsertModel<
  ProjectProposalRevisionTable,
  "projectProposalRevisionId"
>;

type ProjectProposalRevisionFieldMapKeys = BaseTableFieldMapKeys<
  ProjectProposalRevisionQuery,
  ProjectProposalRevisionOrderByKeys,
  ProjectProposalRevisionQuerySupport
>;

@Injectable()
export class ProjectProposalRevisionRepository extends BaseMultiTableRepository<
  MProjectProposalRevision,
  IProjectProposalRevisionCreate,
  "projectProposalRevisionId",
  ProjectProposalRevisionTable,
  ProjectProposalRevisionQuery,
  ProjectProposalRevisionOrderByKeys,
  ProjectProposalRevisionQuerySupport
> {
  constructor() {
    super(
      {
        main: ProjectProposalRevision,
        oneToOne: {},
        oneToMany: {
          projectProposalTimeline: ProjectProposalTimeline,
        },
      },
      MProjectProposalRevision,
      "projectProposalRevisionId",
    );
  }

  protected dbToModelMapping(
    result: ProjectProposalRevisionDbSelect,
  ): MProjectProposalRevision {
    return new MProjectProposalRevision({
      id: result.main.id,

      projectProposal: { id: result.main.projectProposalId },

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

      timelines: result.oneToMany.projectProposalTimeline.map(timeline => ({
        detail: timeline.detail,
        duration: {
          startTerm: timeline.startTerm,
          endTerm: timeline.endTerm,
        },
        note: timeline.note,
      })),

      team: { id: result.main.teamId },

      manager: { id: result.main.managerId },

      purpose: result.main.purpose,

      target: result.main.target,

      detail: result.main.detail,

      note: result.main.note,

      documentStatusEnum: result.main.documentStatusEnum,

      submittedAt: result.main.submittedAt,

      cogAgenda: { id: result.main.cogAgendaId },

      gsrcAgenda: { id: result.main.gsrcAgendaId },

      isRemoved: result.main.isRemoved,
    });
  }

  protected modelToDBMapping(
    model: MProjectProposalRevision,
  ): ProjectProposalRevisionDbUpdate {
    return {
      main: {
        id: model.id,
        name: model.name,
        teamId: model.team.id,
        managerId: model.manager.id,
        purpose: model.purpose,
        target: model.target,
        detail: model.detail,
        note: model.note,
        documentStatusEnum: model.documentStatusEnum,
        submittedAt: model.submittedAt,
        cogAgendaId: model.cogAgenda?.id,
        gsrcAgendaId: model.gsrcAgenda?.id,
        isRemoved: model.isRemoved,
      },
      oneToOne: {},
      oneToMany: {
        projectProposalTimeline: model.timelines.map(timeline => ({
          startTerm: timeline.duration.startTerm,
          endTerm: timeline.duration.endTerm,
          detail: timeline.detail,
          note: timeline.note,
        })),
      },
    };
  }

  protected createToDBMapping(
    model: IProjectProposalRevisionCreate,
  ): ProjectProposalRevisionDbInsert {
    return {
      main: {
        projectProposalId: model.projectProposal.id,
        name: model.name,
        method: model.method,
        prepareStartTerm: model.prepareDuration.startTerm,
        prepareEndTerm: model.prepareDuration.endTerm,
        startTerm: model.duration.startTerm,
        endTerm: model.duration.endTerm,
        teamId: model.team.id,
        managerId: model.manager.id,
        purpose: model.purpose,
        target: model.target,
        detail: model.detail,
        note: model.note,
        documentStatusEnum: model.documentStatusEnum,
      },
      oneToOne: {},
      oneToMany: {
        projectProposalTimeline: model.timelines.map(timeline => ({
          startTerm: timeline.duration.startTerm,
          endTerm: timeline.duration.endTerm,
          detail: timeline.detail,
          note: timeline.note,
        })),
      },
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
      organizationId: ProjectProposalRevision,
      semesterId: ProjectProposalRevision,
      projectProposalId: ProjectProposalRevision,
      documentStatusEnum: ProjectProposalRevision,
      submittedAt: ProjectProposalRevision,
      cogAgendaId: ProjectProposalRevision,
      gsrcAgendaId: ProjectProposalRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
