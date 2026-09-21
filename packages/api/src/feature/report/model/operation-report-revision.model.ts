import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IOperationReportRevision } from "@sparcs-students/interface/api/report/type/operation-report.type";

export interface IOperationReportRevisionCreate {
  operationReport: IOperationReportRevision["operationReport"];
  organizationDiagramFile: IOperationReportRevision["organizationDiagramFile"];
  note: IOperationReportRevision["note"];
  operatingCommitteeOperation: IOperationReportRevision["operatingCommitteeOperation"];
  teamOperation: IOperationReportRevision["teamOperation"];
}

export class MOperationReportRevision
  extends MRevisionEntity
  implements IOperationReportRevision
{
  static modelName = "OperationReportRevision";

  operationReport: IOperationReportRevision["operationReport"];

  organizationDiagramFile: IOperationReportRevision["organizationDiagramFile"];

  note: IOperationReportRevision["note"];

  operatingCommitteeOperation: IOperationReportRevision["operatingCommitteeOperation"];

  teamOperation: IOperationReportRevision["teamOperation"];

  constructor(data: IOperationReportRevision) {
    super();
    Object.assign(this, data);
  }
}
