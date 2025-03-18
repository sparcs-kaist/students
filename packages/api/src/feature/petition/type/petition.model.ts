import { IPetition } from "@sparcs-students/interface/api/petition/type/petition.type";
import { InferSelectModel } from "drizzle-orm";
import { Petition } from "@sparcs-students/api/drizzle/schema/petition.schema";
import { PetitionStatusEnum } from "@sparcs-students/interface/common/enum/petition.enum";

export type PetitionDBResult = InferSelectModel<typeof Petition>;

export class MPetition implements IPetition {
  id: IPetition["id"];

  title: IPetition["title"];

  user: IPetition["user"];

  detail: IPetition["detail"];

  duration: IPetition["duration"];

  petitionStatusEnumId: IPetition["petitionStatusEnumId"];

  constructor(data: IPetition) {
    Object.assign(this, data);
  }

  static fromDBResult(result: PetitionDBResult) {
    return new MPetition({
      ...result,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      user: { id: result.user_id },
      petitionStatusEnumId: result.petitionStatusEnumId as PetitionStatusEnum,
    });
  }
}
