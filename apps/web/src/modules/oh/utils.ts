import { getPathname } from '@common/utils';

export const setUrlHost = (url) => {
  if (!url) return url;
  if (url?.startsWith('http') || url?.startsWith('https')) {
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
export const getProjectId = (report, target) => {
  let targetReport = report.find((r) => getPathname(r.codeUrl) === target);
  let projectIds = report.map((item) => {
    return item.shortCode;
  });
  const res = moveToFirst(projectIds, targetReport?.shortCode).join('..');
  return res;
};
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
// autocorrect: false
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
  let reportLink = `https://oss-compass.org/oh#reportDetailPage?taskId=${id}&projectId=${projectId}`;
  let title = `【孵化选型申请】【${tpcSoftwareSigId}】【待TPC SIG评审】${
    values?.targetSoftware || name
  } 申请进入孵化项目`;

  let body = `
  1. 【目标孵化软件】

  > ${values.targetSoftware}

  2. 【需求描述】

  > ${values.reason}

  3. 【功能描述】

  > ${values.functionalDescription}

  4. 【孵化周期】

  > ${values.incubationTime}

  5. 【Committers】

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
export const openGraduationIssue = (report, values, id) => {
  let name = report
    .map((item) => {
      return getPathname(item.codeUrl);
    })
    .join('、');
  values.targetSoftware = report[0];
  const { upstream, projectId, tpcSoftwareSigId } = getTargetReportInfo(
    report,
    getPathname(values.targetSoftware.codeUrl)
  );
  let targetName = getPathname(values.targetSoftware.codeUrl);
  let reportLink = `https://oss-compass.org/oh#graduationReportPage?taskId=${id}&projectId=${projectId}`;
  let title = `【毕业申请】【${tpcSoftwareSigId}】【待TPC SIG评审】${targetName} 申请进入毕业项目`;

  let body = `
  1. 【毕业软件】

  > ${targetName}

  2. 【需求来源】

  > ${values.demandSource}

  3. 【Committers】

  > ${values.committers}

  4. 【所属领域】
  
  > ${tpcSoftwareSigId}

  5. 【仓库地址】

  > ${upstream}

  6. 【报告链接】

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
