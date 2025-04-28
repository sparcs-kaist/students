"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";

import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ViewerProjectProposalDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ViewerProjectProposalDetailFrame";
import { UserPermission } from "@sparcs-students/web/constants/userPermission";
import getMockUserPermission from "@sparcs-students/web/features/document-lookup/project/services/getMockUserPermission";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import ReviewerProjectProposalDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ReviewerProjectProposalDetailFrame";
import ManagerProjectProposalDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ManagerProjectProposalDetailFrame";

const DocumentDetailPage: React.FC = () => {
  const userPermission = getMockUserPermission();

  const { id: resultId, detailId } = useParams();

  const searchParams = useSearchParams();
  const queryYear = parseInt(searchParams.get("year") || "");
  const queryIsSpring = searchParams.get("isSpring") === "true";
  const queryType = searchParams.get("type") as DocumentType | null;
  const queryKey = searchParams.get("key");
  const queryValue = searchParams.get("value");

  const query = new URLSearchParams({
    year: String(queryYear),
    isSpring: String(queryIsSpring),
    type: String(queryType),
    key: queryKey ?? "",
    value: queryValue ?? "",
  }).toString();

  const [projectTitle, setProjectTitle] = useState("사업명");

  const breadcrumbItems = [
    { name: "예결산 조회", path: "/document-lookup" },
    {
      name: "사업계획서",
      path: `/document-lookup/project-proposal/result/${resultId}?${query}`,
    },
    {
      name: projectTitle || "사업명",
      path: `/document-lookup/project-proposal/result/${resultId}/detail/${detailId}?${query}`,
    },
  ];

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <Typography fw="BOLD" fs={30} lh={40} color="PRIMARY">
          예결산 조회
        </Typography>
        <BreadCrumb items={breadcrumbItems} />
      </FlexWrapper>
      {userPermission === UserPermission.Viewer && (
        <ViewerProjectProposalDetailFrame />
      )}
      {userPermission === UserPermission.Reviewer && (
        <ReviewerProjectProposalDetailFrame />
      )}
      {userPermission === UserPermission.Manager && (
        <ManagerProjectProposalDetailFrame setProjectTitle={setProjectTitle} />
      )}
    </FlexWrapper>
  );
};

export default DocumentDetailPage;
