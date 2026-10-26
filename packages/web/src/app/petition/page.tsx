"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import colors from "@sparcs-students/web/styles/themes/colors";
import styled from "styled-components";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

import { mockPetitionData } from "@sparcs-students/web/features/petition/_mock/mockPetitionData";

import MyPetitionButton from "@sparcs-students/web/features/petition/component/MyPetitionButton";
import PetitionButton from "@sparcs-students/web/features/petition/component/PetitionButton";
import PetitionSearchBar from "@sparcs-students/web/features/petition/component/PetitionSearchBar";
import PetitionTable from "@sparcs-students/web/features/petition/component/PetitionTable";

const ButtonsSectionwrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 32px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const StyledSpan = styled.span`
  color: ${colors.PRIMARY};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const Petition = () => {
  const [petitionSearch, setPetitionSearch] = useState("");

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>학생 청원</PageTitle>
        <BreadCrumb items={[{ name: "학생 청원", path: "/petition" }]} />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={60} style={{ padding: "0px 20px" }}>
        <FlexWrapper direction="column" gap={28}>
          <ButtonsSectionwrapper>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              KAIST 4천 학우의 목소리를 <StyledSpan>학부 총학생회</StyledSpan>에
              들려주세요!
              <br />
              <StyledSpan>50인 이상 동의</StyledSpan> 시, 빠른 시일 내에
              답변해드립니다.
            </Typography>
            <ButtonsWrapper>
              <PetitionButton />
              <MyPetitionButton />
            </ButtonsWrapper>
          </ButtonsSectionwrapper>
          <FlexWrapper direction="row" gap={12}>
            <PetitionSearchBar
              searchText={petitionSearch}
              handleChange={setPetitionSearch}
            />
            <Button
              buttonText="검색"
              style={{
                padding: "8px 16px",
                fontSize: "16px",
                lineHeight: "20px",
                height: "36px",
              }}
              onClick={() => {
                // TODO: 검색 기능 구현
              }}
            />
          </FlexWrapper>
        </FlexWrapper>
        <PetitionTable data={mockPetitionData} />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Petition;
