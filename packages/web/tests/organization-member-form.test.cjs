const assert = require("node:assert/strict");
const fs = require("node:fs");
const { createRequire } = require("node:module");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

// Run the existing TypeScript modules without introducing a frontend test runner.
function loadTs(relativePath, dependencies = {}, globals = {}) {
  const filename = path.resolve(__dirname, "../src", relativePath);
  const nativeRequire = createRequire(filename);
  const module = { exports: {} };
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  vm.runInNewContext(
    outputText,
    {
      exports: module.exports,
      module,
      require: id =>
        Object.hasOwn(dependencies, id) ? dependencies[id] : nativeRequire(id),
      ...globals,
    },
    { filename },
  );
  return module.exports;
}

const {
  getMemberChanges,
  normalizeMember,
  isSameStudent,
  hasCommitteeMetadata,
} = loadTs("features/organization-manage/services/memberForm.ts");

const initialMembers = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  studentId: `2021000${index}`,
  name: `위원 ${index + 1}`,
  role: 2,
  startDate: "2026-01-01",
  endDate: "",
}));
const countChanges = changes =>
  changes.createdRows.length +
  changes.updatedRows.length +
  changes.deletedRows.length;

test("registering empty metadata does not mark five existing members as changed", () => {
  const registeredMembers = initialMembers.map(member => ({
    ...member,
    title: undefined,
    legalBasis: "",
  }));
  assert.equal(
    countChanges(getMemberChanges(initialMembers, registeredMembers)),
    0,
  );
});

test("one added member counts once while metadata is edited; removing it undoes the change", () => {
  const newMember = { ...initialMembers[0], id: -1, name: "신규 위원" };
  const added = [...initialMembers, newMember];
  assert.equal(countChanges(getMemberChanges(initialMembers, added)), 1);
  added[5] = { ...newMember, title: "위원", legalBasis: "회칙 제3조" };
  const changes = getMemberChanges(initialMembers, added);
  assert.equal(changes.createdRows.length, 1);
  assert.equal(changes.updatedRows.length, 0);
  assert.equal(countChanges(changes), 1);
  assert.equal(
    countChanges(getMemberChanges(initialMembers, added.slice(0, 5))),
    0,
  );
});

test("restoring an existing member clears its change and whitespace is normalized", () => {
  const original = {
    ...initialMembers[0],
    title: "위원",
    legalBasis: "회칙 제3조",
  };
  assert.equal(
    countChanges(
      getMemberChanges([original], [{ ...original, title: "의장" }]),
    ),
    1,
  );
  assert.equal(
    countChanges(getMemberChanges([original], [{ ...original }])),
    0,
  );
  const padded = { ...original, title: " 위원 ", legalBasis: " 회칙 제3조 " };
  assert.equal(countChanges(getMemberChanges([original], [padded])), 0);
  assert.equal(normalizeMember(padded).title, "위원");
  assert.equal(normalizeMember(padded).legalBasis, "회칙 제3조");
});

test("both metadata fields are required, including whitespace-only values", () => {
  for (const [title, legalBasis] of [
    [undefined, undefined],
    ["", "회칙"],
    ["위원", ""],
    [" \t", "회칙"],
    ["위원", "\n "],
  ]) {
    assert.equal(
      hasCommitteeMetadata({ ...initialMembers[0], title, legalBasis }),
      false,
    );
  }
  assert.equal(
    hasCommitteeMetadata({
      ...initialMembers[0],
      title: " 위원 ",
      legalBasis: " 회칙 ",
    }),
    true,
  );
});

test("student matching detects repeated selections independently of row ID", () => {
  const student = initialMembers[0];
  assert.equal(isSameStudent(student, { ...student, id: -1 }), true);
  assert.equal(
    isSameStudent(student, { ...student, name: "다른 학우" }),
    false,
  );
  assert.equal(
    isSameStudent(student, { ...student, studentId: "20220000" }),
    false,
  );
});

test("committing a new membership preserves the UI identity even when DB IDs overlap", () => {
  const savedMember = {
    ...initialMembers[0],
    id: -1,
    membershipId: initialMembers[0].id,
    name: "신규 위원",
    title: "위원",
    legalBasis: "회칙 제3조",
  };
  const committed = [...initialMembers, savedMember];
  const changes = getMemberChanges(
    committed,
    committed.map(member => ({ ...member })),
  );
  assert.equal(countChanges(changes), 0);
  const nextMember = {
    ...savedMember,
    id: -2,
    membershipId: undefined,
    name: "다음 위원",
  };
  const nextChanges = getMemberChanges(committed, [...committed, nextMember]);
  assert.equal(nextChanges.createdRows.length, 1);
  assert.equal(nextChanges.createdRows[0].id, -2);
  assert.equal(nextChanges.deletedRows.length, 0);
});

test("mutation errors distinguish missing presidency from duplicate registration", () => {
  const dependencies = Object.fromEntries(
    [5, 6, 7, 8, 9, 10, 12, 13, 16, 17, 18, 19, 20, 21, 22].map(id => [
      `@sparcs-students/interface/api/organization/endpoint/apiOrg${String(id).padStart(3, "0")}`,
      {},
    ]),
  );
  dependencies["@sparcs-students/web/lib/axios"] = {};
  const { getOrganizationMutationErrorMessage } = loadTs(
    "features/organization-manage/api/organizationApi.ts",
    dependencies,
  );
  const { AxiosError } = createRequire(
    path.resolve(__dirname, "../package.json"),
  )("axios");
  const conflict = message =>
    new AxiosError("Conflict", undefined, undefined, undefined, {
      status: 409,
      data: { message },
    });
  assert.match(
    getOrganizationMutationErrorMessage(
      conflict("Not a president of this organization"),
    ),
    /단체장 권한/,
  );
  assert.match(
    getOrganizationMutationErrorMessage(conflict("duplicated member")),
    /이미 등록/,
  );
  assert.doesNotMatch(
    getOrganizationMutationErrorMessage(new Error("private server detail")),
    /private server detail/,
  );
});

function authHarness({ refreshSucceeds = false, referrer = "" } = {}) {
  const tokens = new Map([
    ["accessToken", "expired"],
    ["responseToken", "expired"],
  ]);
  const location = {
    href: "http://localhost:3000/organization-manage",
    origin: "http://localhost:3000",
  };
  let refreshCalls = 0;
  let backCalls = 0;
  const { default: interceptor } = loadTs(
    "lib/_axios/axiosErrorInterceptor.ts",
    {
      "@sparcs-students/web/utils/localStorage": {
        removeLocalStorageItem: key => tokens.delete(key),
        setLocalStorageItem: (key, value) => tokens.set(key, value),
      },
      "@sparcs-students/web/utils/logger": { log() {}, error() {} },
      "./postRefresh": async () => {
        refreshCalls += 1;
        if (!refreshSucceeds) throw new Error("Refresh expired");
        return { accessToken: "renewed" };
      },
    },
    {
      window: {
        location,
        history: {
          back: () => {
            backCalls += 1;
          },
        },
      },
      document: { referrer },
    },
  );
  return {
    interceptor,
    location,
    tokens,
    get refreshCalls() {
      return refreshCalls;
    },
    get backCalls() {
      return backCalls;
    },
  };
}

async function rejectAuth(harness, status, preserveFormOnAuthError) {
  const error = { response: { status }, config: { preserveFormOnAuthError } };
  await assert.rejects(
    harness.interceptor.onRejected(error),
    rejected => rejected === error,
  );
}

test("401 form preservation still attempts refresh and removes invalid tokens", async () => {
  const harness = authHarness();
  await rejectAuth(harness, 401, true);
  assert.equal(harness.refreshCalls, 1);
  assert.equal(harness.tokens.size, 0);
  assert.equal(
    harness.location.href,
    "http://localhost:3000/organization-manage",
  );
  assert.equal(harness.backCalls, 0);
});

test("403 form preservation rejects without navigation or token changes", async () => {
  const harness = authHarness({ referrer: "http://localhost:3000/my" });
  await rejectAuth(harness, 403, true);
  assert.equal(
    harness.location.href,
    "http://localhost:3000/organization-manage",
  );
  assert.equal(harness.backCalls, 0);
  assert.equal(harness.refreshCalls, 0);
  assert.equal(harness.tokens.get("accessToken"), "expired");
});

test("successful token refresh remains enabled for preserved forms", async () => {
  const harness = authHarness({ refreshSucceeds: true });
  await rejectAuth(harness, 401, true);
  assert.equal(harness.tokens.get("accessToken"), "renewed");
  assert.equal(
    harness.location.href,
    "http://localhost:3000/organization-manage",
  );
});

test("requests without preservation retain existing authentication navigation", async () => {
  const unauthorized = authHarness();
  await rejectAuth(unauthorized, 401);
  assert.equal(unauthorized.location.href, "/");

  const forbidden = authHarness({ referrer: "http://localhost:3000/my" });
  await rejectAuth(forbidden, 403);
  assert.equal(forbidden.backCalls, 1);

  const externalReferrer = authHarness({ referrer: "https://example.com" });
  await rejectAuth(externalReferrer, 403);
  assert.equal(externalReferrer.location.href, "/");
});
