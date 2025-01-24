import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import IconButton from "@mui/material/IconButton";
import DetailModal from "@sparcs-students/web/features/proposal/components/_atomic/DetailModal";

type DetailButtonProps = {
  title: string;
  detail: string;
};

const DetailButton = ({ title, detail }: DetailButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <DetailModal
          onConfirm={() => {
            close();
          }}
          title={title}
          detail={detail}
        />
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
