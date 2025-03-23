import { useEffect, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import FormError from "../FormError";
import Label from "../FormLabel";

import NoOption from "./_atomic/NoOption";
import Dropdown from "./Dropdown";
import SelectOption from "./SelectOption";
import Icon from "../Icon";

export interface SelectItem<T> {
  label: string;
  value: T;
  selectable?: boolean;
}

interface SelectProps<T> {
  items: SelectItem<T>[];
  label?: string;
  errorMessage?: string;
  noOptionMessage?: string;
  disabled?: boolean;
  value: T;
  onChange?: (value: T) => void;
  setErrorStatus?: (hasError: boolean) => void;
  placeholder?: string;
  isRequired?: boolean;
  onlyDropdown?: boolean;
  dropdownHeight?: number;
  insideTable?: boolean;
  insideTimeline?: boolean;
}

const SelectInner = styled.div`
  gap: 4px;
  position: relative;
  height: fit-content;
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  color: ${({ theme }) => theme.colors.GRAY[400]};
  pointer-events: none;
`;

const StyledSelect = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  hasError?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  insideTimeline?: boolean;
}>`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid
    ${({ theme, hasError, isOpen }) => {
      if (isOpen) return theme.colors.GREEN[300];
      return hasError ? theme.colors.RED[700] : theme.colors.GRAY[200];
    }};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};

  ${({ insideTimeline }) => insideTimeline && "padding: 8px 12px; gap: 8px;"}

  &:focus,
  &:hover:not(:focus) {
    border-color: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[400]};
  }

  ${({ disabled }) => disabled && disabledStyle}
`;

const IconWrapperDown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  transform: rotate(-90deg);
`;

const IconWrapperUp = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  transform: rotate(90deg);
`;

const SelectWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
`;

const SelectValue = styled.span.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isSelected: boolean; disabled: boolean; insideTimeline?: boolean }>`
  display: flex;
  width: 81px;
  height: ${({ insideTimeline }) => (insideTimeline ? "20px" : "24px")};
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme, isSelected, disabled }) => {
    if (disabled) {
      return theme.colors.GRAY[400];
    }
    if (isSelected) {
      return theme.colors.BLACK;
    }
    return theme.colors.GRAY[200];
  }};

  ${({ insideTimeline }) => insideTimeline && "flex: 1 0 0;"};
`;

const Select = <T,>({
  items,
  errorMessage = "",
  noOptionMessage = "항목이 존재하지 않습니다.",
  label = "",
  disabled = false,
  value,
  onChange = () => {},
  setErrorStatus = () => {},
  placeholder = "항목을 선택해주세요",
  isRequired = true,
  onlyDropdown = false,
  dropdownHeight = undefined,
  insideTable = false,
  insideTimeline = false,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErrorStatus(!!errorMessage || (value == null && items.length > 0));
  }, [errorMessage, value, items.length, setErrorStatus]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          if (items.length > 0 && value == null) {
            setHasOpenedOnce(true);
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef, isOpen, items.length, value]);

  const handleSelectClick = () => {
    if (!disabled) {
      const currentOpenState = !isOpen;
      setIsOpen(currentOpenState);

      // CHACHA: when closing the drop down and value is null, error message pops out
      if (!currentOpenState && value == null && items.length > 0) {
        setHasOpenedOnce(true);
      }
    }
  };

  const handleOptionClick = (item: SelectItem<T>) => {
    if (item.selectable || item.selectable === undefined) {
      onChange(item.value);
      setIsOpen(false);
    }
  };

  const selectedLabel =
    items.find(item => item.value === value)?.label || placeholder;

  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        <SelectInner ref={containerRef}>
          {!onlyDropdown && (
            <StyledSelect
              hasError={
                isRequired &&
                hasOpenedOnce &&
                !value &&
                items.length > 0 &&
                !isOpen
              }
              disabled={disabled}
              onClick={handleSelectClick}
              isOpen={isOpen}
              insideTimeline={insideTimeline}
            >
              <SelectValue
                isSelected={value != null && value !== ""}
                disabled={disabled}
                insideTimeline={insideTimeline}
              >
                {selectedLabel}
              </SelectValue>
              {isOpen ? (
                <IconWrapperUp>
                  <Icon type="arrow_back_ios_new" size={18} />
                </IconWrapperUp>
              ) : (
                <IconWrapperDown>
                  <Icon type="arrow_back_ios_new" size={18} />
                </IconWrapperDown>
              )}
            </StyledSelect>
          )}
          {(onlyDropdown || isOpen) && (
            <Dropdown
              onlyDropdown={onlyDropdown}
              insideTable={insideTable}
              marginTop={4}
              height={dropdownHeight}
            >
              {items.length > 0 ? (
                items.map(item => (
                  <SelectOption
                    key={item.value as string}
                    selectable={
                      item.selectable || item.selectable === undefined
                    }
                    onClick={() => handleOptionClick(item)}
                    selected={selectedLabel === item.label}
                  >
                    {item.label}
                  </SelectOption>
                ))
              ) : (
                <NoOption>{noOptionMessage}</NoOption>
              )}
            </Dropdown>
          )}
        </SelectInner>
        {!isOpen &&
          isRequired &&
          hasOpenedOnce &&
          !value &&
          items.length > 0 && (
            <FormError>
              {errorMessage || "필수로 선택해야 하는 항목입니다"}
            </FormError>
          )}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
