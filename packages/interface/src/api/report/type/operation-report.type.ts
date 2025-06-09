import z from "zod";
import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { zFile } from "@sparcs-students/interface/api/file/type/file.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperationReport = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export type IOperationReport = z.infer<typeof zOperationReport>;

export const zOperationReportRevision = z
  .object({
    id: zId,
    operationReport: zExtractId(zOperationReport),
    organizationDiagramFile: zExtractId(zFile),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IOperationReportRevision = z.infer<typeof zOperationReportRevision>;
