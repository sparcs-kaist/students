import { IPetitionAnswer } from "@sparcs-students/interface/api/petition/type/petition.type";
import { InferSelectModel } from "drizzle-orm";
import { PetitionAnswer } from "@sparcs-students/api/drizzle/schema/petition.schema";

export type PetitionAnswerDBResult = InferSelectModel<typeof PetitionAnswer>;

export class MPetitionAnswer implements IPetitionAnswer {
  id: IPetitionAnswer["id"];

  petition: IPetitionAnswer["petition"];

  user: IPetitionAnswer["user"];

  team: IPetitionAnswer["team"];

  posted: IPetitionAnswer["posted"];

  constructor(data: IPetitionAnswer) {
    Object.assign(this, data);
  }

  static fromDBResult(result: PetitionAnswerDBResult) {
    return new MPetitionAnswer({
      ...result,
      petition: { id: result.petitionId },
      user: { id: result.userId },
      team: { id: result.teamId },
    });
  }
}
