"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
  const { isLoggedIn, login, profile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>("");
  const t = useTranslations();

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
      return;
    }
    const token = getLocalStorageItem("accessToken");
    if (token) setSelectedToken(token);
  }, [isLoggedIn]);

  // getUserType already returns Korean labels; do not pass through t("common....")
  // or next-intl will look up a key like "common.학생" and show the missing-key string.
  const rawTypeLabel = profile?.type ? getUserType(profile.type) : "";
  const typeLabel = rawTypeLabel === "None" ? "" : rawTypeLabel;

  return (
    <>
      {isLoggedIn ? (
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          {profile?.name ?? "User"}
          {typeLabel ? ` (${typeLabel})` : ""}
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
