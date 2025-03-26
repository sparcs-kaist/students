"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/documents/components/ThreeInput/mock";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/documents/components/ThreeInput";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import { useRouter } from "next/navigation";

const documentLookUp = () => {
  const items: ThreeInputItem[] = mockData;
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean>(items[0].value.isSpring);
  const [type, setType] = useState<DocumentType>(DocumentType.BudgetProposal);
  const [selectedKey, setSelectedKey] = useState<string>(""); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string>(""); // TODO: enum으로 변경

  const router = useRouter();

  const lookUp = () => {
    // TODO: api 연결하면 URL의 id값 적절하게 수정
    switch (type) {
      case "사업 계획서":
        router.push("/document-lookup/project-proposal/result/1");
        break;
      case "사업 보고서":
        router.push("/document-lookup/project-report/result/1");
        break;
      case "예산안":
        router.push("/document-lookup/budget-proposal/result/1");
        break;
      case "결산안":
        router.push("/document-lookup/budget-report/result/1");
        break;
      default: // 있으면 안 되는 오류 케이스
        throw new Error(`잘못된 문서 유형: ${type}`);
    }
  };

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[{ name: "예결산 조회", path: "/document-lookup" }]}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <FlexWrapper direction="column" gap={32}>
          <FlexWrapper direction="column" gap={16}>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              조회 가이드
            </Typography>
            <ThreeInput
              itemList={items}
              year={year}
              setYear={setYear}
              isSpring={isSpring}
              setIsSpring={setIsSpring}
              type={type}
              setType={setType}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <Button
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={lookUp}
            />
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default documentLookUp;
