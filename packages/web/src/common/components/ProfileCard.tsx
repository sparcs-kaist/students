import { useState } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import FlexWrapper from "./FlexWrapper";
import TextButton from "./Buttons/TextButton";
import Modal from "./Modal";
import TelEditingModalContent from "./Modal/TelEditingModalContent";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px 40px 20px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
`;
const ProfileCard = () => {
  const [tel, setTel] = useState("010-0000-0000");
  const studentID = 20240602;
  const department = "수리과학과/학사";
  const clubs = ["SPARCS/정회원", "학부총학생회/국원"];
  const [isOpen, setIsOpen] = useState(false);

  const handleEditOnclick = () => {
    setIsOpen(true);
  };

  const handleOnConfirm = (val: string) => {
    setTel(val);
    setIsOpen(false);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <CardWrapper>
      <FlexWrapper direction="column" gap={10}>
        <FlexWrapper direction="row" gap={5}>
          <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
            임가은,
          </Typography>
          <Typography fs={24} lh={30} color="BLACK" fw="BOLD">
            Gaeun Lim
          </Typography>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={10}>
          <Typography fs={16} lh={16} color="BLACK" fw="BOLD">
            학번
          </Typography>
          <Typography fs={16} lh={16} color="BLACK" fw="MEDIUM">
            {studentID}
          </Typography>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={10} style={{ whiteSpace: "nowrap" }}>
          <Typography fs={16} lh={16} color="BLACK" fw="BOLD">
            전화번호
          </Typography>
          <Typography fs={16} lh={16} color="BLACK" fw="MEDIUM">
            {tel}
          </Typography>
          <TextButton text="수정하기" onClick={handleEditOnclick} />
          <Modal isOpen={isOpen}>
            <TelEditingModalContent
              default={tel}
              onConfirm={handleOnConfirm}
              onClose={handleOnClose}
            />
          </Modal>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={10}>
          <Typography fs={16} lh={16} color="BLACK" fw="BOLD">
            학과/과정
          </Typography>
          <Typography fs={16} lh={16} color="BLACK" fw="MEDIUM">
            {department}
          </Typography>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={10}>
          <Typography
            fs={16}
            lh={16}
            color="BLACK"
            fw="BOLD"
            style={{ whiteSpace: "nowrap" }}
          >
            소속 단체
          </Typography>
          <FlexWrapper direction="column" gap={5}>
            {clubs.map((val, idx) => (
              <Typography fs={16} lh={16} color="BLACK" fw="MEDIUM" key={idx}>
                {val}
              </Typography>
            ))}
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </CardWrapper>
  );
};

export default ProfileCard;
