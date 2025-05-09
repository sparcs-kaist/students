"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

import Icon from "@sparcs-students/web/common/components/Icon";

import paths from "@sparcs-students/web/constants/paths";
import { useTranslations } from "next-intl";
import MyMenu from "@sparcs-students/web/common/components/Header/_atomic/MyMenu";
import { useAuth } from "@sparcs-students/web/common/providers/AuthContext";
import { getLocalStorageItem } from "@sparcs-students/web/utils/localStorage";

const LoginInner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: fit-content;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string | null>(null);
  const [type, setType] = useState(""); // TODO: 어떤 단체의 어떤 직무인지
  const [selectedToken, setSelectedToken] = React.useState<string>("");
  const t = useTranslations();

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
    } else {
      const token = getLocalStorageItem("accessToken");
      if (token) {
        setSelectedToken(token);
        const decoded: { name?: string; type?: string } = jwtDecode(token);
        setUserName(decoded.name || "Unknown User");
        setType(decoded.type || "Unknown Type");
      }
    }
  }, [isLoggedIn, selectedToken]);

  return (
    <>
      {isLoggedIn ? (
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          {userName} {type}
        </LoginInner>
      ) : (
        <LoginInner onClick={login}>
          <Icon type="login" size={16} />
          {t(paths.LOGIN.name)}
        </LoginInner>
      )}
      {isMenuOpen && (
        <MyMenu
          setIsMenuOpen={setIsMenuOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      )}
    </>
  );
};

export default Login;
