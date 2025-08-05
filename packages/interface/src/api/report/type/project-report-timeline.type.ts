import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zProjectReportRevision } from "./project-report.type";

export const zProjectReportTimeline = z.object({
  id: zId,
  projectReportRevision: zExtractId(zProjectReportRevision),
  duration: zDuration,
  detail: z.string(),
  note: z.string().optional(),
});

export type IProjectReportTimeline = z.infer<typeof zProjectReportTimeline>;
