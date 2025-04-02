"use client";

import React, { useState } from "react";
import styled from "styled-components";

import Icon from "@sparcs-students/web/common/components/Icon";
import NavList from "@sparcs-students/web/common/components/NavTools/NavList";

import navPaths from "@sparcs-students/web/constants/nav";

import MobileNavMenu from "../NavTools/MobileNavMenu";
import Login from "./_atomic/Login";
import Logo from "./_atomic/Logo";

const IdentityBar = styled.div`
  position: relative;
  align-self: stretch;
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const NavInner = styled.div`
  position: relative;
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const NavLeftInner = styled.div`
  display: flex;
  height: 27px;
  align-items: center;
  width: fit-content;
  gap: 5px;
`;

const StyledNavList = styled(NavList)`
  display: flex;
  padding: 0px 30px;
  align-items: center;
  gap: 24px;
  width: fit-content;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const HeaderInner = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  padding-bottom: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
`;

const Menu = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: flex;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>();
  return (
    <HeaderInner>
      <IdentityBar />
      <NavInner>
        <NavLeftInner>
          <Logo />
          <StyledNavList highlight keys={navPaths.header} />
        </NavLeftInner>
        <Menu>
          <Icon
            type="menu"
            size={24}
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          />
        </Menu>
        {isMobileMenuVisible && (
          <MobileNavMenu
            keys={navPaths.header}
            onClose={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          />
        )}
        <Login />
      </NavInner>
    </HeaderInner>
  );
};

export default Header;
