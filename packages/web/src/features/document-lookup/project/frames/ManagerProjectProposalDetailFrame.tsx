"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Index from "@sparcs-students/web/common/components/Index";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  mapTimelineIdsToObjects,
  mockProjectProposalDetailTotalReview,
  ProjectProposalSingleContent,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalTable"; // TODO: API 호출로 받아오는 데이터
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FormValues } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import {
  mockDBExpenditureData,
  mockManagerProjectNameCandidateList,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import ProjectTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/ProjectTimelineTable";
import { TimelineDateTypeEnum } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import TimeLineDateInput from "@sparcs-students/web/features/document-lookup/project/components/_atomic/TimelineDateInput";
import {
  mockTeamList,
  mockTeamStructure,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockTeamManager";
import TwoSelect from "@sparcs-students/web/common/components/Selects/TwoSelect";
import ManagerExpenditureTableInProjectDetail from "@sparcs-students/web/features/document-lookup/budget/components/ManagerExpenditureTableInProjectDetail";
import { DBExpenditureProps } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import ManagerProjectProposalReviewTable from "@sparcs-students/web/features/document-lookup/project/components/ManagerProjectProposalReviewTable";

const headerHeight = 70;

interface ManagerProjectProposalDetailFrameProps {
  setProjectTitle: (title: string) => void;
}

const ScrollAbleArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
  gap: 60px;
  justify-content: space-between;
  overflow: visible;
`;
const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 100%;
  overflow-x: scroll;
`;

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const TextAndInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

const ManagerProjectProposalDetailFrame: React.FC<
  ManagerProjectProposalDetailFrameProps
> = ({ setProjectTitle }) => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentPurpose = useRef<HTMLDivElement>(null);
  const documentTarget = useRef<HTMLDivElement>(null);
  const documentDetail = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const documentReview = useRef<HTMLDivElement>(null);
  const documentExpenditure = useRef<HTMLDivElement>(null);

  const { detailId } = useParams(); // resultId 언젠간 쓸 것.
  const formMethods = useForm<FormValues>({
    defaultValues: {
      proposalDetail: {
        ...ProjectProposalSingleContent[parseInt(detailId as string)],
      },
      expenditures: mockDBExpenditureData,
    },
  });
  const { control, setValue, getValues } = formMethods;

  const proposalDetail = useWatch({
    control,
    name: "proposalDetail",
  });

  useEffect(() => {
    if (proposalDetail?.title) {
      setProjectTitle(proposalDetail.title);
    }
  }, [proposalDetail?.title, setProjectTitle]);

  const indexContents = [
    { name: "사업명, 사업개요", reference: documentTitle },
    { name: "사업 준비기간, 사업일시", reference: documentPeriod },
    { name: "담당부서 / 담당자", reference: manager },
    { name: "사업 추진 목적", reference: documentPurpose },
    { name: "사업 추진 대상자", reference: documentTarget },
    { name: "사업 세부 내용", reference: documentDetail },
    { name: "사업 진행 타임라인", reference: documentTimeline },
    { name: "사업 계획서 검토 내역", reference: documentReview },
    { name: "사업 예산안", reference: documentExpenditure },
  ];

  const [resetKey, setResetKey] = useState(0); // 실시간 edit 렌더링 시 필요!

  const [dirtyExpenditures, setDirtyExpenditures] = useState<{
    updatedRows: DBExpenditureProps[];
    createdRows: DBExpenditureProps[];
    deletedRows: DBExpenditureProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들
    console.log("제출된 사업계획서 상세 내용", proposalDetail);
    console.log("제출된 예산안 변경 내역", dirtyExpenditures);
  };

  const handleResetAll = () => {
    setResetKey(prev => prev + 1); // CHACHA: re-render
    formMethods.reset({
      proposalDetail: {
        ...ProjectProposalSingleContent[parseInt(detailId as string)],
      },
      expenditures: mockDBExpenditureData,
    });
  };

  const openSaveModal = () => {
    // TODO: add save logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent
          onConfirm={() => {
            handleSubmitAll();
            close();
          }}
        >
          저장되었습니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const openDiscardModal = () => {
    // TODO: add discard logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => {
            handleResetAll();
            close();
          }}
          onClose={() => close()}
        >
          수정 내역을{"\n"}모두 삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <ScrollAbleArea key={resetKey}>
      <ContentsArea>
        <FormProvider {...formMethods}>
          <FlexWrapper direction="row" gap={60} ref={documentTitle}>
            <Controller
              name="proposalDetail.title"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업명
                  </Typography>
                  <TextInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
            <Controller
              name="proposalDetail.brief"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업 개요
                  </Typography>
                  <TextInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentPeriod}>
            <Controller
              name="proposalDetail.preparationPeriod"
              control={control}
              render={({ field }) => {
                const currentValue: [Date | null, Date | null] = field.value
                  ?.value ?? [null, null];
                const currentType: TimelineDateTypeEnum | undefined =
                  field.value?.type;

                return (
                  <TextAndInputWrapper>
                    <Typography fs={24} lh={30} fw="BOLD">
                      사업 준비 기간
                    </Typography>
                    <TimeLineDateInput
                      dateValue={currentValue}
                      dateType={currentType}
                      onValueChange={newVal => {
                        field.onChange({
                          ...field.value,
                          value: newVal,
                        });
                      }}
                      onTypeChange={newType => {
                        field.onChange({
                          ...field.value,
                          type: newType,
                        });
                      }}
                      typeItems={[
                        { label: "분기", value: TimelineDateTypeEnum.Half },
                        {
                          label: "분기(상시)",
                          value: TimelineDateTypeEnum.HalfAlways,
                        },
                        {
                          label: "연도, 월",
                          value: TimelineDateTypeEnum.Month,
                        },
                        {
                          label: "연도, 월, 일",
                          value: TimelineDateTypeEnum.Date,
                        },
                      ]}
                    />
                  </TextAndInputWrapper>
                );
              }}
            />

            <Controller
              name="proposalDetail.executionPeriod"
              control={control}
              render={({ field }) => {
                const currentValue: [Date | null, Date | null] = field.value
                  ?.value ?? [null, null];
                const currentType: TimelineDateTypeEnum | undefined =
                  field.value?.type;

                return (
                  <TextAndInputWrapper>
                    <Typography fs={24} lh={30} fw="BOLD">
                      사업 일시
                    </Typography>
                    <TimeLineDateInput
                      dateValue={currentValue}
                      dateType={currentType}
                      onValueChange={newVal => {
                        field.onChange({
                          ...field.value,
                          value: newVal,
                        });
                      }}
                      onTypeChange={newType => {
                        field.onChange({
                          ...field.value,
                          type: newType,
                        });
                      }}
                      typeItems={[
                        { label: "분기", value: TimelineDateTypeEnum.Half },
                        {
                          label: "분기(상시)",
                          value: TimelineDateTypeEnum.HalfAlways,
                        },
                        {
                          label: "연도, 월",
                          value: TimelineDateTypeEnum.Month,
                        },
                        {
                          label: "연도, 월, 일",
                          value: TimelineDateTypeEnum.Date,
                        },
                      ]}
                    />
                  </TextAndInputWrapper>
                );
              }}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={manager}>
            <Controller
              name="proposalDetail.manager"
              control={control}
              render={({ field }) => {
                const currentValue = field.value;

                return (
                  <TextAndInputWrapper>
                    <Typography fs={24} lh={30} fw="BOLD">
                      담당 부서 / 담당자
                    </Typography>
                    <TwoSelect
                      leftItems={mockTeamList.map(team => ({
                        label: team.name,
                        value: team.teamId,
                      }))}
                      rightItems={mockTeamStructure.map(team => ({
                        teamId: team.teamId,
                        members: team.members.map(member => ({
                          label: member.name,
                          value: member.userId,
                        })),
                      }))}
                      value={{
                        teamId: currentValue?.teamId ?? null,
                        memberId: currentValue?.member ?? null,
                      }}
                      onChange={selected => {
                        field.onChange({
                          teamId: selected.teamId,
                          member: selected.memberId,
                        });
                      }}
                    />
                  </TextAndInputWrapper>
                );
              }}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentPurpose}>
            <Controller
              name="proposalDetail.purpose"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업 추진 목적
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentTarget}>
            <Controller
              name="proposalDetail.beneficiary"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업 수혜 대상자
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentDetail}>
            <Controller
              name="proposalDetail.detail"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    세부 사업 내용
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper
            direction="row"
            gap={60}
            ref={documentTimeline}
            style={{ flexDirection: "column", gap: "12px" }}
          >
            <ProjectTimelineTable
              initialData={mapTimelineIdsToObjects(
                proposalDetail?.timelineIds ?? [],
              )}
              isProposal
            />
          </FlexWrapper>
        </FormProvider>
        <FlexWrapper direction="row" gap={0} ref={documentReview}>
          <TextAndInputWrapper>
            <Typography fs={24} lh={30} fw="BOLD">
              사업 계획서 검토 내역
            </Typography>
            <ManagerProjectProposalReviewTable
              data={mockProjectProposalDetailTotalReview.filter(
                e =>
                  e.projectProposalContentId === parseInt(detailId as string),
              )}
            />
          </TextAndInputWrapper>
        </FlexWrapper>

        <FlexWrapper direction="row" gap={0} ref={documentExpenditure}>
          <ManagerExpenditureTableInProjectDetail
            headerTitle="사업 예산안"
            projectNameCandidate={mockManagerProjectNameCandidateList}
            isProposal
            initialData={mockDBExpenditureData.filter(
              e => e.projectName === getValues("proposalDetail.title"),
            )}
            isInsideDetailFrame
            projectTitleFromDetailFrame={proposalDetail.title}
            onValuesChange={updatedExpenditures => {
              setValue("expenditures", updatedExpenditures);
            }}
            onDiffExtract={setDirtyExpenditures}
          />
        </FlexWrapper>
        <ButtonWrapper>
          <Button
            type="reverse"
            onClick={openDiscardModal}
            style={{ width: "100px", padding: "8px 16px" }}
          >
            삭제
          </Button>
          <Button
            onClick={openSaveModal}
            style={{ width: "100px", padding: "8px 16px" }}
          >
            제출
          </Button>
        </ButtonWrapper>
      </ContentsArea>
      <Index
        title="목차"
        contents={indexContents}
        headerHeight={headerHeight}
      />
    </ScrollAbleArea>
  );
};

export default ManagerProjectProposalDetailFrame;
