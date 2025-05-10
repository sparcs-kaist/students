import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IOperationProposal } from "@sparcs-students/interface/api/proposal/type/operation-proposal.type";

export interface IOperationProposalCreate extends IOperationProposal {
  organization: IOperationProposal["organization"];

  semester: IOperationProposal["semester"];
}

export class MOperationProposal extends MEntity implements IOperationProposal {
  static modelName = "OperationProposal";

  organization: IOperationProposal["organization"];

  semester: IOperationProposal["semester"];

  constructor(data: IOperationProposal) {
    super();
    Object.assign(this, data);
  }
}
