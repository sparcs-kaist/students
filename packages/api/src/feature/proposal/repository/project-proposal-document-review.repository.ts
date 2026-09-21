import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectProposalDocumentReview } from "@sparcs-students/api/drizzle/schema/project-proposal.schema";
import {
  IProjectProposalDocumentReviewCreate,
  MProjectProposalDocumentReview,
} from "@sparcs-students/api/feature/proposal/model/project-proposal-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectProposalDocumentReviewQuery = {
  projectProposalRevisionId: number;
  studentId: number;
};

type ProjectProposalDocumentReviewOrderByKeys = "id";
type ProjectProposalDocumentReviewQuerySupport = EmptyObject;

type ProjectProposalDocumentReviewTable = typeof ProjectProposalDocumentReview;
type ProjectProposalDocumentReviewDbSelect =
  InferSelectModel<ProjectProposalDocumentReviewTable>;
type ProjectProposalDocumentReviewDbUpdate =
  Partial<ProjectProposalDocumentReviewDbSelect>;
type ProjectProposalDocumentReviewDbInsert =
  InferInsertModel<ProjectProposalDocumentReviewTable>;

type ProjectProposalDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  ProjectProposalDocumentReviewQuery,
  ProjectProposalDocumentReviewOrderByKeys,
  ProjectProposalDocumentReviewQuerySupport
>;

export type ProjectProposalDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    ProjectProposalDocumentReviewQuery,
    ProjectProposalDocumentReviewOrderByKeys
  >;
export type ProjectProposalDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<ProjectProposalDocumentReviewQuery>;

@Injectable()
export class ProjectProposalDocumentReviewRepository extends BaseSingleTableRepository<
  MProjectProposalDocumentReview,
  IProjectProposalDocumentReviewCreate,
  ProjectProposalDocumentReviewTable,
  ProjectProposalDocumentReviewQuery,
  ProjectProposalDocumentReviewOrderByKeys,
  ProjectProposalDocumentReviewQuerySupport
> {
  constructor() {
    super(ProjectProposalDocumentReview, MProjectProposalDocumentReview);
  }

  protected dbToModelMapping(
    result: ProjectProposalDocumentReviewDbSelect,
  ): MProjectProposalDocumentReview {
    return new MProjectProposalDocumentReview({
      id: result.id,
      projectProposalRevision: { id: result.projectProposalRevisionId },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnumId,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MProjectProposalDocumentReview,
  ): ProjectProposalDocumentReviewDbUpdate {
    return {
      id: model.id,
      projectProposalRevisionId: model.projectProposalRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnumId: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IProjectProposalDocumentReviewCreate,
  ): ProjectProposalDocumentReviewDbInsert {
    return {
      projectProposalRevisionId: model.projectProposalRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnumId: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: ProjectProposalDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectProposalDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectProposalDocumentReview,
      projectProposalRevisionId: ProjectProposalDocumentReview,
      studentId: ProjectProposalDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
