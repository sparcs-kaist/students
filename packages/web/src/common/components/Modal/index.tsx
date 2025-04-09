import React, { FC, useRef } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  width?: "fit-content" | "full" | string;
}

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px 32px 32px;
  border-radius: 8px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  gap: 32px;

  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ModalContainer = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ width: "fit-content" | "full" | string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 90%;

  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.round.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  width: ${({ width, theme }) =>
    width === "full" ? theme.responsive.CONTENT.xxl : width};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    max-width: ${({ theme }) => theme.responsive.CONTENT.xl};
    width: ${({ width, theme }) =>
      width === "full" ? theme.responsive.CONTENT.xl : width};
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    max-width: ${({ theme }) => theme.responsive.CONTENT.lg};
    width: ${({ width, theme }) =>
      width === "full" ? theme.responsive.CONTENT.lg : width};
  }
`;

const ModalScrollContainer = styled.div`
  width: inherit;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;

  padding: 32px;
`;

const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  isOpen = false,
  onClose = () => {},
  children = <div />,
  width = "fit-content",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    isOpen && (
      <ModalBackground
        ref={ref}
        onClick={e => {
          if (e.target !== ref.current) {
            return;
          }
          onClose();
        }}
      >
        <ModalContainer width={width}>
          <ModalScrollContainer>{children}</ModalScrollContainer>
        </ModalContainer>
      </ModalBackground>
    )
  );
};

export default Modal;
