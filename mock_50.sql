-- -----------------------------------------------------
-- 1. USER 테이블 데이터 삽입 (50명)
-- -----------------------------------------------------
INSERT INTO user (email, name, created_at, updated_at)
VALUES
    ('user1@example.com','User 1', NOW(), NOW()),
    ('user2@example.com','User 2', NOW(), NOW()),
    ('user3@example.com','User 3', NOW(), NOW()),
    ('user4@example.com','User 4', NOW(), NOW()),
    ('user5@example.com','User 5', NOW(), NOW()),
    ('user6@example.com','User 6', NOW(), NOW()),
    ('user7@example.com','User 7', NOW(), NOW()),
    ('user8@example.com','User 8', NOW(), NOW()),
    ('user9@example.com','User 9', NOW(), NOW()),
    ('user10@example.com','User 10', NOW(), NOW()),
    ('user11@example.com','User 11', NOW(), NOW()),
    ('user12@example.com','User 12', NOW(), NOW()),
    ('user13@example.com','User 13', NOW(), NOW()),
    ('user14@example.com','User 14', NOW(), NOW()),
    ('user15@example.com','User 15', NOW(), NOW()),
    ('user16@example.com','User 16', NOW(), NOW()),
    ('user17@example.com','User 17', NOW(), NOW()),
    ('user18@example.com','User 18', NOW(), NOW()),
    ('user19@example.com','User 19', NOW(), NOW()),
    ('user20@example.com','User 20', NOW(), NOW()),
    ('user21@example.com','User 21', NOW(), NOW()),
    ('user22@example.com','User 22', NOW(), NOW()),
    ('user23@example.com','User 23', NOW(), NOW()),
    ('user24@example.com','User 24', NOW(), NOW()),
    ('user25@example.com','User 25', NOW(), NOW()),
    ('user26@example.com','User 26', NOW(), NOW()),
    ('user27@example.com','User 27', NOW(), NOW()),
    ('user28@example.com','User 28', NOW(), NOW()),
    ('user29@example.com','User 29', NOW(), NOW()),
    ('user30@example.com','User 30', NOW(), NOW()),
    ('user31@example.com','User 31', NOW(), NOW()),
    ('user32@example.com','User 32', NOW(), NOW()),
    ('user33@example.com','User 33', NOW(), NOW()),
    ('user34@example.com','User 34', NOW(), NOW()),
    ('user35@example.com','User 35', NOW(), NOW()),
    ('user36@example.com','User 36', NOW(), NOW()),
    ('user37@example.com','User 37', NOW(), NOW()),
    ('user38@example.com','User 38', NOW(), NOW()),
    ('user39@example.com','User 39', NOW(), NOW()),
    ('user40@example.com','User 40', NOW(), NOW()),
    ('user41@example.com','User 41', NOW(), NOW()),
    ('user42@example.com','User 42', NOW(), NOW()),
    ('user43@example.com','User 43', NOW(), NOW()),
    ('user44@example.com','User 44', NOW(), NOW()),
    ('user45@example.com','User 45', NOW(), NOW()),
    ('user46@example.com','User 46', NOW(), NOW()),
    ('user47@example.com','User 47', NOW(), NOW()),
    ('user48@example.com','User 48', NOW(), NOW()),
    ('user49@example.com','User 49', NOW(), NOW()),
    ('user50@example.com','User 50', NOW(), NOW());


-- -----------------------------------------------------
-- 2. STUDENT 테이블 데이터 삽입 (50명, user_id 매칭)
--    student_number는 8자리, 여기서는 20180036 ~ 20180085 사용
-- -----------------------------------------------------
INSERT INTO student (student_number, user_id, created_at, updated_at)
VALUES
    ('20180036', 1, NOW(), NOW()),
    ('20180037', 2, NOW(), NOW()),
    ('20180038', 3, NOW(), NOW()),
    ('20180039', 4, NOW(), NOW()),
    ('20180040', 5, NOW(), NOW()),
    ('20180041', 6, NOW(), NOW()),
    ('20180042', 7, NOW(), NOW()),
    ('20180043', 8, NOW(), NOW()),
    ('20180044', 9, NOW(), NOW()),
    ('20180045', 10, NOW(), NOW()),
    ('20180046', 11, NOW(), NOW()),
    ('20180047', 12, NOW(), NOW()),
    ('20180048', 13, NOW(), NOW()),
    ('20180049', 14, NOW(), NOW()),
    ('20180050', 15, NOW(), NOW()),
    ('20180051', 16, NOW(), NOW()),
    ('20180052', 17, NOW(), NOW()),
    ('20180053', 18, NOW(), NOW()),
    ('20180054', 19, NOW(), NOW()),
    ('20180055', 20, NOW(), NOW()),
    ('20180056', 21, NOW(), NOW()),
    ('20180057', 22, NOW(), NOW()),
    ('20180058', 23, NOW(), NOW()),
    ('20180059', 24, NOW(), NOW()),
    ('20180060', 25, NOW(), NOW()),
    ('20180061', 26, NOW(), NOW()),
    ('20180062', 27, NOW(), NOW()),
    ('20180063', 28, NOW(), NOW()),
    ('20180064', 29, NOW(), NOW()),
    ('20180065', 30, NOW(), NOW()),
    ('20180066', 31, NOW(), NOW()),
    ('20180067', 32, NOW(), NOW()),
    ('20180068', 33, NOW(), NOW()),
    ('20180069', 34, NOW(), NOW()),
    ('20180070', 35, NOW(), NOW()),
    ('20180071', 36, NOW(), NOW()),
    ('20180072', 37, NOW(), NOW()),
    ('20180073', 38, NOW(), NOW()),
    ('20180074', 39, NOW(), NOW()),
    ('20180075', 40, NOW(), NOW()),
    ('20180076', 41, NOW(), NOW()),
    ('20180077', 42, NOW(), NOW()),
    ('20180078', 43, NOW(), NOW()),
    ('20180079', 44, NOW(), NOW()),
    ('20180080', 45, NOW(), NOW()),
    ('20180081', 46, NOW(), NOW()),
    ('20180082', 47, NOW(), NOW()),
    ('20180083', 48, NOW(), NOW()),
    ('20180084', 49, NOW(), NOW()),
    ('20180085', 50, NOW(), NOW());


-- -----------------------------------------------------
-- 3. ORGANIZATION 테이블 (5개 이상)
-- -----------------------------------------------------
INSERT INTO organization (
  name, name_eng, organization_type_enum, founding_year,
  start_term, organization_state_enum, created_at, updated_at
)
VALUES
    ('조직1', 'Organization One', 1, 2000, '2023-01', 1, NOW(), NOW()),
    ('조직2', 'Organization Two', 2, 2001, '2023-01', 1, NOW(), NOW()),
    ('조직3', 'Organization Three', 3, 2002, '2023-01', 1, NOW(), NOW()),
    ('조직4', 'Organization Four', 4, 2003, '2023-01', 1, NOW(), NOW()),
    ('조직5', 'Organization Five', 5, 2004, '2023-01', 1, NOW(), NOW());


-- -----------------------------------------------------
-- 4. OPERATING_COMMITTEE 테이블
--    각 조직별로 3개 이상 (총 15개)
-- -----------------------------------------------------
INSERT INTO operating_committee (
  organization_id, name, name_eng, start_term, created_at, updated_at
)
VALUES
    (1, '조직1 위원회A', 'Org1 Committee A', '2023-01', NOW(), NOW()),
    (1, '조직1 위원회B', 'Org1 Committee B', '2023-01', NOW(), NOW()),
    (1, '조직1 위원회C', 'Org1 Committee C', '2023-01', NOW(), NOW()),
    (2, '조직2 위원회A', 'Org2 Committee A', '2023-01', NOW(), NOW()),
    (2, '조직2 위원회B', 'Org2 Committee B', '2023-01', NOW(), NOW()),
    (2, '조직2 위원회C', 'Org2 Committee C', '2023-01', NOW(), NOW()),
    (3, '조직3 위원회A', 'Org3 Committee A', '2023-01', NOW(), NOW()),
    (3, '조직3 위원회B', 'Org3 Committee B', '2023-01', NOW(), NOW()),
    (3, '조직3 위원회C', 'Org3 Committee C', '2023-01', NOW(), NOW()),
    (4, '조직4 위원회A', 'Org4 Committee A', '2023-01', NOW(), NOW()),
    (4, '조직4 위원회B', 'Org4 Committee B', '2023-01', NOW(), NOW()),
    (4, '조직4 위원회C', 'Org4 Committee C', '2023-01', NOW(), NOW()),
    (5, '조직5 위원회A', 'Org5 Committee A', '2023-01', NOW(), NOW()),
    (5, '조직5 위원회B', 'Org5 Committee B', '2023-01', NOW(), NOW()),
    (5, '조직5 위원회C', 'Org5 Committee C', '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 5. TEAM 테이블
--    각 조직별로 3개 이상 (총 15개)
-- -----------------------------------------------------
INSERT INTO team (
  organization_id, name, start_term, created_at, updated_at
)
VALUES
    (1, '조직1 팀A', '2023-01', NOW(), NOW()),
    (1, '조직1 팀B', '2023-01', NOW(), NOW()),
    (1, '조직1 팀C', '2023-01', NOW(), NOW()),
    (2, '조직2 팀A', '2023-01', NOW(), NOW()),
    (2, '조직2 팀B', '2023-01', NOW(), NOW()),
    (2, '조직2 팀C', '2023-01', NOW(), NOW()),
    (3, '조직3 팀A', '2023-01', NOW(), NOW()),
    (3, '조직3 팀B', '2023-01', NOW(), NOW()),
    (3, '조직3 팀C', '2023-01', NOW(), NOW()),
    (4, '조직4 팀A', '2023-01', NOW(), NOW()),
    (4, '조직4 팀B', '2023-01', NOW(), NOW()),
    (4, '조직4 팀C', '2023-01', NOW(), NOW()),
    (5, '조직5 팀A', '2023-01', NOW(), NOW()),
    (5, '조직5 팀B', '2023-01', NOW(), NOW()),
    (5, '조직5 팀C', '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 6. ORGANIZATION_MEMBER 테이블
--    학생 여러명이 여러 조직에 속할 수 있음 (예시로 50줄)
-- -----------------------------------------------------
INSERT INTO organization_member (
  organization_id, student_id, start_term, created_at, updated_at
)
VALUES
    (1, 1,  '2023-01', NOW(), NOW()),
    (1, 2,  '2023-01', NOW(), NOW()),
    (1, 3,  '2023-01', NOW(), NOW()),
    (1, 4,  '2023-01', NOW(), NOW()),
    (1, 5,  '2023-01', NOW(), NOW()),
    (2, 3,  '2023-01', NOW(), NOW()),
    (2, 4,  '2023-01', NOW(), NOW()),
    (2, 6,  '2023-01', NOW(), NOW()),
    (2, 7,  '2023-01', NOW(), NOW()),
    (3, 8,  '2023-01', NOW(), NOW()),
    (3, 9,  '2023-01', NOW(), NOW()),
    (3, 10, '2023-01', NOW(), NOW()),
    (3, 11, '2023-01', NOW(), NOW()),
    (4, 12, '2023-01', NOW(), NOW()),
    (4, 13, '2023-01', NOW(), NOW()),
    (4, 14, '2023-01', NOW(), NOW()),
    (5, 15, '2023-01', NOW(), NOW()),
    (5, 16, '2023-01', NOW(), NOW()),
    (5, 17, '2023-01', NOW(), NOW()),
    (1, 18, '2023-01', NOW(), NOW()),
    (1, 19, '2023-01', NOW(), NOW()),
    (2, 20, '2023-01', NOW(), NOW()),
    (3, 21, '2023-01', NOW(), NOW()),
    (4, 22, '2023-01', NOW(), NOW()),
    (5, 23, '2023-01', NOW(), NOW()),
    (1, 24, '2023-01', NOW(), NOW()),
    (2, 25, '2023-01', NOW(), NOW()),
    (3, 26, '2023-01', NOW(), NOW()),
    (4, 27, '2023-01', NOW(), NOW()),
    (5, 28, '2023-01', NOW(), NOW()),
    (1, 29, '2023-01', NOW(), NOW()),
    (2, 30, '2023-01', NOW(), NOW()),
    (3, 31, '2023-01', NOW(), NOW()),
    (4, 32, '2023-01', NOW(), NOW()),
    (5, 33, '2023-01', NOW(), NOW()),
    (1, 34, '2023-01', NOW(), NOW()),
    (2, 35, '2023-01', NOW(), NOW()),
    (3, 36, '2023-01', NOW(), NOW()),
    (4, 37, '2023-01', NOW(), NOW()),
    (5, 38, '2023-01', NOW(), NOW()),
    (1, 39, '2023-01', NOW(), NOW()),
    (2, 40, '2023-01', NOW(), NOW()),
    (3, 41, '2023-01', NOW(), NOW()),
    (4, 42, '2023-01', NOW(), NOW()),
    (5, 43, '2023-01', NOW(), NOW()),
    (1, 44, '2023-01', NOW(), NOW()),
    (2, 45, '2023-01', NOW(), NOW()),
    (3, 46, '2023-01', NOW(), NOW()),
    (4, 47, '2023-01', NOW(), NOW()),
    (5, 48, '2023-01', NOW(), NOW()),
    (1, 49, '2023-01', NOW(), NOW()),
    (2, 50, '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 7. ORGANIZATION_PRESIDENT 테이블
--    각 Organization마다 여러 명의 President 예시 (2명씩 10명)
-- -----------------------------------------------------
INSERT INTO organization_president (
  organization_id, organization_president_type_enum, title,
  student_id, phone_number, start_term, created_at, updated_at
)
VALUES
    (1, 1, '회장1', 1, '010-1111-0001', '2023-01', NOW(), NOW()),
    (1, 1, '회장2', 2, '010-1111-0002', '2023-01', NOW(), NOW()),
    (2, 2, '학장1', 3, '010-2222-0003', '2023-01', NOW(), NOW()),
    (2, 2, '학장2', 4, '010-2222-0004', '2023-01', NOW(), NOW()),
    (3, 1, '회장1', 5, '010-3333-0005', '2023-01', NOW(), NOW()),
    (3, 1, '회장2', 6, '010-3333-0006', '2023-01', NOW(), NOW()),
    (4, 2, '학장1', 7, '010-4444-0007', '2023-01', NOW(), NOW()),
    (4, 2, '학장2', 8, '010-4444-0008', '2023-01', NOW(), NOW()),
    (5, 1, '회장1', 9, '010-5555-0009', '2023-01', NOW(), NOW()),
    (5, 1, '회장2', 10, '010-5555-0010', '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 8. TEAM_MEMBER 테이블
--    각 Team 별로 여러 명의 Student 예시
--    여기서는 15개 팀이 있으므로 임의로 30줄 추가
--    (team_id = 1~15, student_id = 1~30 예시)
-- -----------------------------------------------------
INSERT INTO team_member (
  team_id, student_id, start_term, created_at, updated_at
)
VALUES
    (1, 1, '2023-01', NOW(), NOW()),
    (1, 2, '2023-01', NOW(), NOW()),
    (2, 3, '2023-01', NOW(), NOW()),
    (2, 4, '2023-01', NOW(), NOW()),
    (3, 5, '2023-01', NOW(), NOW()),
    (3, 6, '2023-01', NOW(), NOW()),
    (4, 7, '2023-01', NOW(), NOW()),
    (4, 8, '2023-01', NOW(), NOW()),
    (5, 9, '2023-01', NOW(), NOW()),
    (5, 10, '2023-01', NOW(), NOW()),
    (6, 11, '2023-01', NOW(), NOW()),
    (6, 12, '2023-01', NOW(), NOW()),
    (7, 13, '2023-01', NOW(), NOW()),
    (7, 14, '2023-01', NOW(), NOW()),
    (8, 15, '2023-01', NOW(), NOW()),
    (8, 16, '2023-01', NOW(), NOW()),
    (9, 17, '2023-01', NOW(), NOW()),
    (9, 18, '2023-01', NOW(), NOW()),
    (10, 19, '2023-01', NOW(), NOW()),
    (10, 20, '2023-01', NOW(), NOW()),
    (11, 21, '2023-01', NOW(), NOW()),
    (11, 22, '2023-01', NOW(), NOW()),
    (12, 23, '2023-01', NOW(), NOW()),
    (12, 24, '2023-01', NOW(), NOW()),
    (13, 25, '2023-01', NOW(), NOW()),
    (13, 26, '2023-01', NOW(), NOW()),
    (14, 27, '2023-01', NOW(), NOW()),
    (14, 28, '2023-01', NOW(), NOW()),
    (15, 29, '2023-01', NOW(), NOW()),
    (15, 30, '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 9. TEAM_LEADER 테이블
--    여러 팀에 대해 리더 지정 예시
-- -----------------------------------------------------
INSERT INTO team_leader (
  team_id, student_id, start_term, created_at, updated_at
)
VALUES
    (1, 1, '2023-01', NOW(), NOW()),
    (2, 3, '2023-01', NOW(), NOW()),
    (3, 5, '2023-01', NOW(), NOW()),
    (4, 7, '2023-01', NOW(), NOW()),
    (5, 9, '2023-01', NOW(), NOW());


-- -----------------------------------------------------
-- 10. SEMESTER 테이블
-- -----------------------------------------------------
INSERT INTO semester (
  name, year, semester_enum, start_term, end_term,
  created_at, updated_at
)
VALUES
    ('Spring 2023', 2023, 1, '2023-01', '2023-06', NOW(), NOW()),
    ('Fall 2023',   2023, 2, '2023-07', '2023-12', NOW(), NOW());


-- -----------------------------------------------------
-- 11. HALF_YEAR 테이블
-- -----------------------------------------------------
INSERT INTO half_year (
  name, year, half_year_enum, regular_semester_id, seasonal_semester_id,
  created_at, updated_at
)
VALUES
    ('First Half 2023',  2023, 1, 1, 2, NOW(), NOW()),
    ('Second Half 2023', 2023, 2, 2, 1, NOW(), NOW());
