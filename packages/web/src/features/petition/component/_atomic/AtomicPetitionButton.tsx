import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";

interface AtomicPetitionButtonProps {
  icon: React.ReactNode;
  color: string;
  text: string;
  onClick: () => void;
}

const ButtonWrapper = styled.button<{ color: string }>`
  border-radius: 4px;
  background-color: ${({ color }) => color};
  padding: 12px 20px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AtomicPetitionButton = ({
  icon,
  color,
  text,
  onClick,
}: AtomicPetitionButtonProps) => (
  <ButtonWrapper color={color} onClick={onClick}>
    {icon}
    <Typography fs={16} lh={20} color="WHITE" fw="SEMIBOLD">
      {text}
    </Typography>
  </ButtonWrapper>
);

export default AtomicPetitionButton;
