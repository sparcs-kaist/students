"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";

interface NoticeDraft {
  id?: string;
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
  detail?: string;
}

const NOTICE_STORAGE_KEY = "sparcs-students-notices";

const createNoticeId = (content: string, date: Date): string => {
  const safeBase = content
    .replace(/[^a-zA-Z0-9가-힣\-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return `${safeBase || "notice"}-${date.getTime()}`;
};

const NoticeCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    const createdAt = new Date();
    const nextNotice: NoticeDraft = {
      id: createNoticeId(trimmedTitle, createdAt),
      content: trimmedTitle,
      date: createdAt,
      detail: trimmedContent,
    };

    const stored = localStorage.getItem(NOTICE_STORAGE_KEY);
    const currentNotices = stored ? JSON.parse(stored) : [];
    const merged = [nextNotice, ...currentNotices];

    localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(merged));
    router.push("/notice");
  };

  return (
    <FlexWrapper direction="column" gap={20}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>공지사항 작성</PageTitle>
        <BreadCrumb
          items={[
            { name: "공지사항", path: "/notice" },
            { name: "작성", path: "/notice/create" },
          ]}
        />
      </FlexWrapper>

      <FlexWrapper direction="column" gap={20}>
        <TextInput
          placeholder="공지사항 제목을 입력하세요"
          value={title}
          handleChange={setTitle}
        />

        <TextAreaInput
          placeholder="공지사항 내용을 입력하세요"
          value={content}
          handleChange={setContent}
          height={220}
        />

        <FlexWrapper direction="row" gap={10} justify="flex-end">
          <ModalTableButton
            buttonText="취소"
            type="reverse"
            onClick={() => router.push("/notice")}
          />
          <ModalTableButton buttonText="확인" onClick={handleSubmit} />
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default NoticeCreatePage;
