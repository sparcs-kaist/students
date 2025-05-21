import { zSemesterName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";

export enum SemesterEnum {
  H1 = 1,
  H2 = 2,
}

// gb: 그냥 상하반기만 씁시다! 어우 머리아파
export const zSemester = z.object({
  id: zId,
  name: zSemesterName,
  year: z.coerce.number(),
  semesterEnum: z.nativeEnum(SemesterEnum),
  startTerm: z.date(),
  endTerm: z.date(),
});

export type ISemester = z.infer<typeof zSemester>;
