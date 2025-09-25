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
import { OperatingCommittee } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOperatingCommitteeCreate,
  MOperatingCommittee,
} from "@sparcs-students/api/feature/organization/model/organization.operatingcommittee.model";

type OperatingCommitteeQuery = {
  organizationId: number;
  name: string;
  committeeTypeEnum: number;
  date: Date;
};

type OperatingCommitteeOrderByKeys =
  | "id"
  | "organizationId"
  | "committeeTypeEnum"
  | "startTerm"
  | "endTerm";
type OperatingCommitteeQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OperatingCommitteeTable = typeof OperatingCommittee;
type OperatingCommitteeDbSelect = InferSelectModel<OperatingCommitteeTable>;
type OperatingCommitteeDbUpdate = Partial<OperatingCommitteeDbSelect>;
type OperatingCommitteeDbInsert = InferInsertModel<OperatingCommitteeTable>;

type OperatingCommitteeFieldMapKeys = BaseTableFieldMapKeys<
  OperatingCommitteeQuery,
  OperatingCommitteeOrderByKeys,
  OperatingCommitteeQuerySupport
>;

@Injectable()
export class OperatingCommitteeRepository extends BaseSingleTableRepository<
  MOperatingCommittee,
  IOperatingCommitteeCreate,
  OperatingCommitteeTable,
  OperatingCommitteeQuery,
  OperatingCommitteeOrderByKeys,
  OperatingCommitteeQuerySupport
> {
  constructor() {
    super(OperatingCommittee, MOperatingCommittee);
  }

  protected dbToModelMapping(
    result: OperatingCommitteeDbSelect,
  ): MOperatingCommittee {
    return new MOperatingCommittee({
      id: result.id,
      organization: { id: result.organizationId },
      name: result.name,
      nameEng: result.nameEng,
      committeeTypeEnum: result.committeeTypeEnum,
      startTerm: result.startTerm,
      endTerm: result.endTerm,
    });
  }

  protected modelToDBMapping(
    model: MOperatingCommittee,
  ): OperatingCommitteeDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      name: model.name,
      nameEng: model.nameEng,
      committeeTypeEnum: model.committeeTypeEnum,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOperatingCommitteeCreate,
  ): OperatingCommitteeDbInsert {
    return {
      organizationId: model.organization.id,
      name: model.name,
      nameEng: model.nameEng,
      committeeTypeEnum: model.committeeTypeEnum,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected fieldMap(
    field: OperatingCommitteeFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OperatingCommitteeFieldMapKeys,
      TableWithID | null
    > = {
      id: OperatingCommittee,
      organizationId: OperatingCommittee,
      name: OperatingCommittee,
      committeeTypeEnum: OperatingCommittee,
      startTerm: OperatingCommittee,
      endTerm: OperatingCommittee,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OperatingCommitteeFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(OperatingCommittee.startTerm, value),
        gt(OperatingCommittee.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
