import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IProjectReportRevision } from "@sparcs-students/interface/api/report/type/project-report.type";

export interface IProjectReportRevisionCreate {
  projectReportId: IProjectReportRevision["projectReportId"];
  name: IProjectReportRevision["name"];
  method: IProjectReportRevision["method"];
  prepareDuration: IProjectReportRevision["prepareDuration"];
  duration: IProjectReportRevision["duration"];

  timelines: IProjectReportRevision["timelines"];

  teamId: IProjectReportRevision["teamId"];

  managerId: IProjectReportRevision["managerId"];

  participation: IProjectReportRevision["participation"];

  result: IProjectReportRevision["result"];

  unmet: IProjectReportRevision["unmet"];

  detail: IProjectReportRevision["detail"];

  note: IProjectReportRevision["note"];
}

export class MProjectReportRevision
  extends MRevisionEntity
  implements IProjectReportRevision
{
  static modelName = "ProjectProposalRevision";

  projectReportId: IProjectReportRevision["projectReportId"];

  name: IProjectReportRevision["name"];

  method: IProjectReportRevision["method"];

  prepareDuration: IProjectReportRevision["prepareDuration"];

  duration: IProjectReportRevision["duration"];

  timelines: IProjectReportRevision["timelines"];

  teamId: IProjectReportRevision["teamId"];

  managerId: IProjectReportRevision["managerId"];

  participation: IProjectReportRevision["participation"];

  result: IProjectReportRevision["result"];

  unmet: IProjectReportRevision["unmet"];

  detail: IProjectReportRevision["detail"];

  note: IProjectReportRevision["note"];

  constructor(data: IProjectReportRevision) {
    super();
    Object.assign(this, data);
  }
}
