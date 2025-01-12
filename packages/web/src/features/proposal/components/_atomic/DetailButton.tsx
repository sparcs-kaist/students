import React from "react";
import SearchIconButton from "@mui/icons-material/Search";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";

type DetailButtonProps = {
  detail: string;
};

const DetailButton = ({ detail = "detail" }: DetailButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ConfirmModalContent
          onConfirm={() => {
            close();
          }}
          confirmButtonText="닫기"
        >
          {detail}
        </ConfirmModalContent>
      </Modal>
    ));
  };
  // TODO: 비고/근거 모달 구현

  return <SearchIconButton onClick={openCheckModal} />;
};
export default DetailButton;
