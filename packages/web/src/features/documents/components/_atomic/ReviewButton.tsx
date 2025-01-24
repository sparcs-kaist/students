import React from "react";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import Icon from "@sparcs-students/web/common/components/Icon";
import ReviewModal from "@sparcs-students/web/features/documents/components/ReviewModal";

type ReviewButtonProps = {
  detail: string;
};

const ReviewButton = ({ detail }: ReviewButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ReviewModal
          onConfirm={() => {
            close();
          }}
          detail={detail}
          status=""
        />
      </Modal>
    ));
  };

  return <Icon onClick={openCheckModal} type="edit" size={18} />;
};
export default ReviewButton;
