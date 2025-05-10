import React from "react";
import Modal from "@sparcs-students/web/common/components/Modal";
import { overlay } from "overlay-kit";
import DetailModal, {
  EditableDetailModal,
} from "@sparcs-students/web/features/document-lookup/components/DetailModal";
import Icon from "@sparcs-students/web/common/components/Icon";

type DetailButtonProps = {
  title: string;
  detail: string;
};

type EditableDetailButtonProps = {
  projectItem: string;
  value: string;
  onChange: (detail: string) => void;
};

export const EditableDetailButton = ({
  projectItem,
  value,
  onChange,
}: EditableDetailButtonProps) => {
  const openCheckModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <EditableDetailModal
          onConfirm={() => {
            close();
          }}
          onClose={() => {
            close();
          }}
          title={`${projectItem}에 대한 비고`}
          value={value}
          onChange={onChange}
        />
      </Modal>
    ));
  };

  return <Icon onClick={openCheckModal} type="edit" size={19} />;
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
