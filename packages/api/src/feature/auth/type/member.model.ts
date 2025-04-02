import { InferSelectModel } from "drizzle-orm";
import { User } from "@sparcs-students/api/drizzle/schema";
import { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
// import { MOrganization } from "@sparcs-students/api/feature/organization/type/organization.model";
import { IMember } from "@sparcs-students/interface/api/user/type/user.type";

export type UserDBResult = InferSelectModel<typeof User>;

export class MMember implements IMember {
  id: IMember["id"];

  organization: IMember["organization"];

  user: IMember["user"];

  studentNumber: IMember["studentNumber"];

  name: IMember["name"];

  duration: IMember["duration"];

  department: IMember["department"];

  constructor(data: IOrganization) {
    Object.assign(this, data);
  }

  // static fromDBResult(result: UserDBResult) {
  //   return new MOrganization({
  //     // ...result,
  //     // duration: {
  //     //   startTerm: result.startTerm,
  //     //   endTerm: result.endTerm,
  //     // },
  //     // organizationTypeEnum: result.organizationTypeEnum as OrganizationTypeEnum,
  //     // organizationStateEnum:
  //     //   result.organizationStateEnum as OrganizationStateEnum,
  //   });
  // }
}
