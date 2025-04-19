"use client";

import { useSearchParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageHead from "@sparcs-students/web/common/components/PageHead";

const Info = () => {
  //   const router = useRouter();
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const subContent = searchParams.get("subContent");

  return (
    <FlexWrapper direction="column" gap={48}>
      <PageHead
        title="학부 총학생회 소개"
        items={[{ name: "학부 총학생회 소개", path: "/info" }]}
      />
      <>{content}</>
      <>{subContent}</>
    </FlexWrapper>
  );
};

export default Info;
