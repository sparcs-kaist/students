import { IPetitionAgree } from "@sparcs-students/interface/api/petition/type/petition.type";
import { InferSelectModel } from "drizzle-orm";
import { PetitionAgree } from "@sparcs-students/api/drizzle/schema/petition.schema";

export type PetitionAgreeDBResult = InferSelectModel<typeof PetitionAgree>;

export class MPetitionAgree implements IPetitionAgree {
  id: IPetitionAgree["id"];

  petition: IPetitionAgree["petition"];

  user: IPetitionAgree["user"];

  constructor(data: IPetitionAgree) {
    Object.assign(this, data);
  }

  static fromDBResult(result: PetitionAgreeDBResult) {
    return new MPetitionAgree({
      ...result,
      petition: { id: result.petitionId },
      user: { id: result.userId },
    });
  }
}
