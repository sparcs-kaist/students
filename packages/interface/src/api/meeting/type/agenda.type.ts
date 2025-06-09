import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";

import { zMeeting } from "./meeting.type";

export enum AgendaStatusEnum {
  Submitted = 1, // 제출
  Accepted = 2, // 승인
  Rejected = 3, // 반려
  ReviseNeeded = 4, // 수정 요청
  Progress = 5, // 진행중
}

export enum AgendaTypeEnum {
  Report = 1, // 보고
  // 심의
  // 인준
  // 논의
  // TODO: 나중에 추가 필요
}

// agenda: 안건 엔티티
export const zAgenda = z.object({
  id: zId,
  name: zName,
  meeting: zExtractId(zMeeting),
  detail: z.string(),
  agendaStatusEnum: z.nativeEnum(AgendaStatusEnum),
  agendaTypeEnum: z.nativeEnum(AgendaTypeEnum),
  submittedAt: z.date(),
});

export type IAgenda = z.infer<typeof zAgenda>;
