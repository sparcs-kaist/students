import { jwtDecode } from "jwt-decode";
import React from "react";
import styled from "styled-components";

import Typography from "@sparcs-students/web/common/components/Typography";
// import { setLocalStorageItem } from "@sparcs-clubs/web/utils/localStorage";

import { setLocalStorageItem } from "@sparcs-students/web/utils/localStorage";
import Profile from "./Profile";

interface ProfileListProps {
  profiles: {
    roleKey: string;
    profileType: string;
    token: string;
  }[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
}

// interface DecodedToken extends JwtPayload {
//   studentNumber: number;
//   email: string;
// }

const ProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  setIsMenuOpen,
  selectedToken,
  setSelectedToken,
}) => {
  const handleProfileClick = (profile: {
    roleKey: string;
    profileType: string;
    token: string;
  }) => {
    setSelectedToken(profile.token);
    setLocalStorageItem("accessToken", profile.token);
    setIsMenuOpen(false);
  };

  if (profiles.length === 0) {
    return null;
  }

  return (
    <ProfileListWrapper>
      {profiles.length > 1 && (
        <Typography fw="MEDIUM" fs={14} lh={16}>
          계정 선택
        </Typography>
      )}
      {profiles.map(profile => {
        let profileNumber = 0;
        let email = "";
        try {
          const decoded = jwtDecode<{
            studentNumber?: number;
            email?: string;
          }>(profile.token);
          profileNumber = decoded.studentNumber ?? 0;
          email = decoded.email ?? "";
        } catch {
          /* non-JWT or malformed */
        }
        return (
          <Profile
            key={profile.roleKey}
            profileName={profile.profileType}
            profileNumber={profileNumber}
            email={email}
            isSelected={selectedToken === profile.token}
            onClick={() => handleProfileClick(profile)}
          />
        );
      })}
    </ProfileListWrapper>
  );
};
export default ProfileList;
