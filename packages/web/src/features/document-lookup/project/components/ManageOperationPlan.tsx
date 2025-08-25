import React, { useState, useEffect, useRef } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import GroupList from "@sparcs-students/web/features/document-lookup/project/components/GroupList";
import { GroupProps } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";
import Image from "next/image";
import styled from "styled-components";
import { mockOperatingCommitteeMemberTableListData } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalData";
import OperatingCommitteeMemberTable from "@sparcs-students/web/features/document-lookup/project/components/OperatingCommitteeMemberTable";
import MemberTable, {
  MemberProps,
} from "@sparcs-students/web/features/document-lookup/project/components/MemberTable";
import CompButton from "@sparcs-students/web/common/components/Buttons/CompButton";

export interface ManageOperationPlanProps {
  memberData: MemberProps[];
  note: string;
  groupList: GroupProps[];
  setGroupList: React.Dispatch<React.SetStateAction<GroupProps[]>>;
  imagePath: string;
  isProposal?: boolean;
  handleNoteChange?: (note: string) => void;
}

const StyledImage = styled(Image)`
  width: 70%;
  height: auto;
  margin: 0 auto;
`;
const DividerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: ${({ theme }) => theme.colors.GRAY[100]} 1px solid;
`;

const ManagerOperationPlan: React.FC<ManageOperationPlanProps> = ({
  memberData,
  note,
  groupList,
  setGroupList,
  imagePath,
  isProposal = true,
  handleNoteChange = () => {},
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("uploadedImage");
    if (stored) setUploadedImage(stored);
  }, []);

  const handleImageUpload = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setUploadedImage(dataUrl);
        try {
          localStorage.setItem("uploadedImage", dataUrl);
        } catch (err) {
          console.error("Failed to save image to localStorage:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={onFileChange}
      />
      <FlexWrapper direction="column" gap={60}>
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
            {isProposal ? "운영계획" : "운영보고"}
          </Typography>
          {mockOperatingCommitteeMemberTableListData.map(
            mockOperatingCommitteeMemberTableData => (
              <OperatingCommitteeMemberTable
                data={mockOperatingCommitteeMemberTableData}
              />
            ),
          )}
          <MemberTable title="집행위원 명단" data={memberData} />
        </FlexWrapper>

        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
            비고
          </Typography>
          <TextInput
            placeholder="비고를 입력하세요."
            value={note}
            handleChange={handleNoteChange}
          />
        </FlexWrapper>

        <DividerWrapper />
        <GroupList data={groupList} setData={setGroupList} isEditable />

        <FlexWrapper direction="column" gap={16}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
              조직도
            </Typography>
            <CompButton
              type="default"
              buttonText="파일 찾기"
              onClick={handleImageUpload}
            />
          </div>
          <StyledImage
            src={uploadedImage || `/${imagePath}`}
            alt="조직도"
            width={0}
            height={0}
            sizes="100vw"
          />
        </FlexWrapper>
      </FlexWrapper>
    </>
  );
};

export default ManagerOperationPlan;
