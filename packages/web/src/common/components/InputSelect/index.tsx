import { useEffect, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import FormError from "../FormError";
import Label from "../FormLabel";

import NoOption from "./_atomic/NoOption";
import Dropdown from "./Dropdown";
import SelectOption from "./SelectOption";
import Icon from "../Icon";
import TableTextInput from "../Forms/TableTextInput";

export interface SelectItem {
  label: string;
  value: string;
  selectable?: boolean;
}

interface SelectProps {
  items: SelectItem[];
  label?: string;
  errorMessage?: string;
  noOptionMessage?: string;
  disabled?: boolean;
  value: string;
  onChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
  // placeholder?: string;
  isRequired?: boolean;
  onlyDropdown?: boolean;
  dropdownHeight?: number;
}

const SelectInner = styled.div`
  gap: 4px;
  position: relative;
  height: fit-content;
`;

// const disabledStyle = css`
//   background-color: ${({ theme }) => theme.colors.GRAY[100]};
//   border-color: ${({ theme }) => theme.colors.GRAY[200]};
//   color: ${({ theme }) => theme.colors.GRAY[400]};
//   pointer-events: none;
// `;

const StyledSelect = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  hasError?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};

  &:focus,
  &:hover:not(:focus) {
    border-color: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[400]};
  }
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

const Select = ({
  items,
  errorMessage = "",
  noOptionMessage = "항목이 존재하지 않습니다.",
  label = "",
  disabled = false,
  value,
  onChange = () => {},
  setErrorStatus = () => {},
  // placeholder = "항목을 선택해주세요",
  isRequired = true,
  onlyDropdown = false,
  dropdownHeight = undefined,
}: SelectProps) => {
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
      setIsOpen(!isOpen);
      setHasOpenedOnce(true);
    }
  };

  const handleOptionClick = (item: SelectItem) => {
    if (item.selectable || item.selectable === undefined) {
      onChange(item.value);
      setIsOpen(false);
    }
  };

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
              isOpen={isOpen}
            >
              <TableTextInput
                placeholder="사업명 선택 또는 입력"
                disabled={disabled}
                value={value}
                handleChange={onChange}
              />
              {!disabled &&
                (isOpen ? (
                  <IconWrapperUp onClick={handleSelectClick}>
                    <Icon type="arrow_back_ios_new" size={18} />
                  </IconWrapperUp>
                ) : (
                  <IconWrapperDown onClick={handleSelectClick}>
                    <Icon type="arrow_back_ios_new" size={18} />
                  </IconWrapperDown>
                ))}
            </StyledSelect>
          )}
          {isRequired && hasOpenedOnce && !value && items.length > 0
            ? (onlyDropdown || isOpen) && (
                <Dropdown
                  onlyDropdown={onlyDropdown}
                  marginTop={28}
                  height={dropdownHeight}
                >
                  {items.length > 0 ? (
                    items.map(item => (
                      <SelectOption
                        key={item.value as string}
                        selectable={
                          item.selectable || item.selectable === undefined
                        }
                        onClick={() => {
                          handleOptionClick(item);
                          onChange(item.label);
                        }}
                        selected={value === item.label}
                      >
                        {item.label}
                      </SelectOption>
                    ))
                  ) : (
                    <NoOption>{noOptionMessage}</NoOption>
                  )}
                </Dropdown>
              )
            : (onlyDropdown || isOpen) && (
                <Dropdown
                  onlyDropdown={onlyDropdown}
                  marginTop={14}
                  height={dropdownHeight}
                >
                  {items.length > 0 ? (
                    items.map(item => (
                      <SelectOption
                        key={item.value as string}
                        selectable={
                          item.selectable || item.selectable === undefined
                        }
                        onClick={() => {
                          handleOptionClick(item);
                          onChange(item.label);
                        }}
                        selected={value === item.label}
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
        {isRequired && hasOpenedOnce && !value && items.length > 0 && (
          <FormError>
            {errorMessage || "필수로 선택해야 하는 항목입니다"}
          </FormError>
        )}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
