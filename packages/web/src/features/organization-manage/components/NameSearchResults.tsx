import React from "react";
import styled from "styled-components";
import {
  MemberRoleEnum,
  CommitteeRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";
import Typography from "@sparcs-students/web/common/components/Typography";
import Icon from "@sparcs-students/web/common/components/Icon";

type RoleEnumType = MemberRoleEnum | CommitteeRoleEnum;

interface OrganizationMemberProps {
  id: number;
  studentId: string;
  name: string;
  role: RoleEnumType; // TODO: change to real enum
  startDate: string;
  endDate: string;
}

interface NameSearchResultsProps {
  isSearch: boolean;
  searchResults: OrganizationMemberProps[];
  onAddNewRow: (value: OrganizationMemberProps) => void;
}

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GREEN[300]};
  justify-content: center;
  align-items: center;
`;

const MemberRow = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 14px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StudentIdCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  width: 140px;
  height: 26px;
`;

const NameCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  width: 140px;
  height: 26px;
`;

const AddCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  width: 40px;
  height: 26px;
`;

const NameSearchResults: React.FC<NameSearchResultsProps> = ({
  isSearch,
  searchResults,
  onAddNewRow,
}) => {
  const renderContent = () => {
    if (isSearch) {
      if (searchResults.length === 0) {
        return (
          <Typography fs={14} lh={14} fw="MEDIUM" color="BLACK">
            해당 이름의 학우가 존재하지 않습니다.
          </Typography>
        );
      }
      return searchResults.map(searchResult => (
        <MemberRow key={searchResult.id}>
          <StudentIdCell>{searchResult.studentId}</StudentIdCell>
          <NameCell>{searchResult.name}</NameCell>
          <AddCell>
            <Icon
              type="add"
              size={24}
              onClick={() => onAddNewRow(searchResult)}
            />
          </AddCell>
        </MemberRow>
      ));
    }
    return (
      <Typography fs={14} lh={14} fw="MEDIUM" color="BLACK">
        이름을 검색해주세요.
      </Typography>
    );
  };

  return <ResultsWrapper>{renderContent()}</ResultsWrapper>;
};

export default NameSearchResults;
