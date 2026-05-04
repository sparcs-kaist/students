import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectReport } from "@sparcs-students/interface/api/report/index";

export interface IProjectReportCreate extends IProjectReport {
  organization: IProjectReport["organization"];

  semester: IProjectReport["semester"];
}

export class MProjectReport extends MEntity implements IProjectReport {
  static modelName = "ProjectReport";

  organization: IProjectReport["organization"];

  semester: IProjectReport["semester"];

  constructor(data: IProjectReport) {
    super();
    Object.assign(this, data);
  }
}
