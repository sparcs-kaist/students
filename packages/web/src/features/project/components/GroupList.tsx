import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import GroupDetail, {
  GroupProps,
} from "@sparcs-students/web/features/project/components/_atomic/GroupDetail";

interface GroupListProps {
  data: GroupProps[];
}

const GroupList: React.FC<GroupListProps> = ({ data }) => (
  <FlexWrapper direction="column" gap={16}>
    <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
      국서/TF 구조
    </Typography>
    {data.map(group => (
      <GroupDetail {...group} />
    ))}
  </FlexWrapper>
);

export default GroupList;
