import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IProjectProposalRevision } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

export interface IProjectProposalRevisionCreate {
  projectProposal: IProjectProposalRevision["projectProposal"];
  name: IProjectProposalRevision["name"];
  method: IProjectProposalRevision["method"];
  prepareDuration: IProjectProposalRevision["prepareDuration"];
  duration: IProjectProposalRevision["duration"];

  timelines: IProjectProposalRevision["timelines"];

  team: IProjectProposalRevision["team"];

  manager: IProjectProposalRevision["manager"];

  purpose: IProjectProposalRevision["purpose"];

  target: IProjectProposalRevision["target"];

  detail: IProjectProposalRevision["detail"];

  note: IProjectProposalRevision["note"];

  // documentStatusEnum: IProjectProposalRevision["documentStatusEnum"];
}

export class MProjectProposalRevision
  extends MRevisionEntity
  implements IProjectProposalRevision
{
  static modelName = "ProjectProposalRevision";

  projectProposal: IProjectProposalRevision["projectProposal"];

  name: IProjectProposalRevision["name"];

  method: IProjectProposalRevision["method"];

  prepareDuration: IProjectProposalRevision["prepareDuration"];

  duration: IProjectProposalRevision["duration"];

  timelines: IProjectProposalRevision["timelines"];

  team: IProjectProposalRevision["team"];

  manager: IProjectProposalRevision["manager"];

  purpose: IProjectProposalRevision["purpose"];

  target: IProjectProposalRevision["target"];

  detail: IProjectProposalRevision["detail"];

  note: IProjectProposalRevision["note"];

  constructor(data: IProjectProposalRevision) {
    super();
    Object.assign(this, data);
  }
}
