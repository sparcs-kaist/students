import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import styled from "styled-components";

import colors from "@sparcs-students/web/styles/themes/colors";

import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProfileList from "@sparcs-students/web/common/components/Header/_atomic/ProfileList";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { StudentsJwtPayload } from "@sparcs-students/web/features/login/type/payload";
// import ProfileList from "./_atomic/ProfileList";

interface MyMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
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
  setIsLoggedIn,
  setUserName,
  isLoggedIn,
}) => {
  const router = useRouter();
  const [profiles, setProfiles] = React.useState<
    { profileType: string; token: string }[]
  >([]);

  const handleMyPageClick = () => {
    router.push("/my");
    setIsMenuOpen(false);
  };
  // const { logout } = useAuth(); // TODO: log out logic
  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:8000/auth/sign-out`, null, {
        withCredentials: true,
      });

      setSelectedToken("");
      setProfiles([]);
      setUserName(null);
      setIsLoggedIn(false);
      setIsMenuOpen(false);
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const t = useTranslations();

  useEffect(() => {
    // 로그인 되었다면, accessToken을 Decode 하여 내부 데이터를 가져옵니다.
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (token) {
      setIsLoggedIn(true);
      setSelectedToken(token);
      const decoded = jwtDecode<StudentsJwtPayload>(token);
      setUserName(decoded.name);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setProfiles([]);
      return;
    }

    setProfiles([
      { profileType: "학부생", token: selectedToken },
      { profileType: "전산학부 학생회 대표자", token: selectedToken },
      { profileType: "SPARCS 회원", token: selectedToken },
    ]);
  }, [isLoggedIn, setIsLoggedIn]);

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
