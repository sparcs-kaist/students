import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { OperatingCommitteeProposalRevision } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IOperatingCommitteeProposalRevisionCreate,
  MOperatingCommitteeProposalRevision,
} from "@sparcs-students/api/feature/proposal/model/operating-committee-proposal-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperatingCommitteeProposalRevisionQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
  projectProposalId: number;
};

type OperatingCommitteeProposalRevisionOrderByKeys = "id";
type OperatingCommitteeProposalRevisionQuerySupport = EmptyObject; // Query Support 용

type OperatingCommitteeProposalRevisionTable =
  typeof OperatingCommitteeProposalRevision;
type OperatingCommitteeProposalRevisionDbSelect =
  InferSelectModel<OperatingCommitteeProposalRevisionTable>;
type OperatingCommitteeProposalRevisionDbUpdate =
  Partial<OperatingCommitteeProposalRevisionDbSelect>;
type OperatingCommitteeProposalRevisionDbInsert =
  InferInsertModel<OperatingCommitteeProposalRevisionTable>;

type OperatingCommitteeProposalRevisionFieldMapKeys = BaseTableFieldMapKeys<
  OperatingCommitteeProposalRevisionQuery,
  OperatingCommitteeProposalRevisionOrderByKeys,
  OperatingCommitteeProposalRevisionQuerySupport
>;

export type OperatingCommitteeProposalRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    OperatingCommitteeProposalRevisionQuery,
    OperatingCommitteeProposalRevisionOrderByKeys
  >;
export type OperatingCommitteeProposalRevisionRepositoryQuery =
  BaseRepositoryQuery<OperatingCommitteeProposalRevisionQuery>;

@Injectable()
export class OperatingCommitteeProposalRevisionRepository extends BaseSingleTableRepository<
  MOperatingCommitteeProposalRevision,
  IOperatingCommitteeProposalRevisionCreate,
  OperatingCommitteeProposalRevisionTable,
  OperatingCommitteeProposalRevisionQuery,
  OperatingCommitteeProposalRevisionOrderByKeys,
  OperatingCommitteeProposalRevisionQuerySupport
> {
  constructor() {
    super(
      OperatingCommitteeProposalRevision,
      MOperatingCommitteeProposalRevision,
    );
  }

  protected dbToModelMapping(
    result: OperatingCommitteeProposalRevisionDbSelect,
  ): MOperatingCommitteeProposalRevision {
    return new MOperatingCommitteeProposalRevision({
      id: result.id,
      operatingCommitteeProposal: { id: result.operatingCommitteeProposalId },
      note: result.note,
      documentStatusEnum: result.documentStatusEnum,
      submittedAt: result.submittedAt,
      cogAgenda: { id: result.cogAgendaId },
      gsrcAgenda: { id: result.gsrcAgendaId },
      isRemoved: result.isRemoved,
    });
  }

  protected modelToDBMapping(
    model: MOperatingCommitteeProposalRevision,
  ): OperatingCommitteeProposalRevisionDbUpdate {
    return {
      id: model.id,
      operatingCommitteeProposalId: model.operatingCommitteeProposal.id,
      note: model.note,
      documentStatusEnum: model.documentStatusEnum,
      submittedAt: model.submittedAt,
      cogAgendaId: model.cogAgenda?.id,
      gsrcAgendaId: model.gsrcAgenda?.id,
      isRemoved: model.isRemoved,
    };
  }

  protected createToDBMapping(
    model: IOperatingCommitteeProposalRevisionCreate,
  ): OperatingCommitteeProposalRevisionDbInsert {
    return {
      operatingCommitteeProposalId: model.operatingCommitteeProposal.id,
      note: model.note,
      documentStatusEnum: model.documentStatusEnum,
    };
  }

  protected fieldMap(
    field: OperatingCommitteeProposalRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperatingCommitteeProposalRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: OperatingCommitteeProposalRevision,
      organizationId: OperatingCommitteeProposalRevision,
      semesterId: OperatingCommitteeProposalRevision,
      projectProposalId: OperatingCommitteeProposalRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
