import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";

import { zMeeting } from "./meeting.type";

export enum AgendaStatusEnum {
  Submitted = 1,
  Accepted = 2,
  Rejected = 3,
  Progress = 4,
}

// agenda: 안건 엔티티
export const zAgenda = z.object({
  id: zId,
  name: zName,
  meeting: zExtractId(zMeeting),
  detail: z.string(),
  agendaStatusEnum: z.nativeEnum(AgendaStatusEnum),
  submittedAt: z.date(),
});

export type IAgenda = z.infer<typeof zAgenda>;
