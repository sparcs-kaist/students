import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectReportDocumentReview } from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IProjectReportDocumentReviewCreate,
  MProjectReportDocumentReview,
} from "@sparcs-students/api/feature/report/model/project-report-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectReportDocumentReviewQuery = {
  projectReportRevisionId: number;
  studentId: number;
};

type ProjectReportDocumentReviewOrderByKeys = "id";
type ProjectReportDocumentReviewQuerySupport = EmptyObject;

type ProjectReportDocumentReviewTable = typeof ProjectReportDocumentReview;
type ProjectReportDocumentReviewDbSelect =
  InferSelectModel<ProjectReportDocumentReviewTable>;
type ProjectReportDocumentReviewDbUpdate =
  Partial<ProjectReportDocumentReviewDbSelect>;
type ProjectReportDocumentReviewDbInsert =
  InferInsertModel<ProjectReportDocumentReviewTable>;

type ProjectReportDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  ProjectReportDocumentReviewQuery,
  ProjectReportDocumentReviewOrderByKeys,
  ProjectReportDocumentReviewQuerySupport
>;

export type ProjectReportDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    ProjectReportDocumentReviewQuery,
    ProjectReportDocumentReviewOrderByKeys
  >;
export type ProjectReportDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<ProjectReportDocumentReviewQuery>;

@Injectable()
export class ProjectReportDocumentReviewRepository extends BaseSingleTableRepository<
  MProjectReportDocumentReview,
  IProjectReportDocumentReviewCreate,
  ProjectReportDocumentReviewTable,
  ProjectReportDocumentReviewQuery,
  ProjectReportDocumentReviewOrderByKeys,
  ProjectReportDocumentReviewQuerySupport
> {
  constructor() {
    super(ProjectReportDocumentReview, MProjectReportDocumentReview);
  }

  protected dbToModelMapping(
    result: ProjectReportDocumentReviewDbSelect,
  ): MProjectReportDocumentReview {
    return new MProjectReportDocumentReview({
      id: result.id,
      projectReportRevision: { id: result.projectReportRevisionId },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnum,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MProjectReportDocumentReview,
  ): ProjectReportDocumentReviewDbUpdate {
    return {
      id: model.id,
      projectReportRevisionId: model.projectReportRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IProjectReportDocumentReviewCreate,
  ): ProjectReportDocumentReviewDbInsert {
    return {
      projectReportRevisionId: model.projectReportRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: ProjectReportDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      ProjectReportDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: ProjectReportDocumentReview,
      projectReportRevisionId: ProjectReportDocumentReview,
      studentId: ProjectReportDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
