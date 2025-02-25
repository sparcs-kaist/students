import {
  HalfYearEnum,
  SemesterEnum,
} from "@sparcs-students/interface/common/enum";
import { zSemesterName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDurationFull } from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";

export const zSemester = z.object({
  id: zId,
  name: zSemesterName,
  year: z.coerce.number(),
  semesterEnum: z.nativeEnum(SemesterEnum),
  duration: zDurationFull,
});

export type ISemester = z.infer<typeof zSemester>;

export const zHalfYear = z.object({
  id: zId,
  name: zSemesterName, // ex) 2024년 상반기
  year: z.coerce.number(),
  halfYearEnum: z.nativeEnum(HalfYearEnum),
  regularSemester: zSemester, // pick 예외: duration 완성을 위해 semester 값을 받아와야 함
  seasonalSemester: zSemester, // pick 예외: duration 완성을 위해 semester 값을 받아와야 함
  duration: zDurationFull,
});

export const zHalfYearSummary = zHalfYear.pick({
  id: true,
  name: true,
  year: true,
  halfYearEnum: true,
});

export type IHalfYear = z.infer<typeof zHalfYear>;
export type IHalfYearSummary = z.infer<typeof zHalfYearSummary>;
