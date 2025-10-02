import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IOperationProposalRevision } from "@sparcs-students/interface/api/proposal/type/operation-proposal.type";

export interface IOperationProposalRevisionCreate {
  operationProposal: IOperationProposalRevision["operationProposal"];
  organizationDiagramFile: IOperationProposalRevision["organizationDiagramFile"];
  note: IOperationProposalRevision["note"];
  operatingCommitteeOperation: IOperationProposalRevision["operatingCommitteeOperation"];
  teamOperation: IOperationProposalRevision["teamOperation"];
}

export class MOperationProposalRevision
  extends MRevisionEntity
  implements IOperationProposalRevision
{
  static modelName = "OperationProposalRevision";

  operationProposal: IOperationProposalRevision["operationProposal"];

  organizationDiagramFile: IOperationProposalRevision["organizationDiagramFile"];

  note: IOperationProposalRevision["note"];

  operatingCommitteeOperation: IOperationProposalRevision["operatingCommitteeOperation"];

  teamOperation: IOperationProposalRevision["teamOperation"];

  constructor(data: IOperationProposalRevision) {
    super();
    Object.assign(this, data);
  }
}
