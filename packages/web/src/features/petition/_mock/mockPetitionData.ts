import { PetitionStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/petition.enum";
import { PetitionProps } from "@sparcs-students/web/features/petition/component/PetitionTable";

export const mockPetitionData: PetitionProps[] = [
  {
    id: 1,
    status: PetitionStatusEnum.Progress,
    title: "청원 진행 중인 청원",
    supportCount: 718,
    postDate: "2025.07.18.",
  },
  {
    id: 2,
    status: PetitionStatusEnum.Expired,
    title: "청원 기간 만료된 청원",
    supportCount: 7,
    postDate: "2025.07.18.",
  },
  {
    id: 3,
    status: PetitionStatusEnum.Waiting,
    title: "답변 대기 중인 청원",
    supportCount: 1,
    postDate: "2025.07.18.",
  },
  {
    id: 4,
    status: PetitionStatusEnum.Responded,
    title: "답변 완료된 청원",
    supportCount: 8,
    postDate: "2025.07.18.",
  },
];
