import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import FormError from "@sparcs-students/web/common/components/FormError";

export interface SelectItem<T> {
  label: string;
  value: T;
  selectable: boolean;
}
interface SelectProps<T> {
  items: SelectItem<T>[];
  errorMessage?: string;
  disabled?: boolean;
  selectedValue?: T | T[];
  multi?: boolean; // 다중 선택 여부 추가
  onSelect?: (value: T | T[]) => void;
  setErrorStatus?: (hasError: boolean) => void;
}

const DropdownContainer = styled.div`
  gap: 4px;
  position: relative;
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  pointer-events: none;
`;

const StyledSelect = styled.div<{
  hasError?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
}>`
  width: 100%;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid
    ${({ theme, hasError, isOpen }) => {
      if (isOpen) return theme.colors.PRIMARY;
      return hasError ? theme.colors.RED[700] : theme.colors.GRAY[200];
    }};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  &:focus,
  &:hover:not(:focus) {
    border-color: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[100]};
  }
  ${({ disabled }) => disabled && disabledStyle}
`;

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 4px;
  z-index: 1000;
`;

const Option = styled.div<{ selectable?: boolean; isSelected?: boolean }>`
  gap: 10px;
  border-radius: 4px;
  padding: 4px 12px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme, selectable }) =>
    selectable ? theme.colors.BLACK : theme.colors.GRAY[100]};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.GREEN[100] : theme.colors.WHITE};
  ${({ selectable }) =>
    selectable &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.GRAY[200]};
      }
    `}
`;
const NoOption = styled.div`
  padding: 4px 12px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  text-align: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.GRAY[100]};
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
const SelectWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;
const SelectValue = styled.span<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.BLACK : theme.colors.GRAY[200]};
`;

const Select = <T,>({
  items,
  errorMessage = "",
  disabled = false,
  selectedValue = undefined,
  multi = false, // 기본값을 false로 설정
  onSelect = () => {},
  setErrorStatus = () => {},
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasError =
      (multi && Array.isArray(selectedValue) && selectedValue.length === 0) ||
      (!multi && !selectedValue && items.length > 0);
    setErrorStatus(!!errorMessage || hasError);
  }, [errorMessage, selectedValue, items.length, multi, setErrorStatus]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          if (items.length > 0 && !selectedValue) {
            setHasOpenedOnce(true);
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef, isOpen, items.length, selectedValue]);
  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setHasOpenedOnce(true);
    }
  };

  const handleOptionClick = (item: SelectItem<T>) => {
    if (item.selectable) {
      if (multi) {
        let newSelectedValue = Array.isArray(selectedValue)
          ? [...selectedValue]
          : [];
        if (newSelectedValue.includes(item.value)) {
          newSelectedValue = newSelectedValue.filter(val => val !== item.value);
        } else {
          newSelectedValue.push(item.value);
        }
        onSelect(newSelectedValue);
      } else {
        onSelect(item.value);
      }
    }
    if (!multi) {
      setIsOpen(false);
    }
  };

  let selectedLabel: string; // 'let'을 사용하여 변수를 선언합니다.

  if (multi) {
    if (Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedLabel = items
        .filter(item => selectedValue.includes(item.value))
        .map(item => item.label)
        .join(", ");
    } else {
      selectedLabel = "항목을 선택해주세요";
    }
  } else {
    const foundItem = items.find(item => item.value === selectedValue);
    selectedLabel = foundItem ? foundItem.label : "항목을 선택해주세요";
  }

  return (
    <SelectWrapper>
      <DropdownContainer ref={containerRef}>
        <StyledSelect
          hasError={
            hasOpenedOnce &&
            multi &&
            Array.isArray(selectedValue) &&
            selectedValue.length === 0 &&
            !isOpen
          }
          disabled={disabled}
          onClick={handleSelectClick}
          isOpen={isOpen}
        >
          <SelectValue
            isSelected={
              multi
                ? Array.isArray(selectedValue) && selectedValue?.length > 0
                : !!selectedValue
            }
          >
            {selectedLabel}
          </SelectValue>
          <IconWrapper>
            {isOpen ? (
              <KeyboardArrowUp style={{ fontSize: "20px" }} />
            ) : (
              <KeyboardArrowDown style={{ fontSize: "20px" }} />
            )}
          </IconWrapper>
        </StyledSelect>
        {isOpen && (
          <Dropdown>
            {items.length > 0 ? (
              items.map(item => (
                <Option
                  key={item.value as string}
                  selectable={item.selectable}
                  isSelected={
                    multi
                      ? Array.isArray(selectedValue) &&
                        selectedValue.includes(item.value)
                      : selectedValue === item.value
                  }
                  onClick={() => handleOptionClick(item)}
                >
                  {item.label}
                </Option>
              ))
            ) : (
              <NoOption>항목이 존재하지 않습니다</NoOption>
            )}
          </Dropdown>
        )}
      </DropdownContainer>
      {hasOpenedOnce &&
        multi &&
        Array.isArray(selectedValue) &&
        selectedValue.length === 0 && (
          <FormError>
            {errorMessage || "필수로 선택해야 하는 항목입니다"}
          </FormError>
        )}
    </SelectWrapper>
  );
};
export default Select;
