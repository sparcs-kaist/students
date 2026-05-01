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
import { OrganizationMember } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOrganizationMemberCreate,
  MOrganizationMember,
} from "@sparcs-students/api/feature/organization/model/organization.member.model";

type OrganizationMemberQuery = {
  studentId?: number;
  organizationId?: number;
  date?: Date;
};

type OrganizationMemberOrderByKeys =
  | "id"
  | "organizationId"
  | "startTerm"
  | "endTerm";
type OrganizationMemberQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OrganizationMemberTable = typeof OrganizationMember;
type OrganizationMemberDbSelect = InferSelectModel<OrganizationMemberTable>;
type OrganizationMemberDbUpdate = Partial<OrganizationMemberDbSelect>;
type OrganizationMemberDbInsert = InferInsertModel<OrganizationMemberTable>;

type OrganizationMemberFieldMapKeys = BaseTableFieldMapKeys<
  OrganizationMemberQuery,
  OrganizationMemberOrderByKeys,
  OrganizationMemberQuerySupport
>;

@Injectable()
export class OrganizationMemberRepository extends BaseSingleTableRepository<
  MOrganizationMember,
  IOrganizationMemberCreate,
  OrganizationMemberTable,
  OrganizationMemberQuery,
  OrganizationMemberOrderByKeys,
  OrganizationMemberQuerySupport
> {
  constructor() {
    super(OrganizationMember, MOrganizationMember);
  }

  protected dbToModelMapping(
    result: OrganizationMemberDbSelect,
  ): MOrganizationMember {
    return new MOrganizationMember({
      id: result.id,
      organization: { id: result.organizationId },
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(
    model: MOrganizationMember,
  ): OrganizationMemberDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOrganizationMemberCreate,
  ): OrganizationMemberDbInsert {
    return {
      organizationId: model.organization.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: OrganizationMemberFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OrganizationMemberFieldMapKeys,
      TableWithID | null
    > = {
      id: OrganizationMember,
      organizationId: OrganizationMember,
      studentId: OrganizationMember,
      startTerm: OrganizationMember,
      endTerm: OrganizationMember,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OrganizationMemberFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(OrganizationMember.startTerm, value),
        gt(OrganizationMember.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
