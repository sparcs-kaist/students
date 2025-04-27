import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";

export enum MeetingTypeEnum {
  CentralOperativeCommittee = 1, // 중앙운영위원회
  GeneralStudentRepresentativeConference = 2, // 전체학생대표자회의
}

// meeting: 회의 엔티티
export const zMeeting = z.object({
  id: zId,
  duration: zDuration,
  name: zName,
  detail: z.string(),
  startTerm: z.date().nullable(),
  endTerm: z.date().nullable(),
  // TODO: 참석자라던지... 안건지라던지... 추가적인 것들
});

export type IMeeting = z.infer<typeof zMeeting>;
