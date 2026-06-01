import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { OperationProposalRevision } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperationProposalRevisionCreate,
  MOperationProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/operation-proposal-revision.model";

export type OperationProposalRevisionQuery = {
  operationProposalId: number;
  organizationDiagramId: number;
  submittedAt: Date;
  cogAgendaId: number;
  gsrcAgendaId: number;
};

type OperationProposalRevisionOrderByKeys = "id";
type OperationProposalRevisionQuerySupport = EmptyObject;
type OperationProposalRevisionTable = typeof OperationProposalRevision;
type OperationProposalRevisionDbSelect =
  InferSelectModel<OperationProposalRevisionTable>;
type OperationProposalRevisionDbUpdate =
  Partial<OperationProposalRevisionDbSelect>;
type OperationProposalRevisionDbInsert =
  InferInsertModel<OperationProposalRevisionTable>;
type OperationProposalRevisionFieldMapKeys = BaseTableFieldMapKeys<
  OperationProposalRevisionQuery,
  OperationProposalRevisionOrderByKeys,
  OperationProposalRevisionQuerySupport
>;

export type OperationProposalRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    OperationProposalRevisionQuery,
    OperationProposalRevisionOrderByKeys
  >;
export type OperationProposalRevisionRepositoryQuery =
  BaseRepositoryQuery<OperationProposalRevisionQuery>;

@Injectable()
export class OperationProposalRevisionRepository extends BaseSingleTableRepository<
  MOperationProposalRevision,
  IOperationProposalRevisionCreate,
  OperationProposalRevisionTable,
  OperationProposalRevisionQuery,
  OperationProposalRevisionOrderByKeys,
  OperationProposalRevisionQuerySupport
> {
  constructor() {
    super(OperationProposalRevision, MOperationProposalRevision);
  }

  protected dbToModelMapping(
    result: OperationProposalRevisionDbSelect,
  ): MOperationProposalRevision {
    return new MOperationProposalRevision({
      id: result.id,
      operationProposal: { id: result.operationProposalId },
      organizationDiagram: { id: result.organizationDiagramId },
      note: result.note,
      submittedAt: result.submittedAt,
      cogAgenda: result.cogAgendaId ? { id: result.cogAgendaId } : undefined,
      gsrcAgenda: result.gsrcAgendaId ? { id: result.gsrcAgendaId } : undefined,
    });
  }

  protected modelToDBMapping(
    model: MOperationProposalRevision,
  ): OperationProposalRevisionDbUpdate {
    return {
      id: model.id,
      operationProposalId: model.operationProposal.id,
      organizationDiagramId: model.organizationDiagram.id,
      note: model.note,
      submittedAt: model.submittedAt,
      cogAgendaId: model.cogAgenda?.id,
      gsrcAgendaId: model.gsrcAgenda?.id,
    };
  }

  protected createToDBMapping(
    model: IOperationProposalRevisionCreate,
  ): OperationProposalRevisionDbInsert {
    return {
      operationProposalId: model.operationProposal.id,
      organizationDiagramId: model.organizationDiagram.id,
      note: model.note,
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
      operationProposalId: OperationProposalRevision,
      organizationDiagramId: OperationProposalRevision,
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
