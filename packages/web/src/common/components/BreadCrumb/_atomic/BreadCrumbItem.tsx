import isPropValid from "@emotion/is-prop-valid";
import Typography from "@sparcs-students/web/common/components/Typography";
import React from "react";
import styled from "styled-components";

interface BreadCrumbItemProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isLastChild?: boolean;
}

const BreadCrumbInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLastChild: boolean; disabled: boolean }>`
  color: ${({ theme, isLastChild }) =>
    isLastChild ? theme.colors.PRIMARY : theme.colors.GRAY[400]};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  text,
  onClick = () => {},
  disabled = false,
  isLastChild = false,
}) => (
  <BreadCrumbInner disabled={disabled} isLastChild={isLastChild}>
    <Typography
      fs={20}
      lh={20}
      fw="REGULAR"
      onClick={!disabled ? onClick : undefined}
    >
      {text}
    </Typography>
  </BreadCrumbInner>
);

export default BreadCrumbItem;
