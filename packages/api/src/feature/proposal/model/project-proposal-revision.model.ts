import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IProjectProposalRevision } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

export interface IProjectProposalRevisionCreate {
  projectProposal: IProjectProposalRevision["projectProposal"];

  name: IProjectProposalRevision["name"];

  method: IProjectProposalRevision["method"];

  prepareStartTerm: IProjectProposalRevision["prepareStartTerm"];
  prepareEndTerm: IProjectProposalRevision["prepareEndTerm"];

  startTerm: IProjectProposalRevision["startTerm"];
  endTerm: IProjectProposalRevision["endTerm"];

  team: IProjectProposalRevision["team"];

  manager: IProjectProposalRevision["manager"];

  purpose: IProjectProposalRevision["purpose"];

  target: IProjectProposalRevision["target"];

  detail: IProjectProposalRevision["detail"];

  note: IProjectProposalRevision["note"];

  code: IProjectProposalRevision["code"];
}

export class MProjectProposalRevision
  extends MRevisionEntity
  implements IProjectProposalRevision
{
  static modelName = "ProjectProposalRevision";

  projectProposal: IProjectProposalRevision["projectProposal"];

  name: IProjectProposalRevision["name"];

  method: IProjectProposalRevision["method"];

  prepareStartTerm: IProjectProposalRevision["prepareStartTerm"];

  prepareEndTerm: IProjectProposalRevision["prepareEndTerm"];

  startTerm: IProjectProposalRevision["startTerm"];

  endTerm: IProjectProposalRevision["endTerm"];

  team: IProjectProposalRevision["team"];

  manager: IProjectProposalRevision["manager"];

  purpose: IProjectProposalRevision["purpose"];

  target: IProjectProposalRevision["target"];

  detail: IProjectProposalRevision["detail"];

  note: IProjectProposalRevision["note"];

  code: IProjectProposalRevision["code"];

  constructor(data: IProjectProposalRevision) {
    super();
    Object.assign(this, data);
  }
}
