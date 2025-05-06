"use client";

import React, { useEffect } from "react";
// import Link from "next/link"; // for dynamic link, use div instead of Link.
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

import Icon from "@sparcs-students/web/common/components/Icon";

import paths from "@sparcs-students/web/constants/paths";
import { useTranslations } from "next-intl";
import axios from "axios";
import MyMenu from "@sparcs-students/web/common/components/Header/_atomic/MyMenu";
import { StudentsJwtPayload } from "@sparcs-students/web/features/login/type/payload";

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
  const t = useTranslations();
  const [userName, setUserName] = React.useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [selectedToken, setSelectedToken] = React.useState<string>("");

  const handleLoginClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/auth/sign-in`, {
        withCredentials: true,
      });
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL returned from server.");
      }
    } catch (err) {
      console.error("Failed to get login URL:", err);
    }
  };

  useEffect(() => {
    // 로그인 되었다면, accessToken을 Decode 하여 내부 데이터를 가져옵니다.
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (token) {
      const decoded = jwtDecode<StudentsJwtPayload>(token);
      setIsLoggedIn(true);
      setSelectedToken(token);
      setUserName(decoded.name);
      console.log(decoded);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
    }
  }, [isLoggedIn, isMenuOpen]);

  return (
    <>
      {isLoggedIn ? (
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          {userName}
        </LoginInner>
      ) : (
        <LoginInner onClick={handleLoginClick}>
          <Icon type="person" size={16} />
          {t(paths.LOGIN.name)}
        </LoginInner>
      )}
      {isMenuOpen && (
        <MyMenu
          setIsMenuOpen={setIsMenuOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setUserName={setUserName}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
};

export default Login;
