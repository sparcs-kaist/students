import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IProjectProposalTimeline } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

export interface IProjectProposalTimelineCreate {
  projectProposalRevision: IProjectProposalTimeline["projectProposalRevision"];

  startTerm: IProjectProposalTimeline["startTerm"];

  endTerm: IProjectProposalTimeline["endTerm"];

  detail: IProjectProposalTimeline["detail"];

  note: IProjectProposalTimeline["note"];
}

export class MProjectProposalTimeline
  extends MRevisionEntity
  implements IProjectProposalTimeline
{
  static modelName = "ProjectProposalTimeline";

  projectProposalRevision: IProjectProposalTimeline["projectProposalRevision"];

  startTerm: IProjectProposalTimeline["startTerm"];

  endTerm: IProjectProposalTimeline["endTerm"];

  detail: IProjectProposalTimeline["detail"];

  note: IProjectProposalTimeline["note"];

  constructor(data: IProjectProposalTimeline) {
    super();
    Object.assign(this, data);
  }
}
