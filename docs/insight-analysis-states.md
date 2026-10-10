# Insight analysis states

The analysis pages use `analysisStatusVerify` for **project-level** task status. A metric value (including zero) must never be used to infer task progress.

| Input                                          | Presentation                                                 | Recovery                                                   |
| ---------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Status request has no response yet             | Loading skeleton                                             | Wait for the request                                       |
| `pending` or `progress`                        | Existing under-analysis message; do not mount metric queries | Poll status every 5 seconds while the page is active       |
| Status request fails                           | Error with retry; not a 404 or empty data                    | Refetch status                                             |
| `error`, `canceled`, or an unknown task status | Error with retry; do not mount metric queries                | Recheck status; this does not submit another analysis task |
| `unsubmit` or an unresolved label              | Existing report-not-found page                               | Choose another report                                      |
| `success`, dashboard request loading           | Loading skeleton                                             | Wait for the dashboard response                            |
| `success`, dashboard request fails             | Error with retry; no fabricated zeroes                       | Refetch the dashboard                                      |
| `success`, no dashboard values                 | No data available                                            | Choose another report or date range                        |
| `success`, partial dashboard data              | Keep missing values as placeholders                          | Display the available fields                               |
| `success`, numeric zero                        | Display `0`, including `0% (0)`                              | No recovery needed                                         |

Status query results are read directly from the active query observers. All comparison reports must be accounted for before rendering results; a failed or missing report is not silently removed. Previous query data is disabled for status, dashboard, and date-verification queries so changing reports or ranges cannot reuse a previous query's result. Late responses remain attached to their original query keys. Polling stops on success, terminal task states, and request errors.

The shared status gate protects the report view and the insight detail route. Detail date-verification failures also have a retry action. Individual detail charts and tables retain their existing data-query behavior; the metric-value and metric-request changes in this patch apply to the insight overview dashboard.

## Backend contract and remaining gap in #285

Checked against compass-web-service commit `457abf91c43548875b309d9001b3ad2ca71c6ce8`:

- [AnalysisStatusVerifyQuery](https://github.com/oss-compass/compass-web-service/blob/457abf91c43548875b309d9001b3ad2ca71c6ce8/app/graphql/types/queries/analysis_status_verify_query.rb) returns `success` as soon as an Activity, Community, Codequality, or GroupActivity metric exists. It only checks the scheduler task when no such metric exists.
- [AnalysisStatusQuery](https://github.com/oss-compass/compass-web-service/blob/457abf91c43548875b309d9001b3ad2ca71c6ce8/app/graphql/types/queries/analysis_status_query.rb) has the same shortcut, so switching to this query would not solve the gap.
- [VerifyDetailDataRangeQuery](https://github.com/oss-compass/compass-web-service/blob/457abf91c43548875b309d9001b3ad2ca71c6ce8/app/graphql/types/queries/verify_detail_data_range_query.rb) returns a date/permission validation boolean, not a task state. `false` must not be interpreted as “analysis in progress.”
- [ProjectTask](https://github.com/oss-compass/compass-web-service/blob/457abf91c43548875b309d9001b3ad2ca71c6ce8/app/models/project_task.rb) defines `pending`, `progress`, `success`, `error`, `canceled`, and `unsubmit` (some GraphQL descriptions misspell the last value).

Consequently, this frontend change does **not** prove deep-insight readiness after project-level `success`, and does not fully resolve [#285](https://github.com/oss-compass/compass-web/issues/285). The backend needs an explicit insight-stage status tied to the current report/task before the frontend can distinguish “basic metrics ready, enrichment still running” from “completed with genuine zeroes.” It must also identify task failure and completion independently of whether metric documents already exist. No new endpoint or field is assumed in this change.

## Regression coverage

`MetricDashboard.test.tsx` uses real React Query observers and generated GraphQL hooks with a mocked transport. It covers loading, pending/progress polling, terminal and unknown task states, request failures and retries, comparison completeness, empty/partial data, valid zeroes, report changes, and late date-range responses. `MetricDetail/index.test.tsx` verifies the route gate and failed date-verification retries without interpreting the permission boolean as task progress.
