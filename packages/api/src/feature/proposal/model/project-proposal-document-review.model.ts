import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectProposalDocumentReview } from "@sparcs-students/interface/api/proposal/index";

export interface IProjectProposalDocumentReviewCreate {
  projectProposalRevision: IProjectProposalDocumentReview["projectProposalRevision"];

  student: IProjectProposalDocumentReview["student"];

  documentReviewStatusEnum: IProjectProposalDocumentReview["documentReviewStatusEnum"];

  detail?: IProjectProposalDocumentReview["detail"];
}

export class MProjectProposalDocumentReview
  extends MEntity
  implements IProjectProposalDocumentReview
{
  static modelName = "ProjectProposalDocumentReview";

  projectProposalRevision: IProjectProposalDocumentReview["projectProposalRevision"];

  student: IProjectProposalDocumentReview["student"];

  documentReviewStatusEnum: IProjectProposalDocumentReview["documentReviewStatusEnum"];

  detail?: IProjectProposalDocumentReview["detail"];

  constructor(data: IProjectProposalDocumentReview) {
    super();
    Object.assign(this, data);
  }
}
