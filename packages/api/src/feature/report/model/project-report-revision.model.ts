import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IProjectReportRevision } from "@sparcs-students/interface/api/report/type/project-report.type";

export interface IProjectReportRevisionCreate {
  projectReport: IProjectReportRevision["projectReport"];
  name: IProjectReportRevision["name"];
  method: IProjectReportRevision["method"];
  prepareDuration: IProjectReportRevision["prepareDuration"];
  duration: IProjectReportRevision["duration"];

  timelines: IProjectReportRevision["timelines"];

  team: IProjectReportRevision["team"];

  manager: IProjectReportRevision["manager"];

  purpose: IProjectReportRevision["purpose"];

  target: IProjectReportRevision["target"];

  detail: IProjectReportRevision["detail"];

  note: IProjectReportRevision["note"];
}

export class MProjectReportRevision
  extends MRevisionEntity
  implements IProjectReportRevision
{
  static modelName = "ProjectReportRevision";

  projectReport: IProjectReportRevision["projectReport"];

  name: IProjectReportRevision["name"];

  method: IProjectReportRevision["method"];

  prepareDuration: IProjectReportRevision["prepareDuration"];

  duration: IProjectReportRevision["duration"];

  timelines: IProjectReportRevision["timelines"];

  team: IProjectReportRevision["team"];

  manager: IProjectReportRevision["manager"];

  purpose: IProjectReportRevision["purpose"];

  target: IProjectReportRevision["target"];

  detail: IProjectReportRevision["detail"];

  note: IProjectReportRevision["note"];

  constructor(data: IProjectReportRevision) {
    super();
    Object.assign(this, data);
  }
}
