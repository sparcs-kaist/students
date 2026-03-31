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
import { OperatingCommitteeMember } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOperatingCommitteeMemberCreate,
  MOperatingCommitteeMember,
} from "../model/organization.operatingcommittee.member.model";

type OperatingCommitteeMemberQuery = {
  operatingCommitteeId: number;
  studentId: number;
  title: string;
  date: Date;
};

type OperatingCommitteeMemberOrderByKeys =
  | "id"
  | "operatingCommitteeId"
  | "studentId"
  | "title"
  | "legalBasis"
  | "startTerm"
  | "endTerm";
type OperatingCommitteeMemberQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OperatingCommitteeMemberTable = typeof OperatingCommitteeMember;
type OperatingCommitteeMemberDbSelect =
  InferSelectModel<OperatingCommitteeMemberTable>;
type OperatingCommitteeMemberDbUpdate =
  Partial<OperatingCommitteeMemberDbSelect>;
type OperatingCommitteeMemberDbInsert =
  InferInsertModel<OperatingCommitteeMemberTable>;

type OperatingCommitteeMemberFieldMapKeys = BaseTableFieldMapKeys<
  OperatingCommitteeMemberQuery,
  OperatingCommitteeMemberOrderByKeys,
  OperatingCommitteeMemberQuerySupport
>;

@Injectable()
export class OperatingCommitteeMemberRepository extends BaseSingleTableRepository<
  MOperatingCommitteeMember,
  IOperatingCommitteeMemberCreate,
  OperatingCommitteeMemberTable,
  OperatingCommitteeMemberQuery,
  OperatingCommitteeMemberOrderByKeys,
  OperatingCommitteeMemberQuerySupport
> {
  constructor() {
    super(OperatingCommitteeMember, MOperatingCommitteeMember);
  }

  protected dbToModelMapping(
    result: OperatingCommitteeMemberDbSelect,
  ): MOperatingCommitteeMember {
    return new MOperatingCommitteeMember({
      id: result.id,
      operatingCommittee: { id: result.operatingCommitteeId },
      student: { id: result.studentId },
      title: result.title,
      legalBasis: result.legalBasis,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(
    model: MOperatingCommitteeMember,
  ): OperatingCommitteeMemberDbUpdate {
    return {
      id: model.id,
      operatingCommitteeId: model.operatingCommittee.id,
      studentId: model.student.id,
      title: model.title,
      legalBasis: model.legalBasis,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOperatingCommitteeMemberCreate,
  ): OperatingCommitteeMemberDbInsert {
    return {
      operatingCommitteeId: model.operatingCommittee.id,
      studentId: model.student.id,
      title: model.title,
      legalBasis: model.legalBasis,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: OperatingCommitteeMemberFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperatingCommitteeMemberFieldMapKeys,
      TableWithID | null
    > = {
      id: OperatingCommitteeMember,
      operatingCommitteeId: OperatingCommitteeMember,
      studentId: OperatingCommitteeMember,
      title: OperatingCommitteeMember,
      legalBasis: OperatingCommitteeMember,
      startTerm: OperatingCommitteeMember,
      endTerm: OperatingCommitteeMember,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OperatingCommitteeMemberFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(OperatingCommitteeMember.startTerm, value),
        gt(OperatingCommitteeMember.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
