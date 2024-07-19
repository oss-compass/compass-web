import { getPathname } from '@common/utils';

export const setUrlHost = (url) => {
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  } else {
    return `//${url}`;
  }
};
function moveToFirst(arr, target) {
  const index = arr.indexOf(target);
  if (index !== -1) {
    arr.splice(index, 1);
    arr.unshift(target);
  }
  return arr;
}

const getTargetReportInfo = (report, target) => {
  let targetReport = report.find((r) => getPathname(r.codeUrl) === target);
  let projectIds = report.map((item) => {
    return item.shortCode;
  });
  const projectId = moveToFirst(projectIds, targetReport?.shortCode).join('..');

  let upstream = '';
  let codeUrls = report.map((item) => {
    return item.codeUrl;
  });
  if (codeUrls.length === 1) {
    upstream = codeUrls.join(' 、 ');
  } else {
    let sortCodeUrls = moveToFirst(codeUrls, targetReport.codeUrl);
    let targetUrl = sortCodeUrls[0];
    sortCodeUrls.shift();
    upstream = `目标软件上游地址：${targetUrl}
    对比软件上游地址：${sortCodeUrls.join(' 、 ')}`;
  }
  let tpcSoftwareSigId = targetReport?.tpcSoftwareSig?.name || '';
  return {
    upstream,
    projectId,
    tpcSoftwareSigId,
  };
};
export const openGiteeIssue = (report, values, id) => {
  let name = report
    .map((item) => {
      return getPathname(item.codeUrl);
    })
    .join('、');
  const { upstream, projectId, tpcSoftwareSigId } = getTargetReportInfo(
    report,
    values.targetSoftware
  );
  let reportLink = `${window.location.origin}/oh#reportDetailPage?taskId=${id}&projectId=${projectId}`;
  let title = `【TPC】【孵化选型申请】${
    values?.targetSoftware || name
  } 申请进入 OpenHarmony TPC 孵化项目`;

  let body = `
  1. 【目标孵化软件】

  > ${values.targetSoftware}

  2. 【需求描述】

  > ${values.reason}

  3. 【功能描述】

  > ${values.functionalDescription}

  4. 【孵化周期】

  > ${values.incubationTime}

  5. 【Commiters】

  > ${values.committers}

  6. 【所属领域】

  > ${tpcSoftwareSigId}
  
  7. 【上游地址】
  
  > ${upstream}
  
  8. 【报告链接】

  > ${reportLink}
  `;

  try {
    window.open(
      `https://gitee.com/openharmony-tpc/docs/issues/new?title=${title}&description=${encodeURIComponent(
        body
      )}`
    );
  } catch (error) {
    console.error(error);
  }
};
