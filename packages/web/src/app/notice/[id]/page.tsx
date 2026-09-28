"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";

interface NoticeDetailProps {
  id?: string;
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
  detail?: string;
}

const NOTICE_STORAGE_KEY = "sparcs-students-notices";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const TagBadge = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.GREEN[50]};
  color: ${({ theme }) => theme.colors.GREEN[600]};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const NoticeTitle = styled.h1`
  margin: 0;
  font-size: 30px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const NoticeMeta = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY[400]};
`;

const NoticeContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 16px;
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.colors.GREEN[600]};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  text-decoration: underline;
`;

const formatDate = (date?: Date) => {
  if (!date) {
    return "날짜 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const NoticeDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [notice, setNotice] = useState<NoticeDetailProps | null>(null);

  useEffect(() => {
    if (!params?.id || typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(NOTICE_STORAGE_KEY);
      if (!stored) {
        setNotice(null);
        return;
      }

      const parsed = JSON.parse(stored) as NoticeDetailProps[];
      const matchedNotice = (Array.isArray(parsed) ? parsed : []).find(
        item => String(item.id) === String(params.id),
      );

      setNotice(
        matchedNotice
          ? {
              ...matchedNotice,
              date: matchedNotice.date
                ? new Date(matchedNotice.date)
                : undefined,
            }
          : null,
      );
    } catch {
      setNotice(null);
    }
  }, [params?.id]);

  if (!notice) {
    return (
      <FlexWrapper direction="column" gap={20}>
        <PageTitle>공지사항</PageTitle>
        <BreadCrumb items={[{ name: "공지사항", path: "/notice" }]} />
        <DetailCard>
          <NoticeTitle>존재하지 않는 공지사항입니다.</NoticeTitle>
          <NoticeContent>
            삭제되었거나 잘못된 경로로 접근한 공지사항입니다.
          </NoticeContent>
          <ModalTableButton
            buttonText="목록으로"
            onClick={() => router.push("/notice")}
          />
        </DetailCard>
      </FlexWrapper>
    );
  }

  return (
    <PageWrapper>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>공지사항</PageTitle>
        <BreadCrumb
          items={[
            { name: "공지사항", path: "/notice" },
            {
              name: notice.content,
              path: `/notice/${notice.id ?? params?.id}`,
            },
          ]}
        />
      </FlexWrapper>

      <DetailCard>
        {notice.tag && <TagBadge>[{notice.tag}]</TagBadge>}
        <NoticeTitle>{notice.content}</NoticeTitle>
        <NoticeMeta>{formatDate(notice.date)}</NoticeMeta>
        <NoticeContent>
          {notice.detail || "상세 내용이 없습니다."}
        </NoticeContent>

        {notice.link && (
          <ExternalLink href={notice.link} target="_blank" rel="noreferrer">
            원문 보기
          </ExternalLink>
        )}

        <ModalTableButton
          buttonText="목록으로"
          type="reverse"
          onClick={() => router.push("/notice")}
        />
      </DetailCard>
    </PageWrapper>
  );
};

export default NoticeDetailPage;
