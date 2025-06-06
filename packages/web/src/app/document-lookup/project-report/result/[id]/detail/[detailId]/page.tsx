"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { UserPermission } from "@sparcs-students/web/constants/userPermission";
import getMockUserPermission from "@sparcs-students/web/features/document-lookup/project/services/getMockUserPermission";
import ReviewerProjectReportDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ReviewerProjectReportDetailFrame";
import ViewerProjectReportDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ViewerProjectReportDetailFrame";
import ManagerProjectReportDetailFrame from "@sparcs-students/web/features/document-lookup/project/frames/ManagerProjectReportDetailFrame";

const DocumentViewerDetailPage: React.FC = () => {
  const userPermission = getMockUserPermission(); // TODO: auth logic
  const { resultId, detailId } = useParams();
  const [projectTitle, setProjectTitle] = useState("사업명");

  const breadcrumbItems = [
    { name: "예결산 조회", path: "/document-lookup" },
    {
      name: "사업보고서",
      path: `/document-lookup/project-report/result/${resultId}`,
    },
    {
      name: projectTitle || "사업명",
      path: `/document-lookup/project-proposal/result/${resultId}/detail/${detailId}`,
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
        <ViewerProjectReportDetailFrame />
      )}
      {userPermission === UserPermission.Reviewer && (
        <ReviewerProjectReportDetailFrame />
      )}
      {userPermission === UserPermission.Manager && (
        <ManagerProjectReportDetailFrame setProjectTitle={setProjectTitle} />
      )}
    </FlexWrapper>
  );
};

export default DocumentViewerDetailPage;
