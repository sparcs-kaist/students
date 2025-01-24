import {
  HalfYearEnum,
  SemesterEnum,
} from "@sparcs-students/interface/common/enum";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";

export const zSemester = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(),
  semesterEnum: z.nativeEnum(SemesterEnum),
  duration: zDuration,
});

export type ISemester = z.infer<typeof zSemester>;

export const zHalfYear = z.object({
  id: z.string(),
  name: z.string(), // ex) 2024년 상반기
  year: z.number(),
  halfYearEnum: z.nativeEnum(HalfYearEnum),
  regularSemester: zSemester,
  seasonalSemester: zSemester,
});

export type IHalfYear = z.infer<typeof zHalfYear>;
