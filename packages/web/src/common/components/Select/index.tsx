import { useEffect, useMemo, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import FormError from "../FormError";
import Label from "../FormLabel";

import NoOption from "./_atomic/NoOption";
// import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// import Label from "../Forms/_atomic/Label";
// import ErrorMessage from "../Forms/_atomic/ErrorMessage";
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
  selectedValue?: T | T[];
  multi?: boolean;
  onSelect?: (value: T | T[]) => void;
  value: T;
  setErrorStatus?: (hasError: boolean) => void;
  placeholder?: string;
  isRequired?: boolean;
  onlyDropdown?: boolean;
  dropdownHeight?: number;
  insideTable?: boolean;
  insideTimeline?: boolean;
}

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
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 36px;
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

const IconWrapperUp = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  transform: rotate(90deg);
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

const SelectWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const SelectValue = styled.span.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ disabled: boolean; insideTimeline?: boolean; isSelected: boolean }>`
  display: flex;
  width: fit-content;
  height: ${({ insideTimeline }) => (insideTimeline ? "20px" : "24px")};
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme, disabled, isSelected }) => {
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

const SelectInner = styled.div`
  gap: 4px;
  position: relative;
  height: fit-content;
`;

const Select = <T,>({
  items,
  errorMessage = "",
  noOptionMessage = "항목이 존재하지 않습니다.",
  label = "",
  disabled = false,
  value,
  // onChange = () => {},
  selectedValue = undefined,
  multi = false, // 기본값을 false로 설정
  onSelect = () => {},
  setErrorStatus = () => {},
  placeholder = "항목을 선택해주세요.",
  isRequired = true,
  onlyDropdown = false,
  dropdownHeight = undefined,
  insideTable = false,
  insideTimeline = false,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(
    multi,
    Array.isArray(selectedValue),
    selectedValue,
    isRequired,
    hasOpenedOnce,
    items.length,
    isOpen,
  );

  const hasError = useMemo(
    () =>
      isRequired &&
      hasOpenedOnce &&
      ((multi && Array.isArray(selectedValue) && selectedValue.length === 0) ||
        (!multi &&
          (selectedValue === null ||
            selectedValue === undefined ||
            selectedValue === ""))) &&
      items.length > 0 &&
      !isOpen,
    [selectedValue, items.length, multi, setErrorStatus, isOpen],
  );

  useEffect(() => {
    setErrorStatus(!!errorMessage || hasError);
  }, [
    errorMessage,
    selectedValue,
    items.length,
    multi,
    setErrorStatus,
    hasError,
  ]);

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
          if (
            items.length > 0 &&
            (!selectedValue ||
              (Array.isArray(selectedValue) && selectedValue.length === 0))
          ) {
            setHasOpenedOnce(true);
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef, isOpen, items.length, selectedValue, value]);

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

  let selectedLabel: string;

  if (multi) {
    if (Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedLabel = items
        .filter(item => selectedValue.includes(item.value))
        .map(item => item.label)
        .join(", ");
    } else {
      selectedLabel = placeholder;
    }
  } else {
    const foundItem = items.find(item => item.value === selectedValue);
    selectedLabel = foundItem ? foundItem.label : placeholder;
  }

  const isSelected = useMemo(
    () => hasOpenedOnce && !hasError,
    [selectedValue, isOpen, hasError],
  );

  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        <SelectInner ref={containerRef}>
          {!onlyDropdown && (
            <StyledSelect
              hasError={hasError}
              disabled={disabled}
              onClick={handleSelectClick}
              isOpen={isOpen}
              insideTimeline={insideTimeline}
            >
              <SelectValue
                disabled={disabled}
                insideTimeline={insideTimeline}
                isSelected={isSelected}
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
              disabled={disabled}
            >
              {items.length > 0 ? (
                items.map(item => (
                  <SelectOption
                    key={item.value as string}
                    selectable={
                      item.selectable || item.selectable === undefined
                    }
                    selected={
                      multi
                        ? Array.isArray(selectedValue) &&
                          selectedValue.includes(item.value)
                        : selectedValue === item.value
                    }
                    onClick={() => handleOptionClick(item)}
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
        {hasError && (
          <FormError>
            {errorMessage || "필수로 선택해야 하는 항목입니다."}
          </FormError>
        )}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
