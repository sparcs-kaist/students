import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zProjectReportRevision } from "./project-report.type";

export const zProjectReportTimeline = z.object({
  id: zId,
  projectReportRevision: z.lazy(() => zExtractId(zProjectReportRevision)),
  duration: zDuration,
  detail: z.string(),
  note: z.string().optional(),
});

export type IProjectReportTimeline = z.infer<typeof zProjectReportTimeline>;

export const zProjectReportTimelineRequestCreate = zProjectReportTimeline.omit({
  id: true,
});

export const zProjectReportTimelineRequestUpdate = zProjectReportTimeline;

export const zProjectReportTimelineRequestDelete = zProjectReportTimeline.pick({
  id: true,
});
export const zProjectReportTimelineResponse = zProjectReportTimeline.pick({
  id: true,
});

export type IProjectReportTimelineRequestCreate = z.infer<
  typeof zProjectReportTimelineRequestCreate
>;
export type IProjectReportTimelineRequestUpdate = z.infer<
  typeof zProjectReportTimelineRequestUpdate
>;
export type IProjectReportTimelineRequestDelete = z.infer<
  typeof zProjectReportTimelineRequestDelete
>;
export type IProjectReportTimelineResponse = z.infer<
  typeof zProjectReportTimelineResponse
>;
