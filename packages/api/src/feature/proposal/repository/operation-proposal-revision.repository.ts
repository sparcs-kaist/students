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
  OperatingCommitteeProposal,
  OperationProposalRevision,
  TeamOperationProposal,
} from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperationProposalRevisionCreate,
  MOperationProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/operation-proposal-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { DocumentItemStatusEnum } from "@sparcs-students/interface/common/type/revision-base.type";

export type OperationProposalRevisionQuery = {
  organizationId: number;
  semesterId: number;
  projectProposalId: number;
  documentStatusEnum: DocumentItemStatusEnum;
  submittedAt: Date;
  cogAgendaId: number;
  gsrcAgendaId: number;
};

type OperationProposalRevisionOrderByKeys = "id" | "documentStatusEnum";
type OperationProposalRevisionQuerySupport = EmptyObject;

type OperationProposalRevisionTable = {
  main: typeof OperationProposalRevision;
  oneToOne: EmptyObject;
  oneToMany: {
    operatingCommitteeOperation: typeof OperatingCommitteeProposal;
    teamOperation: typeof TeamOperationProposal;
  };
};
type OperationProposalRevisionDbSelect =
  MultiSelectModel<OperationProposalRevisionTable>;
type OperationProposalRevisionDbUpdate =
  MultiUpdateModel<OperationProposalRevisionTable>;
type OperationProposalRevisionDbInsert = MultiInsertModel<
  OperationProposalRevisionTable,
  "operationProposalRevisionId"
>;

type OperationProposalRevisionFieldMapKeys = BaseTableFieldMapKeys<
  OperationProposalRevisionQuery,
  OperationProposalRevisionOrderByKeys,
  OperationProposalRevisionQuerySupport
>;

@Injectable()
export class OperationProposalRevisionRepository extends BaseMultiTableRepository<
  MOperationProposalRevision,
  IOperationProposalRevisionCreate,
  "operationProposalRevisionId",
  OperationProposalRevisionTable,
  OperationProposalRevisionQuery,
  OperationProposalRevisionOrderByKeys,
  OperationProposalRevisionQuerySupport
> {
  constructor() {
    super(
      {
        main: OperationProposalRevision,
        oneToOne: {},
        oneToMany: {
          operatingCommitteeOperation: OperatingCommitteeProposal,
          teamOperation: TeamOperationProposal,
        },
      },
      MOperationProposalRevision,
      "operationProposalRevisionId",
    );
  }

  protected dbToModelMapping(
    result: OperationProposalRevisionDbSelect,
  ): MOperationProposalRevision {
    return new MOperationProposalRevision({
      id: result.main.id,

      operationProposal: { id: result.main.operationProposalId },

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

      documentStatusEnum: result.main.documentStatusEnum,

      submittedAt: result.main.submittedAt,

      cogAgenda: { id: result.main.cogAgendaId },

      gsrcAgenda: { id: result.main.gsrcAgendaId },

      isRemoved: result.main.isRemoved,
    });
  }

  protected modelToDBMapping(
    model: MOperationProposalRevision,
  ): OperationProposalRevisionDbUpdate {
    return {
      main: {
        id: model.id,
        operationProposalId: model.operationProposal.id,
        organizationDiagramId: model.organizationDiagramFile.id,
        documentStatusEnum: model.documentStatusEnum,
        submittedAt: model.submittedAt,
        cogAgendaId: model.cogAgenda?.id,
        gsrcAgendaId: model.gsrcAgenda?.id,
        isRemoved: model.isRemoved,
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
    model: IOperationProposalRevisionCreate,
  ): OperationProposalRevisionDbInsert {
    return {
      main: {
        operationProposalId: model.operationProposal.id,
        organizationDiagramId: model.organizationDiagramFile.id,
        note: model.note,
        documentStatusEnum: model.documentStatusEnum,
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
    field: OperationProposalRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperationProposalRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: OperationProposalRevision,
      organizationId: OperationProposalRevision,
      semesterId: OperationProposalRevision,
      operationProposalId: OperationProposalRevision,
      documentStatusEnum: OperationProposalRevision,
      submittedAt: OperationProposalRevision,
      cogAgendaId: OperationProposalRevision,
      gsrcAgendaId: OperationProposalRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
