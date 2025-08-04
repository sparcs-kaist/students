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
import { Team } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  ITeamCreate,
  MTeam,
} from "@sparcs-students/api/feature/organization/model/organization.team.model";

type TeamQuery = {
  organizationId: number;
  name: string;
  date: Date;
};

type TeamOrderByKeys = "id" | "organizationId" | "startTerm" | "endTerm";
type TeamQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type TeamTable = typeof Team;
type TeamDbSelect = InferSelectModel<TeamTable>;
type TeamDbUpdate = Partial<TeamDbSelect>;
type TeamDbInsert = InferInsertModel<TeamTable>;

type TeamFieldMapKeys = BaseTableFieldMapKeys<
  TeamQuery,
  TeamOrderByKeys,
  TeamQuerySupport
>;

@Injectable()
export class TeamRepository extends BaseSingleTableRepository<
  MTeam,
  ITeamCreate,
  TeamTable,
  TeamQuery,
  TeamOrderByKeys,
  TeamQuerySupport
> {
  constructor() {
    super(Team, MTeam);
  }

  protected dbToModelMapping(result: TeamDbSelect): MTeam {
    return new MTeam({
      id: result.id,
      organization: { id: result.organizationId },
      name: result.name,
      startTerm: result.startTerm,
      endTerm: result.endTerm ?? undefined,
    });
  }

  protected modelToDBMapping(model: MTeam): TeamDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      name: model.name,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected createToDBMapping(model: ITeamCreate): TeamDbInsert {
    return {
      organizationId: model.organization.id,
      name: model.name,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected fieldMap(field: TeamFieldMapKeys): TableWithID | null | undefined {
    const fieldMappings: Record<TeamFieldMapKeys, TableWithID | null> = {
      id: Team,
      organizationId: Team,
      name: Team,
      startTerm: Team,
      endTerm: Team,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: TeamFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(lte(Team.startTerm, value), gt(Team.endTerm, value));
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
