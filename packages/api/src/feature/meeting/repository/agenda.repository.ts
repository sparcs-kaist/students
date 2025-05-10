import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import {
  AgendaStatusEnum,
  AgendaTypeEnum,
} from "@sparcs-students/interface/api/meeting/type/agenda.type";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { Agenda } from "src/drizzle/schema";

import { IAgendaCreate, MAgenda } from "../model/agenda.model";

export type AgendaQuery = {
  name: string;
  meetingId: number;
  agendaStatusEnum: AgendaStatusEnum;
  agendaTypeEnum: AgendaTypeEnum;
};

type AgendaOrderByKeys = "id" | "agendaStatusEnum" | "agendaTypeEnum";
type AgendaQuerySupport = EmptyObject;

type AgendaTable = typeof Agenda;
type AgendaDbSelect = InferSelectModel<AgendaTable>;
type AgendaDbUpdate = Partial<AgendaDbSelect>;
type AgendaDbInsert = InferInsertModel<AgendaTable>;
type AgendaFieldMapKeys = BaseTableFieldMapKeys<
  AgendaQuery,
  AgendaOrderByKeys,
  AgendaQuerySupport
>;

@Injectable()
export class AgendaRepository extends BaseSingleTableRepository<
  MAgenda,
  IAgendaCreate,
  AgendaTable,
  AgendaQuery,
  AgendaOrderByKeys,
  AgendaQuerySupport
> {
  constructor() {
    super(Agenda, MAgenda);
  }

  protected dbToModelMapping(result: AgendaDbSelect): MAgenda {
    return new MAgenda({
      id: result.id,
      meeting: { id: result.meetingId },
      agendaTypeEnum: result.agendaTypeEnum,
      name: result.name,
      detail: result.detail,
      agendaStatusEnum: result.agendaStatusEnum,
      submittedAt: result.submittedAt,
    });
  }

  protected modelToDBMapping(model: MAgenda): AgendaDbUpdate {
    return {
      id: model.id,
      meetingId: model.meeting.id,
      name: model.name,
      detail: model.detail,
      agendaTypeEnum: model.agendaTypeEnum,
      agendaStatusEnum: model.agendaStatusEnum,
      submittedAt: model.submittedAt,
    };
  }

  protected createToDBMapping(model: IAgendaCreate): AgendaDbInsert {
    return {
      meetingId: model.meeting.id,
      name: model.name,
      detail: model.detail,
      agendaTypeEnum: model.agendaTypeEnum,
      agendaStatusEnum: model.agendaStatusEnum,
    };
  }

  protected fieldMap(
    field: AgendaFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<AgendaFieldMapKeys, TableWithID | null> = {
      id: Agenda,
      meetingId: Agenda,
      agendaStatusEnum: Agenda,
      submittedAt: Agenda,
      name: Agenda,
      detail: Agenda,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
