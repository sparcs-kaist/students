import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectProposal } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

export interface IProjectProposalCreate extends IProjectProposal {
  organizationId: number;
  semesterId: number;
}

export class MProjectProposal extends MEntity implements IProjectProposal {
  static modelName = "ProjectProposal";

  organization: IProjectProposal["organization"];

  semester: IProjectProposal["semester"];

  constructor(data: IProjectProposalCreate) {
    super();
    Object.assign(this, data);
  }
}
