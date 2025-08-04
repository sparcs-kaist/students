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
import { TeamMember } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  ITeamMemberCreate,
  MTeamMember,
} from "../model/organization.team.member.model";

type TeamMemberQuery = {
  teamId: number;
  studentId: number;
  date: Date;
};

type TeamMemberOrderByKeys =
  | "id"
  | "teamId"
  | "studentId"
  | "startTerm"
  | "endTerm";
type TeamMemberQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type TeamMemberTable = typeof TeamMember;
type TeamMemberDbSelect = InferSelectModel<TeamMemberTable>;
type TeamMemberDbUpdate = Partial<TeamMemberDbSelect>;
type TeamMemberDbInsert = InferInsertModel<TeamMemberTable>;

type TeamMemberFieldMapKeys = BaseTableFieldMapKeys<
  TeamMemberQuery,
  TeamMemberOrderByKeys,
  TeamMemberQuerySupport
>;

@Injectable()
export class TeamMemberRepository extends BaseSingleTableRepository<
  MTeamMember,
  ITeamMemberCreate,
  TeamMemberTable,
  TeamMemberQuery,
  TeamMemberOrderByKeys,
  TeamMemberQuerySupport
> {
  constructor() {
    super(TeamMember, MTeamMember);
  }

  protected dbToModelMapping(result: TeamMemberDbSelect): MTeamMember {
    return new MTeamMember({
      id: result.id,
      team: { id: result.teamId },
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm ?? undefined,
      },
    });
  }

  protected modelToDBMapping(model: MTeamMember): TeamMemberDbUpdate {
    return {
      id: model.id,
      teamId: model.team.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected createToDBMapping(model: ITeamMemberCreate): TeamMemberDbInsert {
    return {
      teamId: model.team.id,
      studentId: model.student.id,
      startTerm: model.duration.startTerm,
      endTerm: model.duration.endTerm,
    };
  }

  protected fieldMap(
    field: TeamMemberFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<TeamMemberFieldMapKeys, TableWithID | null> = {
      id: TeamMember,
      teamId: TeamMember,
      studentId: TeamMember,
      startTerm: TeamMember,
      endTerm: TeamMember,
      date: null,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }

  protected processSpecialCondition(
    key: TeamMemberFieldMapKeys,
    value: PrimitiveConditionValue,
  ): SQL {
    if (key === "date" && value instanceof Date) {
      // console.log(`semester date: ${value}`);
      return and(
        lte(TeamMember.startTerm, value),
        gt(TeamMember.endTerm, value),
      );
    }

    throw new Error(`Invalid key: ${String(key)}`);
  }
}
