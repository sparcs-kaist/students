"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import { useRouter } from "next/navigation";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";

const documentLookUp = () => {
  const items: ThreeInputItem[] = mockData;
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean | null>(null);
  const [type, setType] = useState<DocumentType | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // TODO: enum으로 변경
  const [selectedId, setSelectedId] = useState<number | null>(null); // 단체마다 고유 id임

  const router = useRouter();

  const lookUp = ({
    id,
    year: yearParam,
    isSpring: isSpringParam,
    type: typeParam,
    key,
    value,
  }: {
    id: number;
    year: number;
    isSpring: boolean;
    type: DocumentType;
    key: string;
    value: string;
  }) => {
    // TODO: api 연결하면 URL의 id값 적절하게 수정
    // TODO: 여기서 id는 어떤 반기, 어떤 단체의 고유한 id
    const query = new URLSearchParams({
      id: id.toString(),
      year: yearParam.toString(),
      isSpring: isSpringParam.toString(),
      type: typeParam,
      key,
      value,
    });
    let path = "";

    switch (type) {
      case "사업 계획서":
        path = `/document-lookup/project-proposal/result/${id}`;
        break;
      case "사업 보고서":
        path = `/document-lookup/project-report/result/${id}`;
        break;
      case "예산안":
        path = `/document-lookup/budget-proposal/result/${id}`;
        break;
      case "결산":
        path = `/document-lookup/budget-report/result/${id}`;
        break;
      default:
        throw new Error(`잘못된 문서 유형: ${type}`);
    }

    router.push(`${path}?${query.toString()}`);
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
              setSelectedId={setSelectedId}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <ModalTableButton
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={() => {
                if (
                  selectedId != null &&
                  year != null &&
                  isSpring != null &&
                  type != null &&
                  selectedKey != null &&
                  selectedValue != null
                ) {
                  lookUp({
                    id: selectedId,
                    year,
                    isSpring,
                    type,
                    key: selectedKey,
                    value: selectedValue,
                  });
                }
              }}
            />
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default documentLookUp;
