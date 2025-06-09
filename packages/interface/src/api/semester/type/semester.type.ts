import { zSemesterName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export enum SemesterEnum {
  H1 = 1,
  H2 = 2,
}

// gb: 그냥 상하반기만 씁시다! 어우 머리아파
export const zSemester = z
  .object({
    id: zId.openapi({
      description: "학기 ID",
    }),
    name: zSemesterName.openapi({
      description: "학기 이름",
    }),
    year: z.coerce.number().openapi({
      description: "학기 연도",
    }),
    semesterEnum: z.nativeEnum(SemesterEnum).openapi({
      description: "학기 종류",
    }),
    startTerm: z.date().openapi({
      description: "학기 시작일",
    }),
    endTerm: z.date().openapi({
      description: "학기 종료일",
    }),
  })
  .openapi("Semester");

export type ISemester = z.infer<typeof zSemester>;
