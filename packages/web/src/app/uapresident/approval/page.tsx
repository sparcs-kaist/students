"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import { mockData } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import ApprovalTable, {
  ApprovalItem,
} from "@sparcs-students/web/features/uapresident/components/ApprovalTable";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

const ApprovalPage = () => {
  const items: ThreeInputItem[] = mockData;
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean | null>(null);
  const [type, setType] = useState<DocumentType | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Mock data for the table
  // TODO: Replace with real API when available (e.g., GET /uapresident/approvals)
  // Currently, there is no API to fetch approval items.
  const mockApprovalData: ApprovalItem[] = Array.from({ length: 10 }).map(
    (_, i) => ({
      id: i + 1,
      type: "결산안",
      orgName: "전산학부 학생회",
      submissionDate: "2025.12.12.",
      totalItems: 15,
      approvedItems: 15,
      status: "승인",
    }),
  );

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예/결산 최종 승인</PageTitle>
        <BreadCrumb
          items={[{ name: "예/결산 최종 승인", path: "/uapresident/approval" }]}
        />
      </FlexWrapper>

      <FlexWrapper direction="column" gap={60} style={{ padding: "20px 0px" }}>
        {/* Lookup Guide Section */}
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
                // eslint-disable-next-line no-console
                console.log("Lookup clicked");
              }}
            />
          </FlexWrapper>
        </FlexWrapper>

        {/* Search Results Section */}
        <FlexWrapper direction="column" gap={32}>
          <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
            조회 결과
          </Typography>
          <ApprovalTable data={mockApprovalData} />

          <FlexWrapper
            direction="row"
            justify="center"
            gap={10}
            style={{ marginTop: "20px" }}
          >
            {/* Pagination would go here, using a simple placeholder for now or just relying on the table if it had pagination built-in, but the design shows pagination below table */}
            {/* For now, just the Save button as requested */}
          </FlexWrapper>

          <FlexWrapper direction="row" justify="center" gap={10}>
            <Button
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log("Save clicked");
                // eslint-disable-next-line no-alert
                alert("저장 기능은 아직 구현되지 않았습니다.");
              }}
              style={{ width: "120px" }}
            >
              저장
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default ApprovalPage;
