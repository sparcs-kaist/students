-- =====================================================================
-- 예산(budget) / 사업(project) 테스트용 mock 데이터
--   * 전제: mock_50.sql 이 먼저 적용되어 있어야 합니다.
--       - organization 1~5, team 1~15 (조직 n 의 팀: 3n-2 ~ 3n)
--       - semester 1 (Spring 2023), 2 (Fall 2023)
--       - student 1~50 (student 1 = uapresident, 검토자로 사용)
--   * 재실행 가능: 아래 테이블들만 TRUNCATE 후 다시 삽입합니다.
--   * 제외: 청원(petition), 회의(meeting/agenda), 운영계획/보고(operation_*)
--       -> cog_agenda_id / gsrc_agenda_id 는 NULL 로 둡니다.
--
-- DocumentReviewStatusEnum: 1 승인, 2 반려, 3 수정요청, 4 검토중, 9 임시저장
-- BudgetDomainEnum: 1 학생회비, 2 본회계, 3 자치
-- BudgetDivisionIncomeEnum: 1 기층기구회계, 7 과비, 8 단비
-- BudgetDivisionExpenseEnum: 1 운영비, 2 정기사업비, 3 비정기사업비
-- BudgetClassExpenseEnum: 3 물품비, 4 인쇄비, 6 회의비
--
-- 각 조직(1~5)의 제출/검토 상태 (제안서 기준):
--   org1 승인 / org2 검토중 / org3 반려 / org4 제출만(검토 없음) / org5 임시저장(미제출)
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE budget_proposal_income_document_review;
TRUNCATE TABLE budget_proposal_expense_document_review;
TRUNCATE TABLE budget_proposal_income_revision;
TRUNCATE TABLE budget_proposal_expense_revision;
TRUNCATE TABLE budget_proposal_income;
TRUNCATE TABLE budget_proposal_expense;
TRUNCATE TABLE budget_report_income_document_review;
TRUNCATE TABLE budget_report_expense_document_review;
TRUNCATE TABLE budget_report_income_revision;
TRUNCATE TABLE budget_report_expense_revision;
TRUNCATE TABLE budget_report_income;
TRUNCATE TABLE budget_report_expense;
TRUNCATE TABLE project_proposal_document_review;
TRUNCATE TABLE project_proposal_timeline;
TRUNCATE TABLE project_proposal_revision;
TRUNCATE TABLE project_proposal;
TRUNCATE TABLE project_report_document_review;
TRUNCATE TABLE project_report_timeline;
TRUNCATE TABLE project_report_revision;
TRUNCATE TABLE project_report;
SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------
-- 1. 예산안 (Fall 2023, semester 2, 조직 1~5)
-- -----------------------------------------------------
INSERT INTO budget_proposal_income (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 2, NOW(), NOW()),
(2, 2, 2, NOW(), NOW()),
(3, 3, 2, NOW(), NOW()),
(4, 4, 2, NOW(), NOW()),
(5, 5, 2, NOW(), NOW());

-- 조직당 수입 항목 2개 (id = 2*(org-1)+1, 2*(org-1)+2)
INSERT INTO budget_proposal_income_revision
  (id, budget_proposal_income_id, budget_domain_enum, budget_division_income_enum, name, amount, detail, code, submitted_at, created_at, updated_at) VALUES
(1,  1, 1, 1, '기층기구회계 지원금', 500000, '2023년 가을학기 기층기구회계 지원금', 1,  '2023-08-10 10:00:00', NOW(), NOW()),
(2,  1, 1, 8, '단비',               200000, '조직원 단비 수입',                     2,  '2023-08-10 10:00:00', NOW(), NOW()),
(3,  2, 1, 1, '기층기구회계 지원금', 450000, '2023년 가을학기 기층기구회계 지원금', 3,  '2023-08-11 11:00:00', NOW(), NOW()),
(4,  2, 1, 7, '과비',               300000, '학과 과비 수입',                       4,  '2023-08-11 11:00:00', NOW(), NOW()),
(5,  3, 2, 1, '기층기구회계 지원금', 400000, '2023년 가을학기 기층기구회계 지원금', 5,  '2023-08-12 12:00:00', NOW(), NOW()),
(6,  3, 1, 8, '단비',               100000, '조직원 단비 수입',                     6,  '2023-08-12 12:00:00', NOW(), NOW()),
(7,  4, 1, 1, '기층기구회계 지원금', 350000, '2023년 가을학기 기층기구회계 지원금', 7,  '2023-08-13 13:00:00', NOW(), NOW()),
(8,  4, 1, 8, '단비',               150000, '조직원 단비 수입',                     8,  '2023-08-13 13:00:00', NOW(), NOW()),
(9,  5, 1, 1, '기층기구회계 지원금', 300000, '2023년 가을학기 기층기구회계 지원금', 9,  NULL,                  NOW(), NOW()),
(10, 5, 1, 8, '단비',               100000, '조직원 단비 수입',                     10, NULL,                  NOW(), NOW());

INSERT INTO budget_proposal_income_document_review
  (budget_proposal_income_revision_id, student_id, document_review_status_enum, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.',                 NOW(), NOW()),
(2, 1, 1, '승인합니다.',                 NOW(), NOW()),
(3, 1, 4, NULL,                          NOW(), NOW()),
(4, 1, 4, NULL,                          NOW(), NOW()),
(5, 1, 2, '근거 자료가 부족합니다.',     NOW(), NOW()),
(6, 1, 2, '근거 자료가 부족합니다.',     NOW(), NOW());

INSERT INTO budget_proposal_expense (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 2, NOW(), NOW()),
(2, 2, 2, NOW(), NOW()),
(3, 3, 2, NOW(), NOW()),
(4, 4, 2, NOW(), NOW()),
(5, 5, 2, NOW(), NOW());

INSERT INTO budget_proposal_expense_revision
  (id, budget_proposal_expense_id, budget_domain_enum, budget_division_expense_enum, budget_class_expense_enum, name, amount, detail, code, submitted_at, created_at, updated_at) VALUES
(1,  1, 1, 1, 3, '사무용품 구입',   150000, '문구류 및 사무용품',     1,  '2023-08-10 10:00:00', NOW(), NOW()),
(2,  1, 1, 2, 6, '정기 회의비',     200000, '학기 중 정기회의 간식',  2,  '2023-08-10 10:00:00', NOW(), NOW()),
(3,  2, 1, 1, 4, '홍보물 인쇄',     120000, '포스터 및 리플렛 인쇄',  3,  '2023-08-11 11:00:00', NOW(), NOW()),
(4,  2, 1, 2, 6, '정기 회의비',     180000, '학기 중 정기회의 간식',  4,  '2023-08-11 11:00:00', NOW(), NOW()),
(5,  3, 2, 1, 3, '물품 구입',       250000, '행사 물품',              5,  '2023-08-12 12:00:00', NOW(), NOW()),
(6,  3, 1, 3, 6, '비정기 행사 회의비', 90000, '특별 행사 준비 회의',  6,  '2023-08-12 12:00:00', NOW(), NOW()),
(7,  4, 1, 1, 3, '사무용품 구입',   100000, '문구류 및 사무용품',     7,  '2023-08-13 13:00:00', NOW(), NOW()),
(8,  4, 1, 2, 4, '행사 인쇄비',      80000, '행사 안내문 인쇄',       8,  '2023-08-13 13:00:00', NOW(), NOW()),
(9,  5, 1, 1, 3, '사무용품 구입',    80000, '문구류 및 사무용품',     9,  NULL,                  NOW(), NOW()),
(10, 5, 1, 2, 6, '정기 회의비',     100000, '학기 중 정기회의 간식',  10, NULL,                  NOW(), NOW());

-- 주의: expense document_review 의 *_revision_id 컬럼은 스키마상 부모
--       budget_proposal_expense.id 를 참조합니다. (schema 정의 그대로)
INSERT INTO budget_proposal_expense_document_review
  (budget_proposal_expense_revision_id, student_id, document_review_status_enum, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.',             NOW(), NOW()),
(2, 1, 4, NULL,                      NOW(), NOW()),
(3, 1, 2, '근거 자료가 부족합니다.', NOW(), NOW());

-- -----------------------------------------------------
-- 2. 예산 결산 (Spring 2023, semester 1, 조직 1~3)
-- -----------------------------------------------------
INSERT INTO budget_report_income (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 1, NOW(), NOW()),
(2, 2, 1, NOW(), NOW()),
(3, 3, 1, NOW(), NOW());

INSERT INTO budget_report_income_revision
  (id, budget_report_income_id, budget_domain_enum, budget_division_income_enum, name, amount, detail, code, submitted_at, created_at, updated_at) VALUES
(1, 1, 1, 1, '기층기구회계 지원금', 480000, '봄학기 지원금 수령액', 1, '2023-06-10 10:00:00', NOW(), NOW()),
(2, 1, 1, 8, '단비',               190000, '봄학기 단비 수령액',   2, '2023-06-10 10:00:00', NOW(), NOW()),
(3, 2, 1, 1, '기층기구회계 지원금', 430000, '봄학기 지원금 수령액', 3, '2023-06-11 11:00:00', NOW(), NOW()),
(4, 2, 1, 7, '과비',               280000, '봄학기 과비 수령액',   4, '2023-06-11 11:00:00', NOW(), NOW()),
(5, 3, 1, 1, '기층기구회계 지원금', 400000, '봄학기 지원금 수령액', 5, NULL,                  NOW(), NOW());

INSERT INTO budget_report_income_document_review
  (budget_report_income_revision_id, student_id, document_review_status_enum, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.', NOW(), NOW()),
(2, 1, 1, '승인합니다.', NOW(), NOW()),
(3, 1, 4, NULL,          NOW(), NOW());

INSERT INTO budget_report_expense (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 1, NOW(), NOW()),
(2, 2, 1, NOW(), NOW()),
(3, 3, 1, NOW(), NOW());

INSERT INTO budget_report_expense_revision
  (id, budget_report_expense_id, budget_domain_enum, budget_division_expense_enum, budget_class_expense_enum, name, amount, detail, code, submitted_at, created_at, updated_at) VALUES
(1, 1, 1, 1, 3, '사무용품 구입', 140000, '문구류 및 사무용품 (영수증 첨부)', 1, '2023-06-10 10:00:00', NOW(), NOW()),
(2, 1, 1, 2, 6, '정기 회의비',   195000, '정기회의 간식 (영수증 첨부)',      2, '2023-06-10 10:00:00', NOW(), NOW()),
(3, 2, 1, 1, 4, '홍보물 인쇄',   118000, '포스터 및 리플렛 인쇄',            3, '2023-06-11 11:00:00', NOW(), NOW()),
(4, 2, 1, 2, 6, '정기 회의비',   175000, '정기회의 간식',                    4, '2023-06-11 11:00:00', NOW(), NOW()),
(5, 3, 2, 1, 3, '물품 구입',     240000, '행사 물품',                        5, NULL,                  NOW(), NOW());

-- 주의: 위와 같이 report expense document_review 도 부모 budget_report_expense.id 참조
INSERT INTO budget_report_expense_document_review
  (budget_report_expense_revision_id, student_id, document_review_status_enum, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.', NOW(), NOW()),
(2, 1, 4, NULL,          NOW(), NOW());

-- -----------------------------------------------------
-- 3. 사업계획서 (Fall 2023, semester 2)
--    project_proposal 7건: org1 x2, org2 x2, org3~5 x1
--    revision.code 는 UNIQUE, timeline.code 가 revision.code 를 참조
--    manager_id 는 해당 조직 회장 student
-- -----------------------------------------------------
INSERT INTO project_proposal (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 2, NOW(), NOW()),
(2, 1, 2, NOW(), NOW()),
(3, 2, 2, NOW(), NOW()),
(4, 2, 2, NOW(), NOW()),
(5, 3, 2, NOW(), NOW()),
(6, 4, 2, NOW(), NOW()),
(7, 5, 2, NOW(), NOW());

INSERT INTO project_proposal_revision
  (id, project_proposal_id, name, method, prepare_start_term, prepare_end_term, start_term, end_term, team_id, manager_id, purpose, target, detail, note, submitted_at, created_at, updated_at, code) VALUES
(1, 1, '신입생 환영회',     '오프라인 행사', '2023-08-14 00:00:00', '2023-08-31 00:00:00', '2023-09-02 10:00:00', '2023-09-02 18:00:00', 1,  1,  '신입생과 재학생 교류',      '신입생 전체', '장소 대관, 다과 및 레크리에이션 진행',   NULL,              '2023-08-10 10:00:00', NOW(), NOW(), 1001),
(2, 2, '가을 체육대회',     '오프라인 행사', '2023-09-01 00:00:00', '2023-09-30 00:00:00', '2023-10-07 09:00:00', '2023-10-07 17:00:00', 2,  2,  '구성원 친목 도모',          '조직원 전체', '종목별 대회 운영, 시상',                 NULL,              '2023-08-10 10:00:00', NOW(), NOW(), 1002),
(3, 3, '진로 특강',         '온라인 행사',   '2023-09-01 00:00:00', '2023-09-20 00:00:00', '2023-09-25 19:00:00', '2023-09-25 21:00:00', 4,  3,  '진로 탐색 지원',          '재학생',     '졸업생 연사 초청 온라인 특강',            '연사 섭외 필요',  '2023-08-11 11:00:00', NOW(), NOW(), 1003),
(4, 4, '학술제',            '오프라인 행사', '2023-09-15 00:00:00', '2023-11-01 00:00:00', '2023-11-10 10:00:00', '2023-11-11 18:00:00', 5,  4,  '학술 교류',                '재학생',     '프로젝트 발표 및 포스터 전시',            NULL,              '2023-08-11 11:00:00', NOW(), NOW(), 1004),
(5, 5, '봉사활동',          '오프라인 행사', '2023-09-01 00:00:00', '2023-10-15 00:00:00', '2023-10-21 09:00:00', '2023-10-21 15:00:00', 7,  5,  '지역사회 기여',            '자원 참가자', '지역 복지시설 봉사',                      NULL,              '2023-08-12 12:00:00', NOW(), NOW(), 1005),
(6, 6, '송년회',            '오프라인 행사', '2023-11-01 00:00:00', '2023-12-10 00:00:00', '2023-12-15 18:00:00', '2023-12-15 22:00:00', 10, 7,  '한 해 마무리 및 친목',    '조직원 전체', '장소 대관 및 식사',                       NULL,              '2023-08-13 13:00:00', NOW(), NOW(), 1006),
(7, 7, '워크샵 (임시저장)', '오프라인 행사', NULL,                  NULL,                  NULL,                  NULL,                  13, 9,  NULL,                       NULL,         NULL,                                      '작성 중',         NULL,                  NOW(), NOW(), 1007);

INSERT INTO project_proposal_timeline (code, start_term, end_term, detail, note, created_at, updated_at) VALUES
(1001, '2023-08-14 00:00:00', '2023-08-31 00:00:00', '장소 대관 및 홍보',   NULL, NOW(), NOW()),
(1001, '2023-09-02 10:00:00', '2023-09-02 18:00:00', '행사 진행',           NULL, NOW(), NOW()),
(1002, '2023-09-01 00:00:00', '2023-09-30 00:00:00', '종목 선정 및 신청',   NULL, NOW(), NOW()),
(1002, '2023-10-07 09:00:00', '2023-10-07 17:00:00', '행사 진행',           NULL, NOW(), NOW()),
(1003, '2023-09-01 00:00:00', '2023-09-20 00:00:00', '연사 섭외',           NULL, NOW(), NOW()),
(1003, '2023-09-25 19:00:00', '2023-09-25 21:00:00', '특강 진행',           NULL, NOW(), NOW()),
(1004, '2023-09-15 00:00:00', '2023-11-01 00:00:00', '참가자 모집 및 준비', NULL, NOW(), NOW()),
(1004, '2023-11-10 10:00:00', '2023-11-11 18:00:00', '학술제 진행',         NULL, NOW(), NOW()),
(1005, '2023-10-21 09:00:00', '2023-10-21 15:00:00', '봉사활동 진행',       NULL, NOW(), NOW()),
(1006, '2023-12-15 18:00:00', '2023-12-15 22:00:00', '송년회 진행',         NULL, NOW(), NOW());

INSERT INTO project_proposal_document_review
  (project_proposal_revision_id, student_id, document_review_status_enum_id, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.',                 NOW(), NOW()),
(2, 1, 1, '승인합니다.',                 NOW(), NOW()),
(3, 1, 4, NULL,                          NOW(), NOW()),
(4, 1, 4, NULL,                          NOW(), NOW()),
(5, 1, 2, '사업 목적을 보완해 주세요.',  NOW(), NOW());

-- -----------------------------------------------------
-- 4. 사업결과보고서 (Spring 2023, semester 1, 조직 1~3)
--    project_report_timeline 은 revision.id 를 참조
-- -----------------------------------------------------
INSERT INTO project_report (id, organization_id, semester_id, created_at, updated_at) VALUES
(1, 1, 1, NOW(), NOW()),
(2, 2, 1, NOW(), NOW()),
(3, 3, 1, NOW(), NOW());

INSERT INTO project_report_revision
  (id, project_report_id, name, method, prepare_start_term, prepare_end_term, start_term, end_term, team_id, manager_id, purpose, target, detail, note, submitted_at, created_at, updated_at) VALUES
(1, 1, '새내기 배움터', '오프라인 행사', '2023-02-15 00:00:00', '2023-02-28 00:00:00', '2023-03-04 10:00:00', '2023-03-04 18:00:00', 1, 1, '신입생 적응 지원', '신입생 전체', '참가자 80명, 예산 대비 집행 완료',      NULL,                '2023-06-10 10:00:00', NOW(), NOW()),
(2, 2, '봄 MT',         '오프라인 행사', '2023-04-01 00:00:00', '2023-04-20 00:00:00', '2023-05-12 09:00:00', '2023-05-13 12:00:00', 4, 3, '구성원 친목 도모', '조직원 전체', '참가자 45명, 우천으로 일부 일정 변경', '일정 변경 있음',    '2023-06-11 11:00:00', NOW(), NOW()),
(3, 3, '벚꽃 사진전',   '오프라인 행사', '2023-03-20 00:00:00', '2023-04-05 00:00:00', '2023-04-10 10:00:00', '2023-04-14 18:00:00', 7, 5, '교내 문화 행사',    '재학생',     '작품 30점 전시',                      NULL,                NULL,                  NOW(), NOW());

INSERT INTO project_report_timeline (project_report_revision_id, start_term, end_term, detail, note, created_at, updated_at) VALUES
(1, '2023-02-15 00:00:00', '2023-02-28 00:00:00', '준비 및 홍보',   NULL,            NOW(), NOW()),
(1, '2023-03-04 10:00:00', '2023-03-04 18:00:00', '행사 진행',      NULL,            NOW(), NOW()),
(2, '2023-04-01 00:00:00', '2023-04-20 00:00:00', '참가 신청',      NULL,            NOW(), NOW()),
(2, '2023-05-12 09:00:00', '2023-05-13 12:00:00', 'MT 진행',        '우천으로 변경', NOW(), NOW()),
(3, '2023-04-10 10:00:00', '2023-04-14 18:00:00', '전시 진행',      NULL,            NOW(), NOW());

INSERT INTO project_report_document_review
  (project_report_revision_id, student_id, document_review_status_enum, detail, created_at, updated_at) VALUES
(1, 1, 1, '승인합니다.', NOW(), NOW()),
(2, 1, 4, NULL,          NOW(), NOW());
