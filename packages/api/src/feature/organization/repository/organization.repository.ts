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
import { Organization } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOrganizationCreate,
  MOrganization,
} from "@sparcs-students/api/feature/organization/model/organization.model";

type OrganizationQuery = {
  organizationId: number;
  organizationTypeEnum: number;
  foundingYear: number;
  startTerm: string;
  endTerm: string;
  organizationStateEnum: number;
  date: Date;
};

type OrganizationOrderByKeys =
  | "id"
  | "organizationId"
  | "organizationTypeEnum"
  | "startTerm"
  | "endTerm";
type OrganizationQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OrganizationTable = typeof Organization;
type OrganizationDbSelect = InferSelectModel<OrganizationTable>;
type OrganizationDbUpdate = Partial<OrganizationDbSelect>;
type OrganizationDbInsert = InferInsertModel<OrganizationTable>;

type OrganizationFieldMapKeys = BaseTableFieldMapKeys<
  OrganizationQuery,
  OrganizationOrderByKeys,
  OrganizationQuerySupport
>;

@Injectable()
export class OrganizationRepository extends BaseSingleTableRepository<
  MOrganization,
  IOrganizationCreate,
  OrganizationTable,
  OrganizationQuery,
  OrganizationOrderByKeys,
  OrganizationQuerySupport
> {
  constructor() {
    super(Organization, MOrganization);
  }

  protected dbToModelMapping(result: OrganizationDbSelect): MOrganization {
    return new MOrganization({
      id: result.id,
      name: result.name,
      nameEng: result.nameEng,
      organizationTypeEnum: result.organizationTypeEnum,
      foundingYear: result.foundingYear,
      startTerm: result.startTerm,
      endTerm: result.endTerm,
      organizationStateEnum: result.organizationStateEnum,
    });
  }

  protected modelToDBMapping(model: MOrganization): OrganizationDbUpdate {
    return {
      id: model.id,
      name: model.name,
      nameEng: model.nameEng,
      organizationTypeEnum: model.organizationTypeEnum,
      foundingYear: model.foundingYear,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
      organizationStateEnum: model.organizationStateEnum,
    };
  }

  protected createToDBMapping(
    model: IOrganizationCreate,
  ): OrganizationDbInsert {
    return {
      name: model.name,
      nameEng: model.nameEng,
      organizationTypeEnum: model.organizationTypeEnum,
      foundingYear: model.foundingYear,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
      organizationStateEnum: model.organizationStateEnum,
    };
  }

  protected fieldMap(
    field: OrganizationFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<OrganizationFieldMapKeys, TableWithID | null> =
      {
        id: Organization,
        organizationId: Organization,
        organizationTypeEnum: Organization,
        foundingYear: Organization,
        startTerm: Organization,
        endTerm: Organization,
        organizationStateEnum: Organization,
        date: null,
      };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OrganizationFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(Organization.startTerm, value),
        gt(Organization.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
