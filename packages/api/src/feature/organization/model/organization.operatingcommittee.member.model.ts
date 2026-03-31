import { IOperatingCommitteeMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOperatingCommitteeMemberCreate {
  operatingCommittee: IOperatingCommitteeMember["operatingCommittee"];

  student: IOperatingCommitteeMember["student"];

  title: IOperatingCommitteeMember["title"];

  legalBasis: IOperatingCommitteeMember["legalBasis"];

  duration: IOperatingCommitteeMember["duration"];
}

export class MOperatingCommitteeMember
  extends MEntity
  implements IOperatingCommitteeMember
{
  static modelName = "OperatingCommittee";

  operatingCommittee: IOperatingCommitteeMember["operatingCommittee"];

  student: IOperatingCommitteeMember["student"];

  title: IOperatingCommitteeMember["title"];

  legalBasis: IOperatingCommitteeMember["legalBasis"];

  duration: IOperatingCommitteeMember["duration"];

  constructor(data: IOperatingCommitteeMember) {
    super();
    Object.assign(this, data);
  }
}
