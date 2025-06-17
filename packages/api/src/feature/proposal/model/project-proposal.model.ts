import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IProjectProposal } from "@sparcs-students/interface/api/proposal/index";

export interface IProjectProposalCreate extends IProjectProposal {
  organization: IProjectProposal["organization"];

  semester: IProjectProposal["semester"];
}

export class MProjectProposal extends MEntity implements IProjectProposal {
  static modelName = "ProjectProposal";

  organization: IProjectProposal["organization"];

  semester: IProjectProposal["semester"];

  constructor(data: IProjectProposal) {
    super();
    Object.assign(this, data);
  }
}
