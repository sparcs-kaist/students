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
import { TeamLeader } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  ITeamLeaderCreate,
  MTeamLeader,
} from "../model/organization.team.leader.model";

type TeamLeaderQuery = {
  teamId: number;
  studentId: number;
  date: Date;
};

type TeamLeaderOrderByKeys =
  | "id"
  | "teamId"
  | "studentId"
  | "startTerm"
  | "endTerm";
type TeamLeaderQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type TeamLeaderTable = typeof TeamLeader;
type TeamLeaderDbSelect = InferSelectModel<TeamLeaderTable>;
type TeamLeaderDbUpdate = Partial<TeamLeaderDbSelect>;
type TeamLeaderDbInsert = InferInsertModel<TeamLeaderTable>;

type TeamLeaderFieldMapKeys = BaseTableFieldMapKeys<
  TeamLeaderQuery,
  TeamLeaderOrderByKeys,
  TeamLeaderQuerySupport
>;

@Injectable()
export class TeamLeaderRepository extends BaseSingleTableRepository<
  MTeamLeader,
  ITeamLeaderCreate,
  TeamLeaderTable,
  TeamLeaderQuery,
  TeamLeaderOrderByKeys,
  TeamLeaderQuerySupport
> {
  constructor() {
    super(TeamLeader, MTeamLeader);
  }

  protected dbToModelMapping(result: TeamLeaderDbSelect): MTeamLeader {
    return new MTeamLeader({
      id: result.id,
      team: { id: result.teamId },
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(model: MTeamLeader): TeamLeaderDbUpdate {
    return {
      id: model.id,
      teamId: model.team.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(model: ITeamLeaderCreate): TeamLeaderDbInsert {
    return {
      teamId: model.team.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: TeamLeaderFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<TeamLeaderFieldMapKeys, TableWithID | null> = {
      id: TeamLeader,
      teamId: TeamLeader,
      studentId: TeamLeader,
      startTerm: TeamLeader,
      endTerm: TeamLeader,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: TeamLeaderFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(TeamLeader.startTerm, value),
        gt(TeamLeader.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
