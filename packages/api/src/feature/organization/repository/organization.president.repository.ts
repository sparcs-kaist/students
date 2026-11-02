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
import { OrganizationPresident } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  IOrganizationPresidentCreate,
  MOrganizationPresident,
} from "@sparcs-students/api/feature/organization/model/organization.president.model";

type OrganizationPresidentQuery = {
  studentId: number;
  organizationId: number;
  organizationPresidentTypeEnum: number;
  phoneNumber: string;
  date: Date;
};

type OrganizationPresidentOrderByKeys =
  | "id"
  | "organizationId"
  | "organizationPresidentTypeEnum"
  | "startTerm"
  | "endTerm";
type OrganizationPresidentQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type OrganizationPresidentTable = typeof OrganizationPresident;
type OrganizationPresidentDbSelect =
  InferSelectModel<OrganizationPresidentTable>;
type OrganizationPresidentDbUpdate = Partial<OrganizationPresidentDbSelect>;
type OrganizationPresidentDbInsert =
  InferInsertModel<OrganizationPresidentTable>;

type OrganizationPresidentFieldMapKeys = BaseTableFieldMapKeys<
  OrganizationPresidentQuery,
  OrganizationPresidentOrderByKeys,
  OrganizationPresidentQuerySupport
>;

@Injectable()
export class OrganizationPresidentRepository extends BaseSingleTableRepository<
  MOrganizationPresident,
  IOrganizationPresidentCreate,
  OrganizationPresidentTable,
  OrganizationPresidentQuery,
  OrganizationPresidentOrderByKeys,
  OrganizationPresidentQuerySupport,
  number
> {
  constructor() {
    super(OrganizationPresident, MOrganizationPresident);
  }

  async findByStudentId(studentId: number): Promise<MOrganizationPresident[]> {
    return this.find({
      studentId,
    } as Parameters<typeof this.find>[0]);
  }

  protected dbToModelMapping(
    result: OrganizationPresidentDbSelect,
  ): MOrganizationPresident {
    return new MOrganizationPresident({
      id: result.id,
      organization: { id: result.organizationId },
      organizationPresidentTypeEnum: result.organizationPresidentTypeEnum,
      title: result.title,
      student: { id: result.studentId },
      phoneNumber: result.phoneNumber,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(
    model: MOrganizationPresident,
  ): OrganizationPresidentDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      organizationPresidentTypeEnum: model.organizationPresidentTypeEnum,
      title: model.title,
      studentId: model.student.id,
      phoneNumber: model.phoneNumber,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(
    model: IOrganizationPresidentCreate,
  ): OrganizationPresidentDbInsert {
    return {
      organizationId: model.organization.id,
      organizationPresidentTypeEnum: model.organizationPresidentTypeEnum,
      title: model.title,
      studentId: model.student.id,
      phoneNumber: model.phoneNumber,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: OrganizationPresidentFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      OrganizationPresidentFieldMapKeys,
      TableWithID | null
    > = {
      id: OrganizationPresident,
      organizationId: OrganizationPresident,
      organizationPresidentTypeEnum: OrganizationPresident,
      studentId: OrganizationPresident,
      phoneNumber: OrganizationPresident,
      startTerm: OrganizationPresident,
      endTerm: OrganizationPresident,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: OrganizationPresidentFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(OrganizationPresident.startTerm, value),
        gt(OrganizationPresident.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
