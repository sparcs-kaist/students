import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IOperatingCommitteeProposalRevision } from "@sparcs-students/interface/api/proposal/type/operating-committee-proposal.type";

export interface IOperatingCommitteeProposalRevisionCreate {
  operatingCommitteeProposal: IOperatingCommitteeProposalRevision["operatingCommitteeProposal"];
  note: IOperatingCommitteeProposalRevision["note"];
  documentStatusEnum: IOperatingCommitteeProposalRevision["documentStatusEnum"];
}

export class MOperatingCommitteeProposalRevision
  extends MRevisionEntity
  implements IOperatingCommitteeProposalRevision
{
  static modelName = "OperatingCommitteeProposalRevision";

  operatingCommitteeProposal: IOperatingCommitteeProposalRevision["operatingCommitteeProposal"];

  note: IOperatingCommitteeProposalRevision["note"];

  constructor(data: IOperatingCommitteeProposalRevisionCreate) {
    super();
    Object.assign(this, data);
  }
}
