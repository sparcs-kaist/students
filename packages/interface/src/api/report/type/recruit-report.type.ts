import { z } from "zod";
import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester";

export const zRecruit = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  startTerm: z.date(),
  endTerm: z.date(),
  note: z.string(),
});

// TODO: add Recruit related stuff

export type IRecruit = z.infer<typeof zRecruit>;
