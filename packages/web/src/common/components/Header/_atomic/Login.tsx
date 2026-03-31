"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { useTranslations } from "next-intl";

import Icon from "@sparcs-students/web/common/components/Icon";
import { useAuth } from "@sparcs-students/web/common/providers/AuthContext";

import { getLocalStorageItem } from "@sparcs-students/web/utils/localStorage";
import { getUserType } from "@sparcs-students/web/utils/getUserType";
import MyMenu from "./MyMenu";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [type, setType] = useState("");
  const [selectedToken, setSelectedToken] = useState<string>("");
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
          {userName} ({t(`common.${getUserType(type)}`)})
        </LoginInner>
      ) : (
        <LoginInner onClick={login}>
          <Icon type="login" size={16} />
          {t("로그인")}
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
