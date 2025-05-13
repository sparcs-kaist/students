import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { ReportFormValues } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { mapTimelineIdsToObjects } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalTable";
import {
  mockDBExpenditureData,
  mockManagerProjectNameCandidateList,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { DBExpenditureProps } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import { TimelineDateTypeEnum } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import TimeLineDateInput from "@sparcs-students/web/features/document-lookup/project/components/_atomic/TimelineDateInput";
import TwoSelect from "@sparcs-students/web/common/components/Selects/TwoSelect";
import {
  mockTeamList,
  mockTeamStructure,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockTeamManager";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import ProjectTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/ProjectTimelineTable";
import ManagerExpenditureTableInProjectDetail from "@sparcs-students/web/features/document-lookup/budget/components/ManagerExpenditureTableInProjectDetail";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Index from "@sparcs-students/web/common/components/Index";
import { ManagerProjectDetailFrameProps } from "@sparcs-students/web/features/document-lookup/project/frames/ManagerProjectProposalDetailFrame";
import {
  mockProjectReportDetailTotalReview,
  ProjectReportSingleContent,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportTable";
import styled from "styled-components";
import ManagerProjectReportReviewTable from "../components/ManagerProjectReportReviewTable";

const headerHeight = 70;

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

const ManagerProjectReportDetailFrame: React.FC<
  ManagerProjectDetailFrameProps
> = ({ setProjectTitle }) => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentDetail = useRef<HTMLDivElement>(null);
  const documentParticipation = useRef<HTMLDivElement>(null);
  const documentResult = useRef<HTMLDivElement>(null);
  const documentTodo = useRef<HTMLDivElement>(null);
  const documentComment = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const documentReview = useRef<HTMLDivElement>(null);
  const documentExpenditure = useRef<HTMLDivElement>(null);

  const { detailId } = useParams();
  const formMethods = useForm<ReportFormValues>({
    defaultValues: {
      reportDetail: {
        ...ProjectReportSingleContent[parseInt(detailId as string)],
      },
      expenditures: mockDBExpenditureData,
    },
  });
  const { control, setValue, getValues } = formMethods;

  const reportDetail = useWatch({
    control,
    name: "reportDetail",
  });

  useEffect(() => {
    if (reportDetail?.title) {
      setProjectTitle(reportDetail.title);
    }
  }, [reportDetail?.title, setProjectTitle]);

  const indexContents = [
    { name: "사업명, 사업개요", reference: documentTitle },
    { name: "사업 준비기간, 사업일시", reference: documentPeriod },
    { name: "담당부서 / 담당자", reference: manager },
    { name: "세부 사업 내용", reference: documentDetail },
    { name: "사업 참여도", reference: documentParticipation },
    { name: "사업 성과", reference: documentResult },
    { name: "미달 목표", reference: documentTodo },
    { name: "제언", reference: documentComment },
    { name: "사업 진행 타임라인", reference: documentTimeline },
    { name: "사업 보고서 검토 내역", reference: documentReview },
    { name: "사업 결산안", reference: documentExpenditure },
  ];

  const [resetKey, setResetKey] = useState(0); // 실시간 edit 렌더링 시 필요!

  const [dirtyExpenditures, setDirtyExpenditures] = useState<{
    updatedRows: DBExpenditureProps[];
    createdRows: DBExpenditureProps[];
    deletedRows: DBExpenditureProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });

  const handleSubmitAll = () => {
    console.log("제출보고서 상세 내용", reportDetail);
    console.log("결산 예산안 변경 내역", dirtyExpenditures);
  };

  const handleResetAll = () => {
    setResetKey(prev => prev + 1); // CHACHA: re-render
    formMethods.reset({
      reportDetail: {
        ...ProjectReportSingleContent[parseInt(detailId as string)],
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
              name="reportDetail.title"
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
              name="reportDetail.brief"
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
              name="reportDetail.preparationPeriod"
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
              name="reportDetail.executionPeriod"
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
              name="reportDetail.manager"
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
          <FlexWrapper direction="row" gap={60} ref={documentParticipation}>
            <Controller
              name="reportDetail.participation"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업 참여도
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentResult}>
            <Controller
              name="reportDetail.result"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    사업 성과
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentTodo}>
            <Controller
              name="reportDetail.todo"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    미달 목표
                  </Typography>
                  <TextAreaInput placeholder="내용을 입력하세요." {...field} />
                </TextAndInputWrapper>
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentComment}>
            <Controller
              name="reportDetail.comment"
              render={({ field }) => (
                <TextAndInputWrapper>
                  <Typography fs={24} lh={30} fw="BOLD">
                    제언
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
                reportDetail?.timelineIds ?? [],
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
            <ManagerProjectReportReviewTable
              data={mockProjectReportDetailTotalReview.filter(
                e => e.projectReportContentId === parseInt(detailId as string),
              )}
            />
          </TextAndInputWrapper>
        </FlexWrapper>

        <FlexWrapper direction="row" gap={0} ref={documentExpenditure}>
          <ManagerExpenditureTableInProjectDetail
            headerTitle="사업 예산안"
            projectNameCandidate={mockManagerProjectNameCandidateList}
            isProposal={false}
            initialData={mockDBExpenditureData.filter(
              e => e.projectName === getValues("reportDetail.title"),
            )}
            isInsideDetailFrame
            projectTitleFromDetailFrame={reportDetail.title}
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
export default ManagerProjectReportDetailFrame;
