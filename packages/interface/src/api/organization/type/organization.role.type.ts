import { z } from "zod";

import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zOrganization } from "./organization.type";

export const zOrganizationRole = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  student: zExtractId(zStudent),
  roleName: z.string().trim().min(1).max(100),
  duration: zDuration,
});

export const zOrganizationRoleRequestCreate = zOrganizationRole.omit({
  id: true,
});

export const zOrganizationRoleRequestUpdate = zOrganizationRole.pick({
  roleName: true,
  duration: true,
});

export type IOrganizationRole = z.infer<typeof zOrganizationRole>;
export type IOrganizationRoleRequestCreate = z.infer<
  typeof zOrganizationRoleRequestCreate
>;
export type IOrganizationRoleRequestUpdate = z.infer<
  typeof zOrganizationRoleRequestUpdate
>;
