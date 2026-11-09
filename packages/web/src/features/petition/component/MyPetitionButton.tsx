import Icon from "@sparcs-students/web/common/components/Icon";
import colors from "@sparcs-students/web/styles/themes/colors";
import { useRouter } from "next/navigation";
import AtomicPetitionButton from "./_atomic/AtomicPetitionButton";

const MyPetitionButton = () => {
  const router = useRouter();
  return (
    <AtomicPetitionButton
      icon={<Icon type="message" size={24} color="WHITE" />}
      color={colors.CYAN[700]}
      text="나의 청원"
      onClick={() => router.push("/petition/my")}
    />
  );
};

export default MyPetitionButton;
