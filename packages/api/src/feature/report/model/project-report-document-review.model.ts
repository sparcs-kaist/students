import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectReportDocumentReview } from "@sparcs-students/interface/api/report/index";

export interface IProjectReportDocumentReviewCreate {
  projectReportRevision: IProjectReportDocumentReview["projectReportRevision"];

  student: IProjectReportDocumentReview["student"];

  documentReviewStatusEnum: IProjectReportDocumentReview["documentReviewStatusEnum"];

  detail?: IProjectReportDocumentReview["detail"];
}

export class MProjectReportDocumentReview
  extends MEntity
  implements IProjectReportDocumentReview
{
  static modelName = "ProjectReportDocumentReview";

  projectReportRevision: IProjectReportDocumentReview["projectReportRevision"];

  student: IProjectReportDocumentReview["student"];

  documentReviewStatusEnum: IProjectReportDocumentReview["documentReviewStatusEnum"];

  detail?: IProjectReportDocumentReview["detail"];

  constructor(data: IProjectReportDocumentReview) {
    super();
    Object.assign(this, data);
  }
}
