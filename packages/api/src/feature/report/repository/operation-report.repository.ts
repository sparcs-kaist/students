import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { OperationReport } from "@sparcs-students/api/drizzle/schema/project-report.schema";
import {
  IOperationReportCreate,
  MOperationReport,
} from "@sparcs-students/api/feature/report/model/operation-report.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type OperationReportQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type OperationReportOrderByKeys = "id";
type OperationReportQuerySupport = EmptyObject; // Query Support 용

type OperationReportTable = typeof OperationReport;
type OperationReportDbSelect = InferSelectModel<OperationReportTable>;
type OperationReportDbUpdate = Partial<OperationReportDbSelect>;
type OperationReportDbInsert = InferInsertModel<OperationReportTable>;

type OperationReportFieldMapKeys = BaseTableFieldMapKeys<
  OperationReportQuery,
  OperationReportOrderByKeys,
  OperationReportQuerySupport
>;

export type OperationReportRepositoryFindQuery = BaseRepositoryFindQuery<
  OperationReportQuery,
  OperationReportOrderByKeys
>;
export type OperationReportRepositoryQuery =
  BaseRepositoryQuery<OperationReportQuery>;

@Injectable()
export class OperationReportRepository extends BaseSingleTableRepository<
  MOperationReport,
  IOperationReportCreate,
  OperationReportTable,
  OperationReportQuery,
  OperationReportOrderByKeys,
  OperationReportQuerySupport
> {
  constructor() {
    super(OperationReport, MOperationReport);
  }

  protected dbToModelMapping(
    result: OperationReportDbSelect,
  ): MOperationReport {
    return new MOperationReport({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
      organizationDiagram: { id: result.organizationDiagramId },
      note: result.note,
    });
  }

  protected modelToDBMapping(model: MOperationReport): OperationReportDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
      organizationDiagramId: model.organizationDiagram.id,
      note: model.note,
    };
  }

  protected createToDBMapping(
    model: IOperationReportCreate,
  ): OperationReportDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
      organizationDiagramId: model.organizationDiagram.id,
      note: model.note,
    };
  }

  protected fieldMap(
    field: OperationReportFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperationReportFieldMapKeys,
      TableWithID | null
    > = {
      id: OperationReport,
      organizationId: OperationReport,
      semesterId: OperationReport,
      organizationDiagramId: OperationReport,
      note: OperationReport,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
