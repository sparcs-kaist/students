"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import Typography from "@sparcs-students/web/common/components/Typography";
import AdditionalRevisionFrame from "@sparcs-students/web/features/document-lookup/budget-review/AdditionalRevisionFrame";
import {
  mockReviewAddtionalRevisionResultData,
  mockViewBudgetReportResultData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import { BudgetReviewThreeInputMock } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";
import ViewResult from "@sparcs-students/web/features/document-lookup/components/ViewResult";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Report = () => {
  // const { id } = useParams();
  const items: ThreeInputItem[] = BudgetReviewThreeInputMock;
  const searchParams = useSearchParams();
  const queryYear = parseInt(searchParams.get("year") || "") || items[0].year;
  const queryIsSpring = searchParams.get("isSpring") === "true";
  const queryType = searchParams.get("type") as DocumentType | null;
  const queryKey = searchParams.get("key");
  const queryValue = searchParams.get("value");
  const queryId = parseInt(searchParams.get("id") || "");

  const [date, setDate] = useState(mockViewBudgetReportResultData.submitDate);
  const [year, setYear] = useState<number>(queryYear);
  const [isSpring, setIsSpring] = useState<boolean | null>(queryIsSpring);
  const [type, setType] = useState<DocumentType | null>(queryType);
  const [selectedKey, setSelectedKey] = useState<string | null>(queryKey); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string | null>(queryValue); // TODO: enum으로 변경
  const [selectedId, setSelectedId] = useState<number | null>(queryId);

  const router = useRouter();

  const lookUp = (id: number) => {
    const query = new URLSearchParams({
      year: String(year),
      isSpring: String(isSpring),
      type: String(type),
      key: selectedKey ?? "",
      value: selectedValue ?? "",
      id: String(id),
    }).toString();

    switch (type) {
      case "선집행":
        router.push(`/document-lookup/pre-execution/result/${id}?${query}`);
        break;
      case "추가경정":
        router.push(
          `/document-lookup/additional-revision/result/${id}?${query}`,
        );
        break;
      case "사후승인":
        router.push(`/document-lookup/post-approval/result/${id}?${query}`);
        break;
      default:
        throw new Error(`잘못된 문서 유형: ${type}`);
    }
  };

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[
            { name: "예결산 조회", path: "/document-lookup" },
            {
              name: "예산 추가 심의",
              path: "/document-lookup/additional-revision",
            },
          ]}
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
              isBudgetReview
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <ModalTableButton
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={() => lookUp(selectedId as number)}
            />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockReviewAddtionalRevisionResultData}
          submitDate={date}
          handleDateChange={setDate}
        />
        <AdditionalRevisionFrame />
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default Report;
