import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import styled from "styled-components";

import { useAuth } from "@sparcs-students/web/common/providers/AuthContext";
import colors from "@sparcs-students/web/styles/themes/colors";
import { getUserRole } from "@sparcs-students/web/utils/getUserType";

import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProfileList from "@sparcs-students/web/common/components/Header/_atomic/ProfileList";

interface MyMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
}

const MyMenuWrapper = styled.div`
  display: inline-flex;
  padding: 16px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  position: absolute;
  top: 50px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 2px 4px ${({ theme }) => theme.colors.GRAY[100]};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const ProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const MyMenu: React.FC<MyMenuProps> = ({
  setIsMenuOpen,
  selectedToken,
  setSelectedToken,
}) => {
  const router = useRouter();

  const handleMyPageClick = () => {
    router.push("/my");
    setIsMenuOpen(false);
  };
  const { logout } = useAuth(); // TODO: log out logic
  const handleLogout = async () => {
    logout();
    setIsMenuOpen(false);
  };

  const t = useTranslations();

  const parsedToken = JSON.parse(localStorage.getItem("responseToken") || "{}");

  const profiles = Object.keys(parsedToken).map(type => ({
    profileType: getUserRole(type), // TODO: 권한 type 관리 어떻게 할 건지
    token: parsedToken[type],
  }));

  return (
    <MyMenuWrapper>
      <ProfileListWrapper>
        <ProfileList
          profiles={profiles}
          setIsMenuOpen={setIsMenuOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      </ProfileListWrapper>
      <Divider />
      <FlexWrapper direction="column" gap={12} style={{ width: "100%" }}>
        <Button
          type="default"
          onClick={handleMyPageClick}
          style={{ color: colors.WHITE }}
        >
          {t("마이페이지")}
        </Button>
        <Button
          type="reverse"
          onClick={handleLogout}
          style={{ color: colors.PRIMARY }}
        >
          {t("로그아웃")}
        </Button>
      </FlexWrapper>
    </MyMenuWrapper>
  );
};

export default MyMenu;
