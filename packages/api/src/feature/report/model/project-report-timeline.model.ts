import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectReportTimeline } from "@sparcs-students/interface/api/report/type/project-report-timeline.type";

export interface IProjectReportTimelineCreate extends IProjectReportTimeline {
  projectReportRevision: IProjectReportTimeline["projectReportRevision"];

  duration: IProjectReportTimeline["duration"];

  detail: IProjectReportTimeline["detail"];

  note: IProjectReportTimeline["note"];
}

export class MProjectReportTimeline
  extends MEntity
  implements IProjectReportTimeline
{
  static modelName = "ProjectReportTimeline";

  projectReportRevision: IProjectReportTimeline["projectReportRevision"];

  duration: IProjectReportTimeline["duration"];

  detail: IProjectReportTimeline["detail"];

  note: IProjectReportTimeline["note"];

  constructor(data: IProjectReportTimeline) {
    super();
    Object.assign(this, data);
  }
}
