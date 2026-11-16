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
import { OrganizationRole } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOrganizationRoleCreate,
  MOrganizationRole,
} from "../model/organization.role.model";

type OrganizationRoleQuery = {
  organizationId?: number;
  studentId?: number;
  roleName?: string;
  date?: Date;
};
type OrganizationRoleOrderByKeys =
  | "id"
  | "organizationId"
  | "studentId"
  | "roleName"
  | "startTerm"
  | "endTerm";
type OrganizationRoleQuerySupport = { startTerm: string; endTerm: string };
type OrganizationRoleTable = typeof OrganizationRole;
type OrganizationRoleDbSelect = InferSelectModel<OrganizationRoleTable>;
type OrganizationRoleDbUpdate = Partial<
  InferSelectModel<OrganizationRoleTable>
>;
type OrganizationRoleDbInsert = InferInsertModel<OrganizationRoleTable>;
type OrganizationRoleFieldMapKeys = BaseTableFieldMapKeys<
  OrganizationRoleQuery,
  OrganizationRoleOrderByKeys,
  OrganizationRoleQuerySupport
>;

@Injectable()
export class OrganizationRoleRepository extends BaseSingleTableRepository<
  MOrganizationRole,
  IOrganizationRoleCreate,
  OrganizationRoleTable,
  OrganizationRoleQuery,
  OrganizationRoleOrderByKeys,
  OrganizationRoleQuerySupport
> {
  constructor() {
    super(OrganizationRole, MOrganizationRole);
  }

  protected dbToModelMapping(
    result: OrganizationRoleDbSelect,
  ): MOrganizationRole {
    return new MOrganizationRole({
      id: result.id,
      organization: { id: result.organizationId },
      student: { id: result.studentId },
      roleName: result.roleName,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(
    model: MOrganizationRole,
  ): OrganizationRoleDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      studentId: model.student.id,
      roleName: model.roleName,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOrganizationRoleCreate,
  ): OrganizationRoleDbInsert {
    return {
      organizationId: model.organization.id,
      studentId: model.student.id,
      roleName: model.roleName,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: OrganizationRoleFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OrganizationRoleFieldMapKeys,
      TableWithID | null
    > = {
      id: OrganizationRole,
      organizationId: OrganizationRole,
      studentId: OrganizationRole,
      roleName: OrganizationRole,
      startTerm: OrganizationRole,
      endTerm: OrganizationRole,
      date: null,
    };
    return field in fieldMappings ? fieldMappings[field] : undefined;
  }

  protected processSpecialCondition(
    key: OrganizationRoleFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      return and(
        lte(OrganizationRole.startTerm, value),
        gt(OrganizationRole.endTerm, value),
      );
    }
    throw new Error(`Invalid key: ${String(key)}`);
  }
}
