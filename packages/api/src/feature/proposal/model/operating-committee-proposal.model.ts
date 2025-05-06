import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IOperatingCommitteeProposal } from "@sparcs-students/interface/api/proposal/type/operating-committee-proposal.type";

export interface IOperatingCommitteeProposalCreate
  extends IOperatingCommitteeProposal {
  organizationId: number;
  semesterId: number;
  operatingCommitteeId: number;
}

export class MOperatingCommitteeProposal
  extends MEntity
  implements IOperatingCommitteeProposal
{
  static modelName = "OperatingCommitteeProposal";

  organization: IOperatingCommitteeProposal["organization"];

  semester: IOperatingCommitteeProposal["semester"];

  operatingCommittee: IOperatingCommitteeProposal["operatingCommittee"];

  constructor(data: IOperatingCommitteeProposalCreate) {
    super();
    Object.assign(this, data);
  }
}
