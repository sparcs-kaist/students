"use client";

import React, { useEffect, useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Typography from "@sparcs-students/web/common/components/Typography";
import { getApplyingMembers } from "@sparcs-students/web/features/organization-manage/api/organizationApi";

interface FlattenedApplicant {
  orgId: number;
  orgName: string;
  memberId: number;
  studentId: number;
}

const ApplicantApprovePage = () => {
  const [applicants, setApplicants] = useState<FlattenedApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        const data = await getApplyingMembers();
        const flattened: FlattenedApplicant[] = [];
        if (data.organizationLists) {
          data.organizationLists.forEach(sem => {
            sem.organizationTypes.forEach(ot => {
              ot.organizations.forEach(org => {
                org.members.forEach(mem => {
                  flattened.push({
                    orgId: org.id,
                    orgName: org.name,
                    memberId: mem.id,
                    studentId: mem.student.id,
                  });
                });
              });
            });
          });
        }
        setApplicants(flattened);
      } catch (error) {
        console.error("Failed to fetch applying members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Typography fs={16} lh={20} color="GRAY.400">
          신청 학우 목록을 불러오는 중...
        </Typography>
      );
    }
    if (applicants.length === 0) {
      return (
        <Typography fs={16} lh={20} color="GRAY.400">
          대기 중인 가입 신청이 없습니다. (Mock 데이터 상태)
        </Typography>
      );
    }
    return (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f5f5f5",
              height: "40px",
              borderBottom: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "8px" }}>단체 ID</th>
            <th style={{ padding: "8px" }}>단체명</th>
            <th style={{ padding: "8px" }}>신청 멤버 ID</th>
            <th style={{ padding: "8px" }}>학생 ID</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((app, idx) => (
            <tr
              key={idx}
              style={{ height: "48px", borderBottom: "1px solid #ddd" }}
            >
              <td style={{ padding: "8px" }}>{app.orgId}</td>
              <td style={{ padding: "8px" }}>{app.orgName}</td>
              <td style={{ padding: "8px" }}>{app.memberId}</td>
              <td style={{ padding: "8px" }}>{app.studentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>가입 신청 검토</PageTitle>
        <BreadCrumb
          items={[
            { name: "단체 관리", path: "/organization-manage" },
            { name: "가입 신청 검토", path: "/organization-manage/approve" },
          ]}
        />
      </FlexWrapper>

      <FlexWrapper direction="column" gap={16} padding="0 20px">
        <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
          승인 대기 목록 (ORG-010)
        </Typography>
        {renderContent()}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default ApplicantApprovePage;
