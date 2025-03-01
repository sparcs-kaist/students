import React from "react";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import DetailModal from "@sparcs-students/web/features/documents/components/DetailModal";
import Icon from "@sparcs-students/web/common/components/Icon";

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

  return <Icon onClick={openCheckModal} type="search" size={19} />;
};
export default DetailButton;
