-- User 테이블 데이터 삽입
INSERT INTO user (email, name, created_at, updated_at) VALUES
('user1@example.com', 'User One', NOW(), NOW()),
('user2@example.com', 'User Two', NOW(), NOW()),
('user3@example.com', 'User Three', NOW(), NOW()),
('user4@example.com', 'User Four', NOW(), NOW()),
('user5@example.com', 'User Five', NOW(), NOW()),
('user6@example.com', 'User Six', NOW(), NOW()),
('user7@example.com', 'User Seven', NOW(), NOW()),
('user8@example.com', 'User Eight', NOW(), NOW()),
('user9@example.com', 'User Nine', NOW(), NOW()),
('user10@example.com', 'User Ten', NOW(), NOW());

-- Student 테이블 데이터 삽입
INSERT INTO student (student_number, user_id, created_at, updated_at) VALUES
('20180036', 1, NOW(), NOW()),
('20180037', 2, NOW(), NOW()),
('20180038', 3, NOW(), NOW()),
('20180039', 4, NOW(), NOW()),
('20180040', 5, NOW(), NOW()),
('20180041', 6, NOW(), NOW()),
('20180042', 7, NOW(), NOW()),
('20180043', 8, NOW(), NOW()),
('20180044', 9, NOW(), NOW()),
('20180045', 10, NOW(), NOW());

-- Organization 테이블 데이터 삽입
INSERT INTO organization (name, name_eng, organization_type_enum, founding_year, start_term, organization_state_enum, created_at, updated_at) VALUES
('컴퓨터공학과', 'Computer Engineering', 1, 1995, '2023-01', 1, NOW(), NOW()),
('전자공학과', 'Electronic Engineering', 2, 1985, '2023-01', 1, NOW(), NOW());

-- OperatingCommittee 테이블 데이터 삽입
INSERT INTO operating_committee (organization_id, name, name_eng, start_term, created_at, updated_at) VALUES
(1, '학생회', 'Student Council', '2023-01', NOW(), NOW()),
(2, '학과 운영 위원회', 'Department Committee', '2023-01', NOW(), NOW());

-- Team 테이블 데이터 삽입
INSERT INTO team (organization_id, name, start_term, created_at, updated_at) VALUES
(1, 'AI 연구팀', '2023-01', NOW(), NOW()),
(2, '로봇 공학팀', '2023-01', NOW(), NOW());

-- OrganizationMember 테이블 데이터 삽입
INSERT INTO organization_member (organization_id, student_id, start_term, created_at, updated_at) VALUES
(1, 1, '2023-01', NOW(), NOW()),
(1, 2, '2023-01', NOW(), NOW()),
(2, 3, '2023-01', NOW(), NOW()),
(2, 4, '2023-01', NOW(), NOW());

-- OrganizationPresident 테이블 데이터 삽입
INSERT INTO organization_president (organization_id, organization_president_type_enum, title, student_id, phone_number, start_term, created_at, updated_at) VALUES
(1, 1, '학생회장', 1, '010-1234-5678', '2023-01', NOW(), NOW()),
(2, 2, '학과장', 3, '010-9876-5432', '2023-01', NOW(), NOW());

-- TeamMember 테이블 데이터 삽입
INSERT INTO team_member (team_id, student_id, start_term, created_at, updated_at) VALUES
(1, 5, '2023-01', NOW(), NOW()),
(1, 6, '2023-01', NOW(), NOW()),
(2, 7, '2023-01', NOW(), NOW()),
(2, 8, '2023-01', NOW(), NOW());

-- TeamLeader 테이블 데이터 삽입
INSERT INTO team_leader (team_id, student_id, start_term, created_at, updated_at) VALUES
(1, 5, '2023-01', NOW(), NOW()),
(2, 7, '2023-01', NOW(), NOW());

-- Semester 테이블 데이터 삽입
INSERT INTO semester (name, year, semester_enum, start_term, end_term, created_at, updated_at) VALUES
('Spring 2023', 2023, 1, '2023-01', '2023-06', NOW(), NOW()),
('Fall 2023', 2023, 2, '2023-07', '2023-12', NOW(), NOW());

-- HalfYear 테이블 데이터 삽입
INSERT INTO half_year (name, year, half_year_enum, regular_semester_id, seasonal_semester_id, created_at, updated_at) VALUES
('First Half 2023', 2023, 1, 1, 2, NOW(), NOW()),
('Second Half 2023', 2023, 2, 2, 1, NOW(), NOW());
