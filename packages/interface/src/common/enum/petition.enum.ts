export enum PetitionStatusEnum {
  Progress = 1,
  Expired,
  Waiting,
  Responded,
}

export const getPetitionStatusEnum = (type: PetitionStatusEnum | undefined) => {
  switch (type) {
    case PetitionStatusEnum.Progress:
      return "청원진행중";
    case PetitionStatusEnum.Expired:
      return "청원기간만료";
    case PetitionStatusEnum.Waiting:
      return "답변대기중";
    case PetitionStatusEnum.Responded:
      return "답변완료";
    default:
      return "";
  }
};
