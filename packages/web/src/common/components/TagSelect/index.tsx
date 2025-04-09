import { useEffect, useMemo, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import FormError from "../FormError";
import Label from "../FormLabel";

import NoOption from "./_atomic/NoOption";
import Dropdown from "./Dropdown";
import SelectOption from "./SelectOption";
import Icon from "../Icon";
import LightTag, { LightTagColor } from "../Tag/LightTag";

export interface TagSelectItem<T> {
  label: string;
  value: T;
  selectable?: boolean;
  color: LightTagColor | DarkTagColor;
}

interface TagSelectProps<T> {
  items: TagSelectItem<T>[];
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
  width?: string;
  isLight?: boolean;
}

const SelectInner = styled.div`
  gap: 4px;
  position: relative;
  height: 24px;
  overflow-y: visible;
`;

const StyledSelect = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  hasError?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
}>`
  display: flex;
  /* padding: 8px 16px; */
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
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
  overflow-y: visible;
`;

const SelectValue = styled.span.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isSelected: boolean; disabled: boolean; width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? "81px"};
  height: 24px;
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
`;

const TagSelect = <T,>({
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
  width = undefined,
  isLight = true,
}: TagSelectProps<T>) => {
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

  const handleOptionClick = (item: TagSelectItem<T>) => {
    if (item.selectable || item.selectable === undefined) {
      onChange(item.value);
      setIsOpen(false);
    }
  };

  const selectedLabel =
    items.find(item => item.value === value)?.label || placeholder;

  const selectedItem = useMemo(
    () => items.find(item => item.value === value),
    [value],
  );

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
            >
              {isLight ? (
                <SelectValue
                  isSelected={value != null && value !== ""}
                  disabled={disabled}
                  width={width}
                >
                  {" "}
                  {selectedItem ? (
                    <LightTag
                      width="100%"
                      color={selectedItem?.color as LightTagColor}
                    >
                      {selectedItem?.label}
                    </LightTag>
                  ) : (
                    <LightTag width="100%" color="GRAY">
                      -
                    </LightTag>
                  )}
                </SelectValue>
              ) : (
                <SelectValue
                  isSelected={value != null && value !== ""}
                  disabled={disabled}
                  width={width}
                >
                  {" "}
                  {selectedItem ? (
                    <DarkTag
                      width="100%"
                      color={selectedItem?.color as DarkTagColor}
                    >
                      {selectedItem?.label}
                    </DarkTag>
                  ) : (
                    <LightTag width="100%" color="GRAY">
                      -
                    </LightTag>
                  )}
                </SelectValue>
              )}

              {!disabled &&
                (isOpen ? (
                  <IconWrapperUp>
                    <Icon type="arrow_back_ios_new" size={18} />
                  </IconWrapperUp>
                ) : (
                  <IconWrapperDown>
                    <Icon type="arrow_back_ios_new" size={18} />
                  </IconWrapperDown>
                ))}
            </StyledSelect>
          )}
          {(onlyDropdown || isOpen) && (
            <Dropdown
              onlyDropdown={onlyDropdown}
              insideTable
              marginTop={12}
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
                    {isLight ? (
                      <LightTag
                        width="100%"
                        color={item.color as LightTagColor}
                      >
                        {item.label}
                      </LightTag>
                    ) : (
                      <DarkTag width="100%" color={item.color as DarkTagColor}>
                        {item.label}
                      </DarkTag>
                    )}
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

export default TagSelect;
