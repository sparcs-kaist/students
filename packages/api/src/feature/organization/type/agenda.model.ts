import {
  AgendaStatusEnum,
  IAgenda,
} from "@sparcs-students/interface/api/meeting/type/agenda.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IAgendaCreate {
  name: string;
  detail: string;
  agendaStatusEnum: AgendaStatusEnum;
  meetingId: number;
  submittedAt: Date;
}

export class MAgenda extends MEntity implements IAgenda {
  static modelName = "Agenda";

  name: IAgenda["name"];

  detail: IAgenda["detail"];

  agendaStatusEnum: IAgenda["agendaStatusEnum"];

  meeting: IAgenda["meeting"];

  submittedAt: IAgenda["submittedAt"];

  constructor(data: IAgenda) {
    super();
    Object.assign(this, data);
  }
}
