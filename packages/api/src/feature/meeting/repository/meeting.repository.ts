import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { MeetingTypeEnum } from "@sparcs-students/interface/api/meeting/type/meeting.type";
import { Meeting } from "src/drizzle/schema";

import { IMeetingCreate, MMeeting } from "../model/meeting.model";

export type MeetingQuery = {
  name: string;
  meetingTypeEnum: MeetingTypeEnum;
};

type MeetingOrderByKeys =
  | "id"
  | "semesterId"
  | "meetingTypeEnum"
  | "startTerm"
  | "endTerm";
type MeetingQuerySupport = {
  startTerm: string;
  endTerm: string;
};

type MeetingTable = typeof Meeting;
type MeetingDbSelect = InferSelectModel<MeetingTable>;
type MeetingDbUpdate = Partial<MeetingDbSelect>;
type MeetingDbInsert = InferInsertModel<MeetingTable>;
type MeetingFieldMapKeys = BaseTableFieldMapKeys<
  MeetingQuery,
  MeetingOrderByKeys,
  MeetingQuerySupport
>;

@Injectable()
export class MeetingRepository extends BaseSingleTableRepository<
  MMeeting,
  IMeetingCreate,
  MeetingTable,
  MeetingQuery,
  MeetingOrderByKeys,
  MeetingQuerySupport
> {
  constructor() {
    super(Meeting, MMeeting);
  }

  protected dbToModelMapping(result: MeetingDbSelect): MMeeting {
    return new MMeeting({
      id: result.id,
      semester: { id: result.semesterId },
      meetingTypeEnum: result.meetingTypeEnum,
      startTerm: result.startTerm,
      endTerm: result.endTerm,
      name: result.name,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(model: MMeeting): MeetingDbUpdate {
    return {
      id: model.id,
      semesterId: model.semester.id,
      meetingTypeEnum: model.meetingTypeEnum,
      startTerm: model.startTerm,
      endTerm: model.endTerm,
    };
  }

  protected createToDBMapping(model: IMeetingCreate): MeetingDbInsert {
    return {
      semesterId: model.semester.id,
      meetingTypeEnum: model.meetingTypeEnum,
      name: model.name,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: MeetingFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<MeetingFieldMapKeys, TableWithID | null> = {
      id: Meeting,
      semesterId: Meeting,
      meetingTypeEnum: Meeting,
      startTerm: Meeting,
      endTerm: Meeting,
      name: Meeting,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
