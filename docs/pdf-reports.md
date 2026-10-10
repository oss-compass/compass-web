# PDF report delivery phases

Related: [compass-web #73](https://github.com/oss-compass/compass-web/issues/73).
This issue also requests email delivery and a GPG signature. The browser-print
phase below does **not** close it.

## Phase 1: printable model and metric snapshots

On the analysis report, choose the projects, date range, community repository
type and page language, then select **Print report / Save as PDF**. Select one
model or all models in the current collaboration/contributor topic, prepare the
preview, and use **Print / Save as PDF**. The browser supplies the PDF save dialog.

The report contains the four collaboration models (44 metric series, including
variants normally selected through chart tabs) or the three contributor models
(19 series). It includes a cover with the captured conditions and preparation
time, vector trend charts, and each project's last available value with its
observation date. The fixed report layout uses original 0-1 scores/ratios and
unconnected gaps for missing observations; time-since-last-update is converted
from months to days using the existing 30-day convention. A genuine zero remains
zero. An empty metric remains in the report with an explicit no-data message.
The bug-issue-duration series uses the API's `bugIssueOpenTimeAvg/Mid` fields.

This is a **model/metric trend report**, not a copy of every interactive widget.
The preview and cover explain the scope. It excludes the 3D distribution,
current/all-time insight totals, paginated contributor/issue/PR records and
population reference lines. Per-card zoom, tab and display settings do not
change its documented scales or content. PNG/SVG card sharing and CSV export
remain separate actions.

### Snapshot and failure behavior

- The entry captures the effective date bounds from `useQueryDateRange`, not a
  relative range that could be reinterpreted when printing. Contributor range
  verification must finish before capture. The API filters before aggregation,
  so returned bucket labels are retained even if the first bucket starts before
  the requested start; the cover explains this interval-label convention. It also captures the
  project identities, topic, repository filter and current language. Navigation
  and changes behind the dialog do not rewrite that selection.
- Preparation re-verifies **every** selected project's identity/status and
  requests the existing `metric` or `metricContributor` query once per project.
  It does not read filtered/stale chart-provider state or a partially populated
  cache. Any failed request or missing model array prevents publication of the
  entire preview. Empty arrays are successful no-data results.
- Data and conditions are copied into a browser-owned snapshot. SVG generation
  uses that snapshot, yields between metrics, disables animation, and disposes
  each ECharts instance. No viewport scrolling or lazy chart loading is needed.
- Preparation has a 30-second deadline covering requests, chart rendering and
  image/font readiness. Changing the selected model, closing the dialog or
  reaching the deadline aborts the job. A late result cannot replace another
  preview. Failures allow a new preparation attempt.
- The isolated, script-free iframe contains its own print CSS, embedded SVG
  images and system fonts. Printing is enabled only after its images decode and
  fonts are ready. The original analysis document is not modified. Escape also
  closes the dialog when focus is inside the preview.
- This is an immutable **client capture**, not a server-wide atomic database
  snapshot. Different project queries can observe different service update
  moments. The cover says "Snapshot prepared at", not "analysis completed at".
  Existing status APIs only establish their current analysis readiness contract;
  this feature does not claim to solve insight-specific readiness (#285).

Metric/model names reuse the pinned i18n submodule. New report labels use
`analyze:report_pdf.*` with colocated English/Chinese defaults, so this PR does not
depend on an unmerged translation commit. Catalog entries with those keys take
precedence when added upstream. No submodule URL or revision changes are needed.

### Validation

Automated tests cover real GraphQL documents and translation keys, frozen
selection/data, exact request parameters, both topics, zero/null/empty data,
comparison failures, status gating, cancellation, timeout, asset readiness,
HTML escaping and chart disposal. Browser QA should exercise the actual dialog,
GraphQL transport and SVG renderer with controlled responses, then print the
same generated document in Chrome and inspect the resulting PDF pages.

Manual acceptance:

1. Open an English and a Chinese analysis report; select dates and prepare a
   single model and an all-model report. Check the cover against those inputs.
2. Print to A4/PDF. Check the last metric as well as the first, readable Chinese,
   chart/table alignment, long project names, model page breaks and empty data.
3. Compare projects with zeros and missing dates. A missing sample must not turn
   into zero, and the last-value table must show its actual observation date.
4. Simulate an API failure, incomplete analysis and stalled preparation. Printing
   must stay unavailable until a complete retry succeeds.
5. Change models or close during preparation. Verify cancellation and that an
   older response never replaces the new preview. Check keyboard focus/closing,
   including Escape from inside the iframe.

The local sparse checkout may prevent a full Next.js build because public data
and image resources are not checked out. Targeted checks or a fixture browser
harness must not be described as a successful full application build.

## Phase 2: server-generated PDF jobs and downloads (not implemented)

No PDF generation job/download contract was found in the current
`compass-web-service` GraphQL operations during implementation. The following is
a **proposed contract for discussion**, not an endpoint called by this PR.
Backend and frontend maintainers need to agree on it before connecting a job UI.

- Create a job from validated project identities, absolute dates, model IDs,
  repository type, language and a versioned report format. The service must
  apply the same access/date restrictions as interactive queries. Do not trust
  client-supplied metric values as an authoritative report.
- Capture the selected data once and persist an immutable `snapshotId` with its
  schema version and capture time. Generation/retries/downloads must refer to
  that snapshot rather than re-running queries for each output.
- Return `jobId`, `snapshotId`, and a state from `queued`, `running`, `ready`,
  `failed`, `expired`. Status responses include timestamps and a stable error
  code. A ready result includes a download URL, expiry, content type, file name,
  byte length and SHA-256 digest. Polling ends at terminal states and should be
  bounded/backed off. Repeated submissions need an idempotency key.
- Use the service's worker infrastructure for font installation, chart/asset
  readiness, execution limits, retry policy and cleanup. Fonts must cover both
  languages. Test large comparisons, absent metrics, worker timeout, repeated
  requests and expired download links.
- Assign ownership for the schema, worker/storage lifecycle, snapshot format and
  report rendering version. Reuse phase-1 model definitions/layout where useful;
  the current frontend renderer alone does not provide queueing or storage.

## Phase 3: email delivery and GPG signatures (not implemented)

This requires backend work and deployment configuration in addition to the PDF
job contract. The frontend should only request operations and display results.

- Deliver the exact completed PDF identified by `snapshotId` and digest. Validate
  the destination and caller's access on the service, queue delivery, and expose
  delivery failure/retry status without regenerating different report bytes.
- Produce a detached GPG signature over the final PDF bytes on the service.
  Return the signature download, signing-key fingerprint and verification
  instructions. Publish the verification public key through an agreed channel.
  Private signing keys and email credentials never enter a browser bundle.
- Define storage/retention, signing-key rotation, delivery retry/idempotency and
  access to expired artifacts before exposing those controls. Verify a downloaded
  PDF/signature pair end to end and verify that modified bytes fail validation.

Only close #73 when generation/download, email delivery and signature verification
are complete, or when maintainers explicitly reduce the issue's scope.
