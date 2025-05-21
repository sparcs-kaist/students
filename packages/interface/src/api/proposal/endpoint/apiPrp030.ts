/**
 * @version v0.1
 * @description 각 기구장들의 권한으로, 운영위원회 운영 계획을 삭제합니다.
 * 제출되지 않은 계획의 경우 완전히 삭제되며, 관련된 모든 revision이 함께 삭제됩니다.
 * 이미 제출된 계획의 경우, 삭제 표시만 되며 최신 revision에 isRemoved가 true로 설정됩니다.
 */
