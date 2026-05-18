import { Injectable } from "@nestjs/common";
import {
  and,
  gt,
  InferInsertModel,
  InferSelectModel,
  isNull,
  lte,
  SQL,
} from "drizzle-orm";

import {
  BaseTableFieldMapKeys,
  PrimitiveConditionValue,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";

import { Uapresident } from "@sparcs-students/api/drizzle/schema/organization.schema";
import { IUapresidentCreate, MUapresident } from "../model/uapresident.model";

type UapresidentQuery = {
  studentId: number;
  endTerm: Date | null;
  date: Date;
};

type UapresidentOrderByKeys = "id" | "studentId" | "startTerm" | "endTerm";
type UapresidentQuerySupport = {
  startTerm: string;
};

type UapresidentTable = typeof Uapresident;
type UapresidentDbSelect = InferSelectModel<UapresidentTable>;
type UapresidentDbUpdate = Partial<UapresidentDbSelect>;
type UapresidentDbInsert = InferInsertModel<UapresidentTable>;

type UapresidentFieldMapKeys = BaseTableFieldMapKeys<
  UapresidentQuery,
  UapresidentOrderByKeys,
  UapresidentQuerySupport
>;

@Injectable()
export class UapresidentRepository extends BaseSingleTableRepository<
  MUapresident,
  IUapresidentCreate,
  UapresidentTable,
  UapresidentQuery,
  UapresidentOrderByKeys,
  UapresidentQuerySupport
> {
  constructor() {
    super(Uapresident, MUapresident);
  }

  protected dbToModelMapping(result: UapresidentDbSelect): MUapresident {
    return new MUapresident({
      id: result.id,
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(model: MUapresident): UapresidentDbUpdate {
    return {
      id: model.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm ?? null,
    };
  }

  protected createToDBMapping(model: IUapresidentCreate): UapresidentDbInsert {
    return {
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm ?? null,
    };
  }

  protected fieldMap(
    field: UapresidentFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<UapresidentFieldMapKeys, TableWithID | null> = {
      id: Uapresident,
      studentId: Uapresident,
      startTerm: Uapresident,
      endTerm: Uapresident,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: UapresidentFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      return and(
        lte(Uapresident.startTerm, value),
        gt(Uapresident.endTerm, value),
      );
    }

    if (key === "endTerm" && value === null) {
      return isNull(Uapresident.endTerm);
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
