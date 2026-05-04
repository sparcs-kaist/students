import isPropValid from "@emotion/is-prop-valid";
import React from "react";
import styled from "styled-components";

import Icon from "@sparcs-students/web/common/components/Icon";
import Typography from "@sparcs-students/web/common/components/Typography";

interface ProfileProps {
  profileName: string;
  profileNumber: number;
  email: string;
  isSelected?: boolean;
  onClick: () => void;
}

const ProfileWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  border: ${({ theme, selected }) =>
    selected
      ? `1px solid ${theme.colors.PRIMARY}`
      : `1px solid ${theme.colors.GRAY[100]}`};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GREEN[50]};
  }
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const Profile: React.FC<ProfileProps> = ({
  profileName,
  profileNumber,
  email,
  isSelected = false,
  onClick,
}) => {
  const profileText = (number: number, mail: string) => {
    if (number && mail) return `${number} / ${mail}`;
    if (number === undefined || number === null) return `${mail}`;
    if (mail === undefined || mail === null || mail === "") return `${number}`;
    return "";
  };

  return (
    <ProfileWrapper selected={isSelected} onClick={onClick}>
      {isSelected ? (
        <Icon type="check_box" size={16} color="PRIMARY" />
      ) : (
        <Icon type="check_box_outline_blank" size={16} color="BLACK" />
      )}
      <ProfileText>
        <Typography fw="MEDIUM" fs={14} lh={14} color="BLACK">
          {profileName}
        </Typography>
        <Typography fs={14} lh={14} color="GRAY.400">
          {profileText(profileNumber, email)}
        </Typography>
      </ProfileText>
    </ProfileWrapper>
  );
};

export default Profile;
