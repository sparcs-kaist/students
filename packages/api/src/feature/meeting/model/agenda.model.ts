import { IAgenda } from "@sparcs-students/interface/api/meeting/type/agenda.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IAgendaCreate {
  name: IAgenda["name"];
  detail: IAgenda["detail"];
  agendaStatusEnum: IAgenda["agendaStatusEnum"];
  agendaTypeEnum: IAgenda["agendaTypeEnum"];
  meeting: IAgenda["meeting"];
}

export class MAgenda extends MEntity implements IAgenda {
  static modelName = "Agenda";

  name: IAgenda["name"];

  detail: IAgenda["detail"];

  agendaStatusEnum: IAgenda["agendaStatusEnum"];

  agendaTypeEnum: IAgenda["agendaTypeEnum"];

  meeting: IAgenda["meeting"];

  submittedAt: IAgenda["submittedAt"];

  constructor(data: IAgenda) {
    super();
    Object.assign(this, data);
  }
}
