/* eslint-disable @typescript-eslint/no-unused-vars */

import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Modal from "@sparcs-students/web/common/components/Modal";
import TelEditingModalContent from "@sparcs-students/web/common/components/Modal/TelEditingModalContent";
import Typography from "@sparcs-students/web/common/components/Typography";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { getMyInfo } from "../services/myApi";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  min-width: 0;
  padding: 20px 40px 20px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  box-sizing: border-box;
`;
const ProfileCard = () => {
  // TODO : 전화번호 Api 연결
  const [tel, setTel] = useState("010-0000-0000");
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState<number | null>(null);
  const [department, setDepartment] = useState("");
  const [clubs, setClubs] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMyInfo()
      .then(({ student, organizations }) => {
        setName(student.user.name);
        setStudentID(student.studentNumber);
        setDepartment(student.department?.name ?? "");
        setClubs(organizations.map(org => org.name));
      })
      .catch(() => {});
  }, []);

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
            {name}
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
