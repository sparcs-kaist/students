import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectProposal } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IProjectProposalCreate,
  MProjectProposal,
} from "@sparcs-students/api/feature/proposal/model/project-proposal.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectProposalQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type ProjectProposalOrderByKeys = "id";
type ProjectProposalQuerySupport = EmptyObject; // Query Support 용

type ProjectProposalTable = typeof ProjectProposal;
type ProjectProposalDbSelect = InferSelectModel<ProjectProposalTable>;
type ProjectProposalDbUpdate = Partial<ProjectProposalDbSelect>;
type ProjectProposalDbInsert = InferInsertModel<ProjectProposalTable>;

type ProjectProposalFieldMapKeys = BaseTableFieldMapKeys<
  ProjectProposalQuery,
  ProjectProposalOrderByKeys,
  ProjectProposalQuerySupport
>;

export type ProjectProposalRepositoryFindQuery = BaseRepositoryFindQuery<
  ProjectProposalQuery,
  ProjectProposalOrderByKeys
>;
export type ProjectProposalRepositoryQuery =
  BaseRepositoryQuery<ProjectProposalQuery>;

@Injectable()
export class ProjectProposalRepository extends BaseSingleTableRepository<
  MProjectProposal,
  IProjectProposalCreate,
  ProjectProposalTable,
  ProjectProposalQuery,
  ProjectProposalOrderByKeys,
  ProjectProposalQuerySupport
> {
  constructor() {
    super(ProjectProposal, MProjectProposal);
  }

  protected dbToModelMapping(
    result: ProjectProposalDbSelect,
  ): MProjectProposal {
    return new MProjectProposal({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(model: MProjectProposal): ProjectProposalDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IProjectProposalCreate,
  ): ProjectProposalDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: ProjectProposalFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectProposalFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectProposal,
      organizationId: ProjectProposal,
      semesterId: ProjectProposal,
      projectProposalId: ProjectProposal,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
