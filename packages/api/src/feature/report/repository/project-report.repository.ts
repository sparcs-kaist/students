import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { ProjectReport } from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IProjectReportCreate,
  MProjectReport,
} from "@sparcs-students/api/feature/report/model/project-report.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type ProjectReportQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type ProjectReportOrderByKeys = "id";
type ProjectReportQuerySupport = EmptyObject; // Query Support 용

type ProjectReportTable = typeof ProjectReport;
type ProjectReportDbSelect = InferSelectModel<ProjectReportTable>;
type ProjectReportDbUpdate = Partial<ProjectReportDbSelect>;
type ProjectReportDbInsert = InferInsertModel<ProjectReportTable>;

type ProjectReportFieldMapKeys = BaseTableFieldMapKeys<
  ProjectReportQuery,
  ProjectReportOrderByKeys,
  ProjectReportQuerySupport
>;

export type ProjectReportRepositoryFindQuery = BaseRepositoryFindQuery<
  ProjectReportQuery,
  ProjectReportOrderByKeys
>;
export type ProjectReportRepositoryQuery =
  BaseRepositoryQuery<ProjectReportQuery>;

@Injectable()
export class ProjectReportRepository extends BaseSingleTableRepository<
  MProjectReport,
  IProjectReportCreate,
  ProjectReportTable,
  ProjectReportQuery,
  ProjectReportOrderByKeys,
  ProjectReportQuerySupport
> {
  constructor() {
    super(ProjectReport, MProjectReport);
  }

  protected dbToModelMapping(result: ProjectReportDbSelect): MProjectReport {
    return new MProjectReport({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(model: MProjectReport): ProjectReportDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IProjectReportCreate,
  ): ProjectReportDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: ProjectReportFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<ProjectReportFieldMapKeys, TableWithID | null> =
      {
        id: ProjectReport,
        organizationId: ProjectReport,
        semesterId: ProjectReport,
        projectReportId: ProjectReport,
      };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
