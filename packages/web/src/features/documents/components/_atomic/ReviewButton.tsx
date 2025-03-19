import React from "react";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import Icon from "@sparcs-students/web/common/components/Icon";
import ReviewModal, {
  ReadOnlyReviewModal,
} from "@sparcs-students/web/features/documents/components/ReviewModal";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

type ReviewButtonProps = {
  review: string;
  status: DocumentReviewStatusEnum;
  handleReviewChange: (detail: string) => void;
  handleStatusChange: (status: DocumentReviewStatusEnum) => void;
};

type ReadOnlyReviewButtonProps = {
  review: string;
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

  return <Icon onClick={openCheckModal} type="edit" size={18} />;
};
export default ReviewButton;

export const ReadOnlyReviewButton = ({ review }: ReadOnlyReviewButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="500px">
        <ReadOnlyReviewModal
          onConfirm={() => {
            close();
          }}
          review={review}
        />
      </Modal>
    ));
  };

  return <Icon onClick={openCheckModal} type="search" size={18} />;
};
