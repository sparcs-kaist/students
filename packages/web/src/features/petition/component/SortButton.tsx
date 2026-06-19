import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "@sparcs-students/web/common/components/Icon";
import colors from "@sparcs-students/web/styles/themes/colors";
import Typography from "@sparcs-students/web/common/components/Typography";

interface SortButtonProps {
  isNewest: boolean;
  setIsNewest: (isNewst: boolean) => void;
}

const SortButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.button`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GREEN[700]};
  padding: 6px 16px;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Choice = styled.button<{ selected: boolean }>`
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.GREEN[100] : theme.colors.WHITE};
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: 5;
`;

const SortButton = ({ isNewest, setIsNewest }: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SortButtonWrapper>
      <ButtonWrapper
        onClick={() => {
          setIsOpen(io => !io);
        }}
      >
        <Icon type="sort" size={24} color={colors.PRIMARY} />
      </ButtonWrapper>
      {isOpen && (
        <Dropdown ref={dropdownRef}>
          <Choice
            selected={isNewest}
            onClick={() => {
              setIsOpen(false);
              setIsNewest(true);
            }}
          >
            <Typography fs={16} lh={20} color="BLACK" fw="REGULAR">
              최신순
            </Typography>
          </Choice>
          <Choice
            selected={!isNewest}
            onClick={() => {
              setIsOpen(false);
              setIsNewest(false);
            }}
          >
            <Typography fs={16} lh={20} color="BLACK" fw="REGULAR">
              추천순
            </Typography>
          </Choice>
        </Dropdown>
      )}
    </SortButtonWrapper>
  );
};

export default SortButton;
