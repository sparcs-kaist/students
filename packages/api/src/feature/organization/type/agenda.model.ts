import { IAgenda } from "@sparcs-students/interface/api/organization/type/meeting.type";
import { InferSelectModel } from "drizzle-orm";

import { Agenda } from "@sparcs-students/api/drizzle/schema/meeting.schema";

export type AgendaDBResult = InferSelectModel<typeof Agenda>;

export class MAgenda implements IAgenda {
  id: IAgenda["id"];

  meeting: IAgenda["meeting"];

  accepted: IAgenda["accepted"];

  constructor(data: IAgenda) {
    Object.assign(this, data);
  }

  static fromDBResult(result: AgendaDBResult) {
    return new MAgenda({
      id: result.id,
      meeting: {
        id: result.meetingId,
      },
      accepted: result.accepted,
    });
  }
}
