"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProfileCard from "@sparcs-students/web/common/components/ProfileCard";
import StudentFeeCard from "@sparcs-students/web/common/components/StudentFeeCard";
import Typography from "@sparcs-students/web/common/components/Typography";

const MyPage = () => (
  <FlexWrapper direction="column" gap={20}>
    <Typography fs={30} lh={40} color="GREEN.800" fw="BOLD">
      마이페이지
    </Typography>
    <FlexWrapper direction="column" gap={30}>
      <FlexWrapper direction="row" gap={10}>
        <ProfileCard />
        <StudentFeeCard />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={10}>
        <Typography fs={24} lh={24} color="BLACK" fw="BOLD">
          나의 청원
        </Typography>
      </FlexWrapper>
    </FlexWrapper>
  </FlexWrapper>
);

export default MyPage;
