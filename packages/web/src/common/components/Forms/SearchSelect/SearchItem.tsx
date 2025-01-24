import React from "react";

import styled from "styled-components";

import Icon from "@sparcs-students/web/common/components/Icon";

import isPropValid from "@emotion/is-prop-valid";

interface SearchItemProps {
  selected: string;
  isSelected: boolean;
  children: string;
  onClick: (value: string) => void;
}

const RightContentWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  justify-content: center;
`;

const SearchItemWrapper = styled.div`
  display: flex;
  padding: 4px 12px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
  cursor: pointer;
  position: relative;
`;

const SearchItem: React.FC<SearchItemProps> = ({
  selected,
  isSelected,
  children,
  onClick,
}) => (
  <SearchItemWrapper
    onClick={() => (children !== selected ? onClick(children) : onClick(""))}
  >
    {children}
    {isSelected && (
      <RightContentWrapper>
        <Icon type="check" size={16} />
      </RightContentWrapper>
    )}
  </SearchItemWrapper>
);

export { SearchItem, RightContentWrapper };
