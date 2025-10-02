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
import { OrganizationManager } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOrganizationManagerCreate,
  MOrganizationManager,
} from "@sparcs-students/api/feature/organization/model/organization.manager.model";

type OrganizationManagerQuery = {
  studentId: number;
  organizationId: number;
  date: Date;
};

type OrganizationManagerOrderByKeys =
  | "id"
  | "organizationId"
  | "startTerm"
  | "endTerm";
type OrganizationManagerQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OrganizationManagerTable = typeof OrganizationManager;
type OrganizationManagerDbSelect = InferSelectModel<OrganizationManagerTable>;
type OrganizationManagerDbUpdate = Partial<OrganizationManagerDbSelect>;
type OrganizationManagerDbInsert = InferInsertModel<OrganizationManagerTable>;

type OrganizationManagerFieldMapKeys = BaseTableFieldMapKeys<
  OrganizationManagerQuery,
  OrganizationManagerOrderByKeys,
  OrganizationManagerQuerySupport
>;

@Injectable()
export class OrganizationManagerRepository extends BaseSingleTableRepository<
  MOrganizationManager,
  IOrganizationManagerCreate,
  OrganizationManagerTable,
  OrganizationManagerQuery,
  OrganizationManagerOrderByKeys,
  OrganizationManagerQuerySupport,
  number
> {
  constructor() {
    super(OrganizationManager, MOrganizationManager);
  }

  protected dbToModelMapping(
    result: OrganizationManagerDbSelect,
  ): MOrganizationManager {
    return new MOrganizationManager({
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
    model: MOrganizationManager,
  ): OrganizationManagerDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOrganizationManagerCreate,
  ): OrganizationManagerDbInsert {
    return {
      organizationId: model.organization.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: OrganizationManagerFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OrganizationManagerFieldMapKeys,
      TableWithID | null
    > = {
      id: OrganizationManager,
      organizationId: OrganizationManager,
      studentId: OrganizationManager,
      startTerm: OrganizationManager,
      endTerm: OrganizationManager,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OrganizationManagerFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(OrganizationManager.startTerm, value),
        gt(OrganizationManager.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
