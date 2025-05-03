"use client";

import { useSearchParams, useRouter } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageHead from "@sparcs-students/web/common/components/PageHead";
import mockInfo from "@sparcs-students/web/features/info/mock";
import { useMemo, useState } from "react";
import Content from "@sparcs-students/web/features/info/components/Content";
import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const Info = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const subContent = searchParams.get("subContent");

  const [selectedContent, setSelectedContent] = useState<string | null>(
    mockInfo[0].category,
  );
  const [selectedSubContent, setSelectedSubContent] = useState<string | null>(
    null,
  );

  const matchingInfo = useMemo(() => {
    // content가 없으면 첫 번째 항목 반환
    if (!content) return mockInfo[0];

    // content 파라미터에 해당하는 항목 찾기
    const mainItem = mockInfo.find(item => item.category === content);

    // content에 해당하는 항목이 없으면 첫 번째 항목 반환
    if (!mainItem) return mockInfo[0];

    // subContent 파라미터가 있고, 메인 항목에 subContent 배열이 있는 경우
    if (subContent && mainItem.subContent) {
      // subContent 파라미터와 일치하는 하위 항목 찾기
      const subItem = mainItem.subContent.find(
        sub => sub.category === subContent,
      );

      // 일치하는 하위 항목이 있으면 그 항목을 반환, 없으면 메인 항목 반환
      return subItem || mainItem;
    }

    // subContent 파라미터가 없거나 메인 항목에 subContent 배열이 없는 경우 메인 항목 반환
    return mainItem;
  }, [content, subContent]);

  return (
    <FlexWrapper direction="column" gap={48}>
      <PageHead
        title="학부 총학생회 소개"
        items={[{ name: "학부 총학생회 소개", path: "/info" }]}
      />
      <FlexWrapper direction="row" gap={40} style={{ paddingLeft: 20 }}>
        <ContentWrapper>
          {mockInfo.map(item => (
            <>
              <Content
                key={item.category}
                content={item.category}
                withArrow={item.subContent !== undefined}
                selected={selectedContent === item.category}
                onClick={() => {
                  setSelectedContent(item.category);
                  setSelectedSubContent(null);
                  router.replace(`/info?content=${item.category}`);
                }}
              />
              {selectedContent === item.category &&
                item.subContent?.map(subItem => (
                  <Content
                    key={subItem.category}
                    content={subItem.title}
                    isSubContent
                    selected={selectedSubContent === subItem.category}
                    onClick={() => {
                      setSelectedSubContent(subItem.category);
                      router.replace(
                        `/info?content=${item.category}&subContent=${subItem.category}`,
                      );
                    }}
                  />
                ))}
            </>
          ))}
        </ContentWrapper>
        <FlexWrapper direction="column" gap={32}>
          <Typography color="PRIMARY" fw="BOLD" fs={24} lh={30}>
            {matchingInfo.title}
          </Typography>
          <Typography color="BLACK" fw="REGULAR" fs={16} lh={20}>
            {matchingInfo.content}
          </Typography>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Info;
