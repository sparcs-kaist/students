import React from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import GroupList from "@sparcs-students/web/features/project/components/GroupList";
import { GroupProps } from "@sparcs-students/web/features/project/components/_atomic/GroupDetail";
import Image from "next/image";
import styled from "styled-components";
import MemberTable, { MemberProps } from "./MemberTable";

export interface OperationPlanProps {
  memberData: MemberProps[];
  note: string;
  groupList: GroupProps[];
  imagePath: string;
  isProposal?: boolean;
}

const StyledImage = styled(Image)`
  width: 70%;
  height: auto;
`;

const OperationPlan: React.FC<OperationPlanProps> = ({
  memberData,
  note,
  groupList,
  imagePath,
  isProposal = true,
}) => (
  <FlexWrapper direction="column" gap={60}>
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
        {isProposal ? "운영계획" : "운영보고"}
      </Typography>
      <MemberTable data={memberData} />
    </FlexWrapper>
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
        비고
      </Typography>
      <TextInput placeholder="비고 입력" value={note} constant />
    </FlexWrapper>
    <GroupList data={groupList} />
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
        조직도
      </Typography>
      <StyledImage
        src={`/${imagePath}`}
        alt="조직도"
        width={0}
        height={0}
        sizes="100vw"
      />
    </FlexWrapper>
  </FlexWrapper>
);

export default OperationPlan;
