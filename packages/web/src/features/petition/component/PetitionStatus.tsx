import styled from "styled-components";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  PetitionStatusEnum,
  getPetitionStatusEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/petition.enum";
import colors from "@sparcs-students/web/styles/themes/colors";

interface PetitionStatusProps {
  status: PetitionStatusEnum;
}

const getPetitionStatusColor = (type: PetitionStatusEnum | undefined) => {
  switch (type) {
    case PetitionStatusEnum.Progress:
      return colors.MELON[700];
    case PetitionStatusEnum.Expired:
      return colors.MAROON[700];
    case PetitionStatusEnum.Waiting:
      return colors.LEMON[700];
    case PetitionStatusEnum.Responded:
      return colors.CYAN[700];
    default:
      return colors.BLACK;
  }
};

const getPetitionStatusBackgroundColor = (
  type: PetitionStatusEnum | undefined,
) => {
  switch (type) {
    case PetitionStatusEnum.Progress:
      return colors.MELON[300];
    case PetitionStatusEnum.Expired:
      return colors.MAROON[300];
    case PetitionStatusEnum.Waiting:
      return colors.LEMON[300];
    case PetitionStatusEnum.Responded:
      return colors.CYAN[300];
    default:
      return colors.WHITE;
  }
};

const StatusWrapper = styled.div<PetitionStatusProps>`
  color: ${({ status }) => getPetitionStatusColor(status)};
  background-color: ${({ status }) => getPetitionStatusBackgroundColor(status)};
  border-radius: 4px;
  height: 24px;
  width: 96px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PetitionStatus = ({ status }: PetitionStatusProps) => (
  <StatusWrapper status={status}>
    <Typography fs={14} lh={14}>
      {getPetitionStatusEnum(status)}
    </Typography>
  </StatusWrapper>
);

export default PetitionStatus;
