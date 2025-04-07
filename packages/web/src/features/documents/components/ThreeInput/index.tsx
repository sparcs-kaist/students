"use client";

import { useEffect, useMemo } from "react";
import styled from "styled-components";
import SemesterCard from "@sparcs-students/web/common/components/SelectCard/SemesterSelectCard";
import DocumentCard, {
  DocumentType,
} from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import OrganizationSelectCard, {
  OrganizationItem,
} from "@sparcs-students/web/common/components/SelectCard/OrganizationSelectCard";

export interface ThreeInputItem {
  id: number;
  label: string;
  year: number;
  value: {
    isSpring: boolean;
    documentType: {
      types: DocumentType[];
      selectedType: DocumentType;
      organization: OrganizationItem[];
    };
  };
}

interface ThreeInputProps {
  itemList: ThreeInputItem[];
  year: number;
  setYear: (year: number) => void;
  isSpring: boolean | null;
  setIsSpring: (isSpring: boolean | null) => void;
  type: DocumentType | null;
  setType: (docType: DocumentType | null) => void;
  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
}

const OuterWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: 100%;
    flex-direction: row;
  }
`;

// /document-lookup 페이지를 제외한 다른 페이지에서는 year, isSpring, type, selectedKey, selectedValue가 null이 아닌 값으로 채워져 있어야 함
const ThreeInput: React.FC<ThreeInputProps> = ({
  itemList,
  year,
  setYear,
  isSpring,
  setIsSpring,
  type,
  setType,
  selectedKey,
  setSelectedKey,
  selectedValue,
  setSelectedValue,
}: ThreeInputProps) => {
  // CHACHA: 학기 선택에 쓰임
  const selectItems = useMemo(() => {
    const stringSet = new Set(
      itemList.map(e => JSON.stringify({ label: e.label, value: e.year })),
    );
    return Array.from(stringSet).map(str => JSON.parse(str));
  }, [itemList]);

  const totalList = useMemo(() => {
    const matched = itemList.find(
      e =>
        e.year === year &&
        e.value.isSpring === isSpring &&
        e.value.documentType.selectedType === type,
    );
    return matched ? matched.value.documentType.organization : [];
  }, [itemList, year, isSpring, type]);

  const keyList = useMemo(() => totalList.map(e => e.key), [totalList]);

  useEffect(() => {
    setSelectedKey("");
    setSelectedValue("");
  }, [type, setSelectedKey, setSelectedValue]);

  return (
    <OuterWrapper>
      <InnerWrapper>
        <SemesterCard
          year={year}
          setYear={setYear}
          selectItems={selectItems}
          isSpring={isSpring}
          setIsSpring={setIsSpring}
        />
        <DocumentCard
          type={type}
          setType={setType}
          disabled={year === null || isSpring === null}
        />
      </InnerWrapper>
      <OrganizationSelectCard
        totalList={totalList}
        keyList={keyList}
        selectedKey={selectedKey ?? ""}
        setSelectedKey={setSelectedKey}
        selectedValue={selectedValue ?? ""}
        setSelectedValue={setSelectedValue}
        disabled={year === null || isSpring === null || type === null}
      />
    </OuterWrapper>
  );
};
export default ThreeInput;
