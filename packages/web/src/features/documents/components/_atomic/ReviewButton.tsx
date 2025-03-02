import React from "react";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import ReviewModal from "@sparcs-students/web/features/documents/components/ReviewModal";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

type ReviewButtonProps = {
  review: string;
  status: string;
  handleReviewChange: (detail: string) => void;
  handleStatusChange: (status: string) => void;
};

const ReviewButton = ({
  review,
  status,
  handleReviewChange,
  handleStatusChange,
}: ReviewButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="500px">
        <ReviewModal
          onConfirm={() => {
            close();
          }}
          review={review}
          status={status}
          handleReviewChange={handleReviewChange}
          handleStatusChange={handleStatusChange}
        />
      </Modal>
    ));
  };

  return (
    <Button
      onClick={e => {
        e.stopPropagation();
        openCheckModal();
      }}
      iconType="edit"
      type="icon"
    />
  );
};
export default ReviewButton;
