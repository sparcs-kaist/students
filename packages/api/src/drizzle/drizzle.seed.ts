/* eslint-disable no-console */
/**
 * @file   drizzle.seed.ts
 * @brief  dev:dev 환경에서 DB를 mock_50.sql 데이터로 초기화합니다.
 *         실행 시 관련 테이블을 모두 TRUNCATE 한 뒤 mock_50.sql을 삽입합니다.
 *
 * 실행 방법 (모노레포 루트에서):
 *   dotenv -e /env/.env.dev -- pnpm -F api seed:dev
 */

import path from "path";
import fs from "fs";
import mysql from "mysql2/promise";
import { getConnection } from "./drizzle.provider";

/** mock_50.sql의 INSERT 대상 테이블 (외래키 의존성 역순으로 truncate) */
const TRUNCATE_ORDER = [
  "half_year",
  "team_leader",
  "team_member",
  "organization_president",
  "organization_member",
  "organization_manager",
  "staff",
  "uapresident",
  "team",
  "operating_committee",
  "organization",
  "semester",
  "student",
  "user",
  "department",
];

/**
 * SQL 파일을 개별 statement 로 분리합니다.
 * 주석(-- …)을 제거하고 세미콜론 기준으로 나눕니다.
 */
function parseSqlStatements(raw: string): string[] {
  return raw
    .split("\n")
    .filter(line => !line.trimStart().startsWith("--"))
    .join("\n")
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

async function seed() {
  console.log("[seed] dev:dev DB 초기화 시작…");

  const connection = await getConnection();

  try {
    // 1. 외래키 검사 비활성화 및 테이블 truncate (순차 실행)
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    console.log("[seed] 기존 데이터 초기화 중…");

    await TRUNCATE_ORDER.reduce(
      (chain, table) =>
        chain.then(() =>
          connection
            .query(`TRUNCATE TABLE \`${table}\`;`)
            .then(() => {
              console.log(`  ✓ TRUNCATE ${table}`);
            })
            .catch(() => {
              console.warn(`  ⚠ TRUNCATE ${table} 실패 (테이블 없음? 무시)`);
            }),
        ),
      Promise.resolve(),
    );

    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

    // 2. mock_50.sql 읽기 (모노레포 루트 기준)
    const sqlFilePath = path.resolve(process.cwd(), "../../", "mock_50.sql");

    if (!fs.existsSync(sqlFilePath)) {
      console.error(
        `[seed] mock_50.sql 파일을 찾을 수 없습니다: ${sqlFilePath}`,
      );
      process.exit(1);
    }

    const raw = fs.readFileSync(sqlFilePath, "utf-8");
    const statements = parseSqlStatements(raw);

    console.log(
      `[seed] mock_50.sql 파싱 완료 — ${statements.length}개 statement 실행 중…`,
    );

    // 3. 각 statement 순차 실행
    await statements.reduce(
      (chain, stmt) =>
        chain.then(() =>
          connection.query(stmt).catch((err: unknown) => {
            const msg = err instanceof Error ? err.message : String(err);
            console.error(`[seed] statement 실행 오류:\n  → ${msg}`);
          }),
        ),
      Promise.resolve(),
    );

    console.log("[seed] ✅ mock_50.sql 데이터 삽입 완료!");
  } finally {
    await (connection as mysql.Connection).end();
  }
}

seed().catch(err => {
  console.error("[seed] 치명적 오류:", err);
  process.exit(1);
});
