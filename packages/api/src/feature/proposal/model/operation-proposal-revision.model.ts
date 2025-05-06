import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IOperationProposalRevision } from "@sparcs-students/interface/api/proposal/type/operation-proposal.type";

export interface IOperationProposalRevisionCreate {
  operationProposal: IOperationProposalRevision["operationProposal"];
  organizationDiagramFile: IOperationProposalRevision["organizationDiagramFile"];
  note: IOperationProposalRevision["note"];
  documentStatusEnum: IOperationProposalRevision["documentStatusEnum"];
}

export class MOperationProposalRevision
  extends MRevisionEntity
  implements IOperationProposalRevision
{
  static modelName = "OperationProposalRevision";

  operationProposal: IOperationProposalRevision["operationProposal"];

  organizationDiagramFile: IOperationProposalRevision["organizationDiagramFile"];

  note: IOperationProposalRevision["note"];

  constructor(data: IOperationProposalRevisionCreate) {
    super();
    Object.assign(this, data);
  }
}
