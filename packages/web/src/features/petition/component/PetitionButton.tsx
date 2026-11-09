import Icon from "@sparcs-students/web/common/components/Icon";
import colors from "@sparcs-students/web/styles/themes/colors";
import { useRouter } from "next/navigation";
import AtomicPetitionButton from "./_atomic/AtomicPetitionButton";

const PetitionButton = () => {
  const router = useRouter();
  return (
    <AtomicPetitionButton
      icon={<Icon type="create" size={24} color="WHITE" />}
      color={colors.MELON[700]}
      text="청원하기"
      onClick={() => router.push("/petition/create")}
    />
  );
};

export default PetitionButton;
