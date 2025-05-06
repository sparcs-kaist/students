import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import {
  zOperatingCommittee,
  zOrganization,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { z } from "zod";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperatingCommitteeReport = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  operatingCommittee: zExtractId(zOperatingCommittee), // TODO: 운위 ㅏㄷㄴ위인지 기구 단위인지에 따라 확정 후 이 주석 삭제
  semester: zExtractId(zSemester),
});

export type IOperatingCommitteeReport = z.infer<
  typeof zOperatingCommitteeReport
>;

export const zOperatingCommitteeReportRevision = z
  .object({
    id: zId,
    operatingCommitteeReport: zExtractId(zOperatingCommitteeReport),
    detail: z.string(),
  })
  .merge(zRevisionBase);

export type IOperatingCommitteeReportRevision = z.infer<
  typeof zOperatingCommitteeReportRevision
>;
