import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { OperationProposalRevision } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperationProposalRevisionCreate,
  MOperationProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/operation-proposal-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperationProposalRevisionQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
  projectProposalId: number;
};

type OperationProposalRevisionOrderByKeys = "id";
type OperationProposalRevisionQuerySupport = EmptyObject; // Query Support 용

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
      organizationDiagramFile: { id: result.organizationDiagramId },
      note: result.note,
      documentStatusEnum: result.documentStatusEnum,
      submittedAt: result.submittedAt,
      cogAgenda: { id: result.cogAgendaId },
      gsrcAgenda: { id: result.gsrcAgendaId },
    });
  }

  protected modelToDBMapping(
    model: MOperationProposalRevision,
  ): OperationProposalRevisionDbUpdate {
    return {
      id: model.id,
      operationProposalId: model.operationProposal.id,
      organizationDiagramId: model.organizationDiagramFile.id,
      note: model.note,
      documentStatusEnum: model.documentStatusEnum,
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
      organizationDiagramId: model.organizationDiagramFile.id,
      note: model.note,
      documentStatusEnum: model.documentStatusEnum,
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
      projectProposalId: OperationProposalRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
