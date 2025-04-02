import { PetitionStatusEnum } from "@sparcs-students/interface/common/enum/petition.enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zUser } from "@sparcs-students/interface/api/user/type/user.type";
import { zTeam } from "@sparcs-students/interface/api/organization/type/organization.type";

import {
  zDuration,
  zDurationCreate,
} from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";

export const zPetition = z.object({
  id: zId,
  title: z.string().max(255),
  user: zUser.pick({ id: true }),
  detail: z.string(),
  duration: zDuration,
  petitionStatusEnumId: z.nativeEnum(PetitionStatusEnum),
});

export const zPetitonRequestCreate = zPetition
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zPetitonRequestUpdate = zPetition;

export type IPetition = z.infer<typeof zPetition>;
export type IPetitionRequestCreate = z.infer<typeof zPetitonRequestCreate>;
export type IPetitionRequestUpdate = z.infer<typeof zPetitonRequestUpdate>;

export const zPetitionAgree = z.object({
  id: zId,
  petition: zPetition.pick({ id: true }),
  user: zUser.pick({ id: true }),
});

export const zPetitionAgreeRequestCreate = zPetitionAgree
  .omit({
    id: true,
  })
  .extend({ duration: zDurationCreate });

export const zPetitonAgreeRequestUpdate = zPetitionAgree;

export type IPetitionAgree = z.infer<typeof zPetitionAgree>;
export type IPetitionAgreeRequestCreate = z.infer<
  typeof zPetitionAgreeRequestCreate
>;
export type IPetitionAgreeRequestUpdate = z.infer<
  typeof zPetitonAgreeRequestUpdate
>;

export const zPetitonAnswer = z.object({
  id: zId,
  petition: zPetition.pick({ id: true }),
  user: zUser.pick({ id: true }),
  team: zTeam.pick({ id: true }),
  posted: z.boolean().default(false),
});

export const zPetitionAnswerRequestCreate = zPetitonAnswer
  .omit({
    id: true,
  })
  .extend({ duration: zDurationCreate });

export const zPetitonAnswerRequestUpdate = zPetitonAnswer;

export type IPetitionAnswer = z.infer<typeof zPetitonAnswer>;
export type IPetitionAnswerRequestCreate = z.infer<
  typeof zPetitionAnswerRequestCreate
>;
export type IPetitionAnswerRequestUpdate = z.infer<
  typeof zPetitonAnswerRequestUpdate
>;
