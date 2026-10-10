# Synthetic fixtures and dataset change review

Issue [#386](https://github.com/oss-compass/compass-web/issues/386) and merged
PR [#406](https://github.com/oss-compass/compass-web/pull/406) concerned one
removed file. This follow-up supplies reproducible API test data and a review
gate for future changes. It does not claim that existing data contains a new
privacy issue, audit repository history, or replace publication review.
Path validation from [#387](https://github.com/oss-compass/compass-web/pull/387)
remains in place.

## Which files are runtime resources?

The name `public/test` does **not** mean that its contents are private unit-test
fixtures. Next.js exposes that directory as static `/test/...` resources.
Current source also consumes it through these paths:

| Location                                                                                      | Current consumers                                                                                                 | Treatment in this change                                                                        |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `apps/web/public/test/intelligent-analysis-new/<dataset>/*`, `*_backup.json`, `*_detail.json` | Project `user-detail`, `participant-details`, `developers`, `organizations`, and `regions` APIs; overview fetches | Runtime data. Preserve existing files, URLs, filename precedence, and response shapes.          |
| `apps/web/public/test/intelligent-analysis-new/*.csv`                                         | Governance platform repository table                                                                              | Runtime resources; review updates individually.                                                 |
| `apps/web/public/test/contributor_model`, `repo_model`, `collaborator_model`                  | `os-situation` category charts and dependency wheel                                                               | Runtime visualization resources; do not bulk-delete as “test data.”                             |
| Other existing `apps/web/public/test` files                                                   | Requires consumer lookup for each proposed change                                                                 | Unclassified legacy resources, not automatically certified synthetic or unused.                 |
| `apps/web/test-fixtures/intelligent-analysis/user-detail/*.json`                              | `userDetailFixtures.test.ts`                                                                                      | New synthetic test-only files, outside Next.js `public`; not registered as production datasets. |

The change gate covers **all file types** under `apps/web/public/test/` and
`apps/web/test-fixtures/`. Source-embedded datasets (for example `rawdata`), other
public directories, external services, and Git history are outside this first
scope. Extending the scope requires a separate consumer inventory.

## Reproduce the user-detail sample

From the repository root, with Node 18 or newer:

```bash
yarn fixtures:generate
node scripts/fixtures/generate.js --check
yarn fixtures:test
yarn workspace @oss-compass/web test:ci --runInBand userDetailFixtures
```

`scripts/fixtures/generate.js` is the source of truth. It uses only fixed,
manually authored values, including `synthetic:developer-*` identifiers, clearly
fictional display names, and `example.test` email/URL values. It reads no
exported records, environment variables, network responses, random seed, or
clock. Do not seed it with an existing person's record and redact a few fields.
Identity fields are allowed: the distinction is their origin and publication
basis, not the presence of a name/email field.

The three files exercise `GET /api/intelligent-analysis/projects/[dataset]/user-detail`:

| Fixture         | Temporary runtime filename used by the integration test | Expected behavior                                                                |
| --------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `main.json`     | `<dataset>/synthetic_developer-001_main.json`           | Main-file precedence; valid zero, null, and an empty breakdown remain unchanged. |
| `fallback.json` | `<dataset>/synthetic_developer-002.json`                | Filename fallback; positive fractional score.                                    |
| `backup.json`   | `<dataset>_backup.json`                                 | Matching row is wrapped under its user ID, preserving the API response shape.    |

Tests copy these files into a newly created temporary directory, call the real
route handler with real filesystem reads, and remove only that test directory.
They exercise both supported working-directory layouts, cache headers, 404/500,
method validation, and traversal rejection. No production fixture, route, or
static URL is edited to run them. These are route integration tests, not a full
dashboard end-to-end test.

## Review a new or modified dataset

1. Prefer generating a small synthetic example when testing is the purpose.
   For the three generated files, edit the generator and regenerate. CI compares
   their committed bytes to its output; a manual review entry cannot bypass this.
2. For another file in either covered directory, add an exact-path entry to
   `scripts/fixtures/reviews.json`. Record why it is needed, how it was produced,
   and why its **contents** may be published. A publicly reachable upstream URL
   alone is not a substitute for that assessment. Use `synthetic-sample` for
   authored examples or `runtime-data` for intentionally published runtime data.
3. Compute SHA-256 after the final edit, then include the data and review record
   in the same commit. Any later byte change invalidates that review hash.
4. Run the check on committed revisions. Reviewers inspect the data, generation
   code, and publication basis together; the script cannot verify a declaration's
   truth or grant permission to publish data.

Example review entry (replace the example path, hash and explanations):

```json
{
  "version": 1,
  "files": [
    {
      "path": "apps/web/public/test/synthetic-example.json",
      "sha256": "<64 lowercase hexadecimal characters from the exact file bytes>",
      "kind": "synthetic-sample",
      "purpose": "Exercise the example API's empty contribution case.",
      "provenance": "Authored from the API contract without copying contributor records.",
      "publicationBasis": "Fictional identities only; example.test contact values."
    }
  ]
}
```

Calculate a hash without printing the file contents:

```bash
node -e 'const fs = require("node:fs"); const crypto = require("node:crypto"); console.log(crypto.createHash("sha256").update(fs.readFileSync(process.argv[1])).digest("hex"))' apps/web/public/test/synthetic-example.json

# Check committed PR changes from their common ancestor with main.
yarn fixtures:check --base origin/main --head HEAD
```

Run the command from the branch being reviewed: the checker and generator come
from that checkout. Dataset bytes and review records are read from Git objects
at the selected head, not uncommitted working files.
It checks added/modified files and type changes. Rename/copy destinations count
as additions; pure deletion needs no review entry. It does not read unchanged
legacy dataset contents. Exact paths (no glob exemptions), SHA-256, classification,
purpose, provenance, and publication basis are required. Delete obsolete review
entries when removing their files. Symbolic links/submodules and files larger
than 25 MiB fail with a bounded-read error; split large samples or propose a
reviewed extension of this limit rather than adding a blanket exemption.

Errors use ordinal numbers and fixed messages, without echoing data values,
filenames, Git errors, or JSON parser fragments. To locate a failed change
locally, list paths in the same Git order:

```bash
git diff --name-only --no-renames --diff-filter=ACMT origin/main...HEAD -- apps/web/public/test/ apps/web/test-fixtures/
```

The separate `Dataset changes` PR workflow runs without Yarn installation,
submodules, or a full public-data checkout. It uses the proposed merge commit
and its base parent (checkout depth 2), so target-branch-only changes are not
mistaken for PR changes. Missing commits/manifest fail the check instead of
silently skipping it. Existing Jest/build CI remains unchanged. Fork workflows
may need the repository maintainer's usual approval; enabling this check as a
required branch-protection status is a maintainer decision.
