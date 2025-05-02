import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import GroupDetail, {
  GroupProps,
} from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

interface GroupListProps {
  data: GroupProps[];
  isEditable: boolean;
}

const GroupList: React.FC<GroupListProps> = ({ data, isEditable }) => {
  const [tmpData, setTmpData] = useState(data);
  return (
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
        {isEditable && (
          <Button
            buttonText="저장"
            style={{ width: "60px", padding: "5px 0px", fontSize: "14px" }}
            onClick={() => {
              console.log(tmpData);
            }}
          />
        )}
      </FlexWrapper>
      {tmpData.map(group => (
        <GroupDetail {...group} setTmpData={setTmpData} isEditable />
      ))}
    </FlexWrapper>
  );
};

export default GroupList;
