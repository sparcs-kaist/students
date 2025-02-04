import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import styled from "styled-components";
import Icon from "@sparcs-students/web/common/components/Icon";

export interface ViewResultProps {
  fileName: string;
  organization: string;
  period: string;
  headPerson: string;
  submitDate: Date | string;
  handleDateChange?: (opt: Date) => void;
  dateList: Date[];
}

interface KeyValueRow {
  label: string;
  value: string;
}

const StyledTable = styled.table`
  width: 100%;
  min-width: 100%;
  table-layout: fixed;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  overflow: hidden;
  border-spacing: 0;
`;

const ContentRow = styled.tr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  text-align: center;
  font-size: 16px;
  line-height: 20px;
`;

const HeaderCell = styled.td`
  width: 160px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 16px 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  text-align: center;
  font-size: 18px;
  line-height: 20px;
`;

const ContentCell = styled.td`
  padding: 16px 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
`;

const ContentButtonCell = styled.td`
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  width: calc(50% - 160px);
  padding: 12px;
  transform: translateX(-20px) translateY(4px);
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: 1000;
`;

const ListItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREEN[50]};
  }
`;

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const ViewResult: React.FC<ViewResultProps> = ({
  fileName,
  organization,
  period,
  headPerson,
  submitDate,
  handleDateChange = (_opt: Date) => {},
  dateList,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState(submitDate);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const data: KeyValueRow[] = [
    { label: "파일명", value: fileName },
    { label: "기구명", value: organization },
    { label: "반기", value: period },
    { label: "기구장", value: headPerson },
    {
      label: "제출연월일",
      value: formatDotDate(date as Date),
    },
  ];

  const first = data[0];
  const rest = data.slice(1);
  const chunkedRest = chunkArray(rest, 2);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (opt: Date) => {
    handleDateChange(opt);
    setDate(opt);
    setIsOpen(false);
  };

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
        조회 결과
      </Typography>
      {loaded && (
        <StyledTable>
          <colgroup>
            <col style={{ width: "160px" }} />
            <col style={{ width: "calc(50% - 160px)" }} />
            <col style={{ width: "160px" }} />
            <col style={{ width: "calc(50% - 160px)" }} />
          </colgroup>
          <tbody>
            <ContentRow key={0}>
              <HeaderCell>{first.label}</HeaderCell>
              <ContentCell colSpan={3}>{first.value}</ContentCell>
            </ContentRow>
            {chunkedRest.map((pairGroup, rowIndex) => (
              <ContentRow key={rowIndex + 1}>
                <HeaderCell>{pairGroup[0].label}</HeaderCell>
                <ContentCell>{pairGroup[0].value}</ContentCell>
                <HeaderCell>{pairGroup[1].label}</HeaderCell>
                {pairGroup[1].label === "제출연월일" ? (
                  <ContentButtonCell>
                    <DropdownHeader
                      onClick={toggleOpen}
                      style={{ cursor: "pointer" }}
                    >
                      <div style={{ flex: 1, textAlign: "center" }}>
                        {pairGroup[1].value}
                      </div>
                      <Icon
                        type={
                          isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"
                        }
                        onClick={toggleOpen}
                        size={20}
                      />
                    </DropdownHeader>
                    {isOpen && (
                      <DropdownList>
                        {dateList.map((opt, idx) => (
                          <ListItem key={idx} onClick={() => handleSelect(opt)}>
                            {formatDotDate(opt)}
                          </ListItem>
                        ))}
                      </DropdownList>
                    )}
                  </ContentButtonCell>
                ) : (
                  <ContentCell>{pairGroup[1].value}</ContentCell>
                )}
              </ContentRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </FlexWrapper>
  );
};

export default ViewResult;
