"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import isPropValid from "@emotion/is-prop-valid";

import Typography from "@sparcs-students/web/common/components/Typography";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Icon from "@sparcs-students/web/common/components/Icon";
import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";

const CardWrapper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  flex-wrap: wrap;
`;

const RatioTile = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isFilled: boolean }>`
  height: 24px;
  display: flex;
  flex: 1;
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.GREEN[700] : theme.colors.WHITE};
`;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GREEN[700]};
  background-color: green;
  width: 100%;
`;

const StudentFeeCard = () => {
  const semester = 6;

  const router = useRouter();
  const handleClick = () => {
    router.push("/my/student-fee");
  };

  const tiles = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    isFilled: index < semester,
  }));

  return (
    <CardWrapper>
      <TitleWrapper>
        <FlexWrapper direction="row" gap={5} style={{ width: "auto" }}>
          <Typography
            fs={24}
            lh={30}
            fw="BOLD"
            color="BLACK"
            style={{ whiteSpace: "nowrap" }}
          >
            2025 봄 학생회비 <span style={{ color: "#00674B" }}>납부 완료</span>
          </Typography>
          <Icon type="check" size={30} color="#00674B" />
        </FlexWrapper>
        <Typography
          fs={20}
          lh={28}
          fw="REGULAR"
          style={{ whiteSpace: "nowrap" }}
        >{`${semester}학기/8학기`}</Typography>
      </TitleWrapper>
      <FlexWrapper
        direction="column"
        gap={20}
        style={{ alignItems: "flex-end" }}
      >
        <TileWrapper>
          {tiles.map(({ id, isFilled }) => (
            <RatioTile key={id} isFilled={isFilled} />
          ))}
        </TileWrapper>
        <TextButton text="자세히 보기" onClick={handleClick} />
      </FlexWrapper>
    </CardWrapper>
  );
};

export default StudentFeeCard;
