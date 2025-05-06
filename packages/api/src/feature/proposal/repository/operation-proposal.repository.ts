import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { OperationProposal } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperationProposalCreate,
  MOperationProposal,
} from "@sparcs-students/api/feature/proposal/model/operation-proposal.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperationProposalQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type OperationProposalOrderByKeys = "id";
type OperationProposalQuerySupport = EmptyObject; // Query Support 용

type OperationProposalTable = typeof OperationProposal;
type OperationProposalDbSelect = InferSelectModel<OperationProposalTable>;
type OperationProposalDbUpdate = Partial<OperationProposalDbSelect>;
type OperationProposalDbInsert = InferInsertModel<OperationProposalTable>;

type OperationProposalFieldMapKeys = BaseTableFieldMapKeys<
  OperationProposalQuery,
  OperationProposalOrderByKeys,
  OperationProposalQuerySupport
>;

export type OperationProposalRepositoryFindQuery = BaseRepositoryFindQuery<
  OperationProposalQuery,
  OperationProposalOrderByKeys
>;
export type OperationProposalRepositoryQuery =
  BaseRepositoryQuery<OperationProposalQuery>;

@Injectable()
export class OperationProposalRepository extends BaseSingleTableRepository<
  MOperationProposal,
  IOperationProposalCreate,
  OperationProposalTable,
  OperationProposalQuery,
  OperationProposalOrderByKeys,
  OperationProposalQuerySupport
> {
  constructor() {
    super(OperationProposal, MOperationProposal);
  }

  protected dbToModelMapping(
    result: OperationProposalDbSelect,
  ): MOperationProposal {
    return new MOperationProposal({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(
    model: MOperationProposal,
  ): OperationProposalDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IOperationProposalCreate,
  ): OperationProposalDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: OperationProposalFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperationProposalFieldMapKeys,
      TableWithID | null
    > = {
      id: OperationProposal,
      organizationId: OperationProposal,
      semesterId: OperationProposal,
      projectProposalId: OperationProposal,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
