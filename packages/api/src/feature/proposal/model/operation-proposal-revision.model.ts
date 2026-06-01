import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IOperationProposalRevision } from "@sparcs-students/interface/api/proposal/type/operation-proposal.type";

export interface IOperationProposalRevisionCreate {
  operationProposal: IOperationProposalRevision["operationProposal"];

  organizationDiagram: IOperationProposalRevision["organizationDiagram"];

  note: IOperationProposalRevision["note"];
}

export class MOperationProposalRevision
  extends MRevisionEntity
  implements IOperationProposalRevision
{
  static modelName = "OperationProposalRevision";

  operationProposal: IOperationProposalRevision["operationProposal"];

  organizationDiagram: IOperationProposalRevision["organizationDiagram"];

  note: IOperationProposalRevision["note"];

  constructor(data: IOperationProposalRevision) {
    super();
    Object.assign(this, data);
  }
}
