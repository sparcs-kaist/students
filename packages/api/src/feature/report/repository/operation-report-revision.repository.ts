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
  OperatingCommitteeReport,
  OperationReportRevision,
  TeamOperationReport,
} from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IOperationReportRevisionCreate,
  MOperationReportRevision,
} from "@sparcs-students/api/feature/report/model/operation-report-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperationReportRevisionQuery = {
  organizationId: number;
  semesterId: number;
  projectReportId: number;
  submittedAt: Date;
  cogAgendaId: number;
  gsrcAgendaId: number;
};

type OperationReportRevisionOrderByKeys = "id" | "documentStatusEnum";
type OperationReportRevisionQuerySupport = EmptyObject;

type OperationReportRevisionTable = {
  main: typeof OperationReportRevision;
  oneToOne: EmptyObject;
  oneToMany: {
    operatingCommitteeOperation: typeof OperatingCommitteeReport;
    teamOperation: typeof TeamOperationReport;
  };
};
type OperationReportRevisionDbSelect =
  MultiSelectModel<OperationReportRevisionTable>;
type OperationReportRevisionDbUpdate =
  MultiUpdateModel<OperationReportRevisionTable>;
type OperationReportRevisionDbInsert = MultiInsertModel<
  OperationReportRevisionTable,
  "operationReportRevisionId"
>;

type OperationReportRevisionFieldMapKeys = BaseTableFieldMapKeys<
  OperationReportRevisionQuery,
  OperationReportRevisionOrderByKeys,
  OperationReportRevisionQuerySupport
>;

@Injectable()
export class OperationReportRevisionRepository extends BaseMultiTableRepository<
  MOperationReportRevision,
  IOperationReportRevisionCreate,
  "operationReportRevisionId",
  OperationReportRevisionTable,
  OperationReportRevisionQuery,
  OperationReportRevisionOrderByKeys,
  OperationReportRevisionQuerySupport
> {
  constructor() {
    super(
      {
        main: OperationReportRevision,
        oneToOne: {},
        oneToMany: {
          operatingCommitteeOperation: OperatingCommitteeReport,
          teamOperation: TeamOperationReport,
        },
      },
      MOperationReportRevision,
      "operationReportRevisionId",
    );
  }

  protected dbToModelMapping(
    result: OperationReportRevisionDbSelect,
  ): MOperationReportRevision {
    return new MOperationReportRevision({
      id: result.main.id,

      operationReport: { id: result.main.operationReportId },

      organizationDiagramFile: { id: result.main.organizationDiagramId },

      note: result.main.note,

      operatingCommitteeOperation:
        result.oneToMany.operatingCommitteeOperation.map(operation => ({
          operatingCommittee: { id: operation.operatingCommitteeId },
          note: operation.note,
        })),

      teamOperation: result.oneToMany.teamOperation.map(operation => ({
        team: { id: operation.teamId },
        description: operation.description,
      })),

      submittedAt: result.main.submittedAt,

      cogAgenda: { id: result.main.cogAgendaId },

      gsrcAgenda: { id: result.main.gsrcAgendaId },
    });
  }

  protected modelToDBMapping(
    model: MOperationReportRevision,
  ): OperationReportRevisionDbUpdate {
    return {
      main: {
        id: model.id,
        operationReportId: model.operationReport.id,
        organizationDiagramId: model.organizationDiagramFile.id,
        submittedAt: model.submittedAt,
        cogAgendaId: model.cogAgenda?.id,
        gsrcAgendaId: model.gsrcAgenda?.id,
      },
      oneToOne: {},
      oneToMany: {
        operatingCommitteeOperation: model.operatingCommitteeOperation.map(
          operation => ({
            operatingCommitteeId: operation.operatingCommittee.id,
            note: operation.note,
          }),
        ),
        teamOperation: model.teamOperation.map(operation => ({
          teamId: operation.team.id,
          description: operation.description,
        })),
      },
    };
  }

  protected createToDBMapping(
    model: IOperationReportRevisionCreate,
  ): OperationReportRevisionDbInsert {
    return {
      main: {
        operationReportId: model.operationReport.id,
        organizationDiagramId: model.organizationDiagramFile.id,
        note: model.note,
      },
      oneToOne: {},
      oneToMany: {
        operatingCommitteeOperation: model.operatingCommitteeOperation.map(
          operation => ({
            operatingCommitteeId: operation.operatingCommittee.id,
            note: operation.note,
          }),
        ),
        teamOperation: model.teamOperation.map(operation => ({
          teamId: operation.team.id,
          description: operation.description,
        })),
      },
    };
  }

  protected fieldMap(
    field: OperationReportRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperationReportRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: OperationReportRevision,
      organizationId: OperationReportRevision,
      semesterId: OperationReportRevision,
      operationReportId: OperationReportRevision,
      submittedAt: OperationReportRevision,
      cogAgendaId: OperationReportRevision,
      gsrcAgendaId: OperationReportRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
