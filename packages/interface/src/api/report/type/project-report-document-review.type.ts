import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zProjectReportRevision } from "@sparcs-students/interface/api/report/type/project-report.type";

export const zProjectReportDocumentReview = z.object({
  id: zId,
  projectReportRevision: zExtractId(zProjectReportRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export type IProjectReportDocumentReview = z.infer<
  typeof zProjectReportDocumentReview
>;
