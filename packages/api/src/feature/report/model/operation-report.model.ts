import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IOperationReport } from "@sparcs-students/interface/api/report/type/operation-report.type";

export interface IOperationReportCreate extends IOperationReport {
  organization: IOperationReport["organization"];

  semester: IOperationReport["semester"];

  organizationDiagram: IOperationReport["organizationDiagram"];

  note: IOperationReport["note"];
}

export class MOperationReport extends MEntity implements IOperationReport {
  static modelName = "OperationReport";

  organization: IOperationReport["organization"];

  semester: IOperationReport["semester"];

  organizationDiagram: IOperationReport["organizationDiagram"];

  note: IOperationReport["note"];

  constructor(data: IOperationReport) {
    super();
    Object.assign(this, data);
  }
}
