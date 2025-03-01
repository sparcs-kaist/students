"use client";

import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";
import SectionTitle from "@sparcs-students/web/common/components/SectionTitle";
import Icon from "@sparcs-students/web/common/components/Icon";

const FoldableSectionOuter = styled.div`
  width: 100%;
  max-width: calc(100vw + (100% - 100vw));
`;

const FoldableSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const ChildrenOuter = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ margin?: string }>`
  margin-top: ${({ margin }) => margin};
  margin-left: 24px;
`;

const FoldableSectionTitle: React.FC<{
  iconType?: string;
  title: string;
  toggle?: boolean;
  toggleHandler?: () => void;
  children?: React.ReactNode;
  childrenMargin?: string;
}> = ({
  iconType = null,
  title,
  toggle = null,
  toggleHandler = null,
  children = null,
  childrenMargin = "40px",
}) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const openHandler = () => setOpen(!open);

  return (
    <FoldableSectionOuter>
      <FoldableSectionTitleInner>
        {iconType && <Icon type={iconType} size={16} color="white" />}
        <SectionTitle size="lg">{title}</SectionTitle>
        <TextButton
          text={toggle ?? open ? `접기` : `펼치기`}
          onClick={toggleHandler ?? openHandler}
        />
      </FoldableSectionTitleInner>
      {(toggle ?? open) && children && (
        <ChildrenOuter margin={childrenMargin}>{children}</ChildrenOuter>
      )}
    </FoldableSectionOuter>
  );
};

export default FoldableSectionTitle;
