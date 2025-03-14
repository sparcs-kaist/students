import {
  extendZodWithOpenApi,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import {
  HalfYearEnum,
  SemesterEnum,
} from "@sparcs-students/interface/common/enum";
import { zSemesterName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDurationFull } from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";

extendZodWithOpenApi(z);

export const zSemester = z
  .object({
    id: zId.openapi({
      description: "Semester의 ID",
      example: 1,
    }),
    name: zSemesterName.openapi({
      description: "Semester의 이름",
      example: "2024년 상반기",
    }),
    year: z.coerce.number().openapi({
      description: "Semester의 연도",
      example: 2024,
    }),
    semesterEnum: z.nativeEnum(SemesterEnum).openapi({
      description: "Semester의 학기",
      examples: [
        SemesterEnum.Spring,
        SemesterEnum.Summer,
        SemesterEnum.Fall,
        SemesterEnum.Winter,
      ],
    }),
    duration: zDurationFull.openapi({
      description: "Semester의 기간",
      example: {
        startTerm: "2025-02-24",
        endTerm: "2025-08-31",
      },
    }),
  })
  .openapi("Semester");

export type ISemester = z.infer<typeof zSemester>;

export const zHalfYear = z
  .object({
    id: zId.openapi({
      description: "HalfYear의 ID",
      example: 1,
    }),
    name: zSemesterName.openapi({
      description: "HalfYear의 이름",
      example: "2024년 상반기",
    }),
    year: z.coerce.number().openapi({
      description: "해당 반기의 연도",
      example: 2024,
    }),
    halfYearEnum: z.nativeEnum(HalfYearEnum).openapi({
      description: "상반기인지 하반기인지",
      examples: [HalfYearEnum.First, HalfYearEnum.Second],
    }),
    regularSemester: zSemester, // pick 예외: duration 완성을 위해 semester 값을 받아와야 함
    seasonalSemester: zSemester, // pick 예외: duration 완성을 위해 semester 값을 받아와야 함
    duration: zDurationFull,
  })
  .openapi("HalfYear");

export const zHalfYearSummary = zHalfYear.pick({
  id: true,
  name: true,
  year: true,
  halfYearEnum: true,
});

export type IHalfYear = z.infer<typeof zHalfYear>;
export type IHalfYearSummary = z.infer<typeof zHalfYearSummary>;

const generator = new OpenApiGeneratorV31([zHalfYear]);
generator.generateComponents();
