import { Injectable } from "@nestjs/common";
import {
  and,
  gt,
  InferInsertModel,
  InferSelectModel,
  lte,
  SQL,
} from "drizzle-orm";

import {
  BaseTableFieldMapKeys,
  PrimitiveConditionValue,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { Semester } from "@sparcs-students/api/drizzle/schema/semester.schema";
import {
  ISemesterCreate,
  MSemester,
} from "@sparcs-students/api/feature/semester/type/semester.model";

export type SemesterQuery = { date: Date; endTerm: Date };

type SemesterOrderByKeys = "id" | "year" | "name" | "startTerm" | "endTerm";
type SemesterQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type SemesterTable = typeof Semester;
type SemesterDbSelect = InferSelectModel<SemesterTable>;
type SemesterDbUpdate = Partial<SemesterDbSelect>;
type SemesterDbInsert = InferInsertModel<SemesterTable>;

type SemesterFieldMapKeys = BaseTableFieldMapKeys<
  SemesterQuery,
  SemesterOrderByKeys,
  SemesterQuerySupport
>;

@Injectable()
export class SemesterRepository extends BaseSingleTableRepository<
  MSemester,
  ISemesterCreate,
  SemesterTable,
  SemesterQuery,
  SemesterOrderByKeys,
  SemesterQuerySupport
> {
  constructor() {
    super(Semester, MSemester);
  }

  protected dbToModelMapping(result: SemesterDbSelect): MSemester {
    return new MSemester({
      id: result.id,
      year: result.year,
      name: result.name,
      semesterEnum: result.semesterEnum,
      startTerm: result.startTerm,
      endTerm: result.endTerm,
    });
  }

  protected modelToDBMapping(model: MSemester): SemesterDbUpdate {
    return {
      id: model.id,
      year: model.year,
      name: model.name,
      semesterEnum: model.semesterEnum,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected createToDBMapping(model: ISemesterCreate): SemesterDbInsert {
    return {
      year: model.year,
      name: model.name,
      semesterEnum: model.semesterEnum,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected fieldMap(
    field: SemesterFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<SemesterFieldMapKeys, TableWithID | null> = {
      id: Semester,
      year: Semester,
      name: Semester,
      startTerm: Semester,
      endTerm: Semester,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: SemesterFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(lte(Semester.startTerm, value), gt(Semester.endTerm, value));
    }

    throw new Error(`Invalid key: ${key}`);
  }
}
