import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

export enum MeetingTypeEnum {
  CentralOperativeCommittee = 1, // 중앙운영위원회
  GeneralStudentRepresentativeConference = 2, // 전체학생대표자회의
}

// meeting: 회의 엔티티
export const zMeeting = z.object({
  id: zId,
  semester: zExtractId(zSemester), // TODO: 단위가 연도 / 학기 / 반기 인지 확인 필요
  meetingTypeEnum: z.nativeEnum(MeetingTypeEnum),
  name: zName,
  detail: z.string(),
  startTerm: z.date().nullable(),
  endTerm: z.date().nullable(),
  // TODO: 참석자라던지... 안건지라던지... 추가적인 것들
});

export type IMeeting = z.infer<typeof zMeeting>;
