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
  isSpring: boolean;
  setIsSpring: (isSpring: boolean) => void;
  type: DocumentType;
  setType: (docType: DocumentType) => void;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const ThreeCardsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 1000px;
`;

const VerticalWrapper = styled.div`
  display: flex;
  width: 316px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

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

  const documentTypes = useMemo(() => {
    const matched = itemList.find(
      e => e.year === year && e.value.isSpring === isSpring,
    );
    return matched
      ? matched.value.documentType.types
      : [DocumentType.BudgetProposal];
  }, [itemList, year, isSpring]);

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

  useEffect(() => {
    if (documentTypes.length > 0) {
      setType(documentTypes[0]);
    }
  }, [isSpring, documentTypes, setType]);

  return (
    <ThreeCardsWrapper>
      <VerticalWrapper>
        <SemesterCard
          year={year}
          setYear={setYear}
          selectItems={selectItems}
          isSpring={isSpring}
          setIsSpring={setIsSpring}
        />
        <DocumentCard
          documentTypes={documentTypes}
          type={type}
          setType={setType}
        />
      </VerticalWrapper>
      <OrganizationSelectCard
        totalList={totalList}
        keyList={keyList}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </ThreeCardsWrapper>
  );
};
export default ThreeInput;
