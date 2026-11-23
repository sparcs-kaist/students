# 사업계획서 조회 연결: 구조 검증

## 확인 근거

- PR #326 최종 head: `85fed00cae72509ef9ac3b22e442e5651d1c528f`
- PR #336 최종 head: `8fd3277dc1b73d20606d9cc7e5d6881edeee4df2`
- 아래 내용은 현재 체크아웃의 스키마·컨트롤러·서비스·repository 기준이다.
- 작성자의 의도가 확인된 설계와, 코드에서 추론한 의미를 구분한다.

## 현재 코드에서 확정되는 관계

| 대상 | 현재 동작 |
| --- | --- |
| `ProjectProposal` | 생성 서비스가 단체·학기 조합의 중복 생성을 거부한다. DB 자체의 복합 UNIQUE 제약은 없다. |
| `ProjectProposalRevision` | 사업명·담당자·기간·본문을 담는다. 여러 행이 하나의 `ProjectProposal`을 참조할 수 있다. |
| revision `code` | 현재 스키마에서 전역 UNIQUE이다. |
| `ProjectProposalTimeline` | revision의 숫자 ID 대신 `code`를 외래키로 참조한다. 하나의 code에 여러 일정이 연결될 수 있다. |
| 본문 검토 | `ProjectProposalDocumentReview`가 revision의 숫자 ID를 참조한다. |
| 최신본 조회 | 한 `ProjectProposal` 아래에서 ID가 가장 큰 revision **하나**를 반환한다. 제출 여부로 필터링하지 않는다. |
| 날짜 조회 | 제출된 revision들의 날짜를 반환한다. 특정 날짜의 본문을 조회하는 API는 없다. |

따라서 `ProjectProposal.id`를 개별 사업 ID라고 확정하거나, 모든 revision을
제출 이력이라고 확정할 수 없다. 이름이 같다는 이유로 사업을 묶는 것도 안전하지 않다.

## 확인한 오류와 이번 수정

`apiPrp105`는 `projectProposalTimeline.id`를 받지만, 서비스가 code만으로 조회한
첫 번째 일정을 수정했다. 이제 ID와 code가 모두 일치하는 일정을 찾아 수정한다.
수정 조건에도 두 값을 사용한다. API 형식과 DB 스키마는 변경하지 않는다.

회귀 테스트는 다음 동작을 검사한다.

- 두 번째 일정을 수정해도 첫 번째 일정은 바뀌지 않는다.
- 생략한 필드는 유지된다.
- 다른 code의 일정 ID를 전달하면 수정하지 않는다.
- 다른 단체의 사업이거나 매니저 권한이 없으면 수정하지 않는다.

## 아직 해결하지 않은 구조 문제

제출본 수정 서비스는 기존 code를 복사해 새 revision을 생성한다. 이는 현재
UNIQUE 제약과 충돌한다. 제약만 제거하면 일정의 참조 대상이 모호해지므로,
UNIQUE 제거만으로 해결하지 않는다. 실제 DB의 제약 적용 상태는 확인하지 않았다.

추가로 DB에서 nullable인 날짜·문자열과 interface의 필수 필드 정의에도 차이가 있다.
실제 응답 표본을 확인하고, 데이터 없음과 잘못된 응답을 구분해서 다뤄야 한다.

## 다음 구현안: 현재 데이터의 조회부터 연결

이 절은 기존 PR의 API 설명이 아니라 새로 제안하는 구현 범위다.

1. 단체·학기로 `ProjectProposal`을 찾고 그 아래 현재 저장된 revision 행들을 반환한다.
2. 상세는 revision ID로 본문을 조회하고, 해당 revision의 code로 일정들을 조회한다.
3. 이름이나 날짜를 기준으로 중복을 제거하거나 확인되지 않은 사업별 이력을 만들지 않는다.
4. 기존 `apiPrp108`은 기존 최신 revision 하나 조회 동작을 유지한다.
5. 제출 이력을 지원하려면 사업의 지속적인 식별값과 revision별 일정 참조를 먼저 설계한다.

조회 API의 경로·interface와 빈 결과 응답은 구현 시 함께 정의한다. 목록·상세 조회에
스키마 변경은 필요하지 않다. 이력 보존 구조의 변경과 DB migration은 별도 작업이다.

현재 DB migration이나 실제 데이터 변경은 실행하지 않았다.
