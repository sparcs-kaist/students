import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import IconButton from "@mui/material/IconButton";

type DetailButtonProps = {
  detail: string;
};

const DetailButton = ({ detail }: DetailButtonProps) => {
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

  return (
    <IconButton onClick={openCheckModal}>
      <SearchIcon />
    </IconButton>
  );
};
export default DetailButton;
