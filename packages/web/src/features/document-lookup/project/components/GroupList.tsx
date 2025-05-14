import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import GroupDetail, {
  GroupProps,
} from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";

interface GroupListProps {
  data: GroupProps[];
  setData?: React.Dispatch<React.SetStateAction<GroupProps[]>>;
  isEditable: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  data,
  setData = () => {},
  isEditable,
}) => (
  <FlexWrapper direction="column" gap={16}>
    <FlexWrapper direction="row" gap={0} justify="space-between">
      <Typography
        fs={20}
        lh={28}
        color="BLACK"
        fw="SEMIBOLD"
        style={{ whiteSpace: "nowrap" }}
      >
        국서/TF 구조
      </Typography>
    </FlexWrapper>
    {data.map(group => (
      <GroupDetail {...group} setTmpData={setData} isEditable={isEditable} />
    ))}
  </FlexWrapper>
);

export default GroupList;
