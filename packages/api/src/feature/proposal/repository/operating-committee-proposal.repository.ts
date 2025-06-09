import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { OperatingCommitteeProposal } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperatingCommitteeProposalCreate,
  MOperatingCommitteeProposal,
} from "@sparcs-students/api/feature/proposal/model/operating-committee-proposal.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperatingCommitteeProposalQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type OperatingCommitteeProposalOrderByKeys = "id";
type OperatingCommitteeProposalQuerySupport = EmptyObject; // Query Support 용

type OperatingCommitteeProposalTable = typeof OperatingCommitteeProposal;
type OperatingCommitteeProposalDbSelect =
  InferSelectModel<OperatingCommitteeProposalTable>;
type OperatingCommitteeProposalDbUpdate =
  Partial<OperatingCommitteeProposalDbSelect>;
type OperatingCommitteeProposalDbInsert =
  InferInsertModel<OperatingCommitteeProposalTable>;

type OperatingCommitteeProposalFieldMapKeys = BaseTableFieldMapKeys<
  OperatingCommitteeProposalQuery,
  OperatingCommitteeProposalOrderByKeys,
  OperatingCommitteeProposalQuerySupport
>;

export type OperatingCommitteeProposalRepositoryFindQuery =
  BaseRepositoryFindQuery<
    OperatingCommitteeProposalQuery,
    OperatingCommitteeProposalOrderByKeys
  >;
export type OperatingCommitteeProposalRepositoryQuery =
  BaseRepositoryQuery<OperatingCommitteeProposalQuery>;

@Injectable()
export class OperatingCommitteeProposalRepository extends BaseSingleTableRepository<
  MOperatingCommitteeProposal,
  IOperatingCommitteeProposalCreate,
  OperatingCommitteeProposalTable,
  OperatingCommitteeProposalQuery,
  OperatingCommitteeProposalOrderByKeys,
  OperatingCommitteeProposalQuerySupport
> {
  constructor() {
    super(OperatingCommitteeProposal, MOperatingCommitteeProposal);
  }

  protected dbToModelMapping(
    result: OperatingCommitteeProposalDbSelect,
  ): MOperatingCommitteeProposal {
    return new MOperatingCommitteeProposal({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
      operatingCommittee: { id: result.operatingCommitteeId },
    });
  }

  protected modelToDBMapping(
    model: MOperatingCommitteeProposal,
  ): OperatingCommitteeProposalDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
      operatingCommitteeId: model.operatingCommittee.id,
    };
  }

  protected createToDBMapping(
    model: IOperatingCommitteeProposalCreate,
  ): OperatingCommitteeProposalDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
      operatingCommitteeId: model.operatingCommittee.id,
    };
  }

  protected fieldMap(
    field: OperatingCommitteeProposalFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperatingCommitteeProposalFieldMapKeys,
      TableWithID | null
    > = {
      id: OperatingCommitteeProposal,
      organizationId: OperatingCommitteeProposal,
      semesterId: OperatingCommitteeProposal,
      projectProposalId: OperatingCommitteeProposal,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
