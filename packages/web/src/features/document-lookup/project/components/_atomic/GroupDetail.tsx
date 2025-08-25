import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";

export interface GroupProps {
  name: string;
  summary: string;
  members: string[];
  projectName: string;
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  padding: 28px 32px;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const FoldableInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
`;

const GroupList: React.FC<
  GroupProps & {
    setTmpData?: React.Dispatch<React.SetStateAction<GroupProps[]>>;
    isEditable: boolean;
  }
> = ({
  name,
  summary,
  members,
  projectName,
  setTmpData = () => {},
  isEditable,
}) => {
  const [folded, setFolded] = useState(true);

  const handleSummaryChange = (newSummary: string) => {
    // TODO: 일단 name 기준으로 했는데 나중에 실제 데이터는 id 등으로 비교해야 할 듯
    setTmpData(prev =>
      prev.map(group =>
        group.name === name ? { ...group, summary: newSummary } : group,
      ),
    );
  };

  return (
    <CardWrapper
      style={{ cursor: "pointer" }}
      onClick={() => setFolded(!folded)}
    >
      <FlexWrapper direction="column" gap={10}>
        <FoldableInner>
          <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
            국서/TF 명
          </Typography>
        </FoldableInner>
        <TextInput placeholder="국서명" value={name} constant isGroup />
      </FlexWrapper>
      {!folded && (
        <FlexWrapper direction="column" gap={10}>
          <FlexWrapper direction="column" gap={10}>
            <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
              활동 요약
            </Typography>
            <TextInput
              placeholder="활동요약"
              value={summary}
              constant={!isEditable}
              isGroup
              handleChange={handleSummaryChange}
            />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={10}>
            <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
              국서/TF원 명단
            </Typography>
            <TextInput
              placeholder="국서/TF원 명단"
              value={members.join(", ")}
              constant
              isGroup
            />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={10}>
            <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
              사업명
            </Typography>
            <TextInput
              placeholder="사업명"
              value={projectName}
              constant
              isGroup
            />
          </FlexWrapper>
        </FlexWrapper>
      )}
    </CardWrapper>
  );
};

export default GroupList;
