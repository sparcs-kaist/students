import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import colors from "@sparcs-students/web/styles/themes/colors";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConsentModalContent from "@sparcs-students/web/common/components/Modal/ConsentModalContent";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Checkbox from "@sparcs-students/web/common/components/Checkbox";

const PersonalInformationCollectionConsentModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isFirstToggleOpen, setIsFirstToggleOpen] = useState(false);
  const [isSecondToggleOpen, setIsSecondToggleOpen] = useState(false);
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      width="600px"
    >
      <ConsentModalContent
        onAgree={() => {
          console.log("User agreed");
          setIsModalOpen(false);
        }}
        onDisagree={() => {
          console.log("User disagreed");
          setIsModalOpen(false);
        }}
        agreeButtonText="다음"
        disagreeButtonText="비동의 (로그인 없이 사용)"
        checked={isFirstChecked && isSecondChecked} // 동의 버튼 활성화
      >
        <FlexWrapper
          direction="column"
          gap={16}
          style={{ paddingBottom: "32px" }}
        >
          <div>
            개인정보 수집 및 이용 약관 동의 안내 문구가 들어가는 자리입니다.
            개인정보 동의를 해야만 서비스 이용이 가능하다는 문구가 들어가는
            자리입니다. 개인정보 동의 안내 문구가 들어가는 자리입니다.
          </div>

          {/* 첫번째 약관 */}
          <FlexWrapper
            direction="column"
            gap={8}
            style={{
              borderBottom: "1px solid",
              borderColor: isFirstToggleOpen
                ? colors.GREEN[700]
                : colors.GRAY[100],
              padding: "20px 16px",
            }}
          >
            <FlexWrapper direction="row" gap={10} alignItems="center">
              <IconButton
                onClick={() => {
                  setIsFirstToggleOpen(!isFirstToggleOpen);
                }}
                style={{ width: "16px", height: "16px", color: colors.BLACK }}
              >
                {isFirstToggleOpen ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
              <div>개인정보 수집 및 이용 약관</div>
            </FlexWrapper>
            {isFirstToggleOpen && (
              <>
                <FlexWrapper
                  direction="column"
                  gap={8}
                  style={{ marginLeft: "24px", width: "472px" }}
                >
                  어떠한 약관에 대한 설명 글이 들어가는 부분입니다. 어떠한
                  약관에 대한 설명 글이 들어가는 부분입니다. 어떠한 약관에 대한
                  설명 글이 들어가는 부분입니다. 어떠한 약관에 대한 설명 글이
                  들어가는 부분입니다. 어떠한 약관에 대한 설명 글이 들어가는
                  부분입니다. 어떠한 약관에 대한 설명 글이 들어가는 부분입니다.
                  어떠한 약관에 대한 설명 글이 들어가는 부분입니다.
                </FlexWrapper>
                <FlexWrapper direction="row" gap={8} alignItems="center">
                  <Checkbox
                    checked={isFirstChecked}
                    onClick={() => {
                      setIsFirstChecked(!isFirstChecked);
                    }}
                    color={
                      isFirstChecked ? colors.GREEN[700] : colors.GRAY[100]
                    }
                  />
                  <div>위 사항을 모두 확인했으며 동의합니다.</div>
                </FlexWrapper>
              </>
            )}
          </FlexWrapper>

          {/* 두번째 약관 */}
          <FlexWrapper
            direction="column"
            gap={8}
            style={{
              borderBottom: "1px solid",
              borderColor: isSecondToggleOpen
                ? colors.GREEN[700]
                : colors.GRAY[100],
              padding: "20px 16px",
            }}
          >
            <FlexWrapper direction="row" gap={10} alignItems="center">
              <IconButton
                onClick={() => {
                  setIsSecondToggleOpen(!isSecondToggleOpen);
                }}
                style={{ width: "16px", height: "16px", color: colors.BLACK }}
              >
                {isSecondToggleOpen ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
              <div>다른 약관</div>
            </FlexWrapper>
            {isSecondToggleOpen && (
              <>
                <FlexWrapper
                  direction="column"
                  gap={8}
                  style={{ marginLeft: "24px", width: "472px" }}
                >
                  어떠한 약관에 대한 설명 글이 들어가는 부분입니다. 어떠한
                  약관에 대한 설명 글이 들어가는 부분입니다. 어떠한 약관에 대한
                  설명 글이 들어가는 부분입니다. 어떠한 약관에 대한 설명 글이
                  들어가는 부분입니다. 어떠한 약관에 대한 설명 글이 들어가는
                  부분입니다. 어떠한 약관에 대한 설명 글이 들어가는 부분입니다.
                  어떠한 약관에 대한 설명 글이 들어가는 부분입니다.
                </FlexWrapper>
                <FlexWrapper direction="row" gap={8} alignItems="center">
                  <Checkbox
                    checked={isSecondChecked}
                    onClick={() => {
                      setIsSecondChecked(!isSecondChecked);
                    }}
                    color={
                      isSecondChecked ? colors.GREEN[700] : colors.GRAY[100]
                    }
                  />
                  <div>위 사항을 모두 확인했으며 동의합니다.</div>
                </FlexWrapper>
              </>
            )}
          </FlexWrapper>
        </FlexWrapper>
      </ConsentModalContent>
    </Modal>
  );
};

export default PersonalInformationCollectionConsentModal;
