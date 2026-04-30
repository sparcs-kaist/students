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

import { Staff } from "@sparcs-students/api/drizzle/schema/organization.schema";
import { IStaffCreate, MStaff } from "../model/staff.model";

type StaffQuery = {
  studentId: number;
  date: Date;
};

type StaffOrderByKeys = "id" | "studentId" | "startTerm" | "endTerm";
type StaffQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type StaffTable = typeof Staff;
type StaffDbSelect = InferSelectModel<StaffTable>;
type StaffDbUpdate = Partial<StaffDbSelect>;
type StaffDbInsert = InferInsertModel<StaffTable>;

type StaffFieldMapKeys = BaseTableFieldMapKeys<
  StaffQuery,
  StaffOrderByKeys,
  StaffQuerySupport
>;

@Injectable()
export class StaffRepository extends BaseSingleTableRepository<
  MStaff,
  IStaffCreate,
  StaffTable,
  StaffQuery,
  StaffOrderByKeys,
  StaffQuerySupport
> {
  constructor() {
    super(Staff, MStaff);
  }

  protected dbToModelMapping(result: StaffDbSelect): MStaff {
    return new MStaff({
      id: result.id,
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(model: MStaff): StaffDbUpdate {
    return {
      id: model.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(model: IStaffCreate): StaffDbInsert {
    return {
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(field: StaffFieldMapKeys): TableWithID | null | undefined {
    const fieldMappings: Record<StaffFieldMapKeys, TableWithID | null> = {
      id: Staff,
      studentId: Staff,
      startTerm: Staff,
      endTerm: Staff,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: StaffFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      return and(lte(Staff.startTerm, value), gt(Staff.endTerm, value));
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
