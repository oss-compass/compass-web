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

export const getProjectId = (report, target) => {
  let targetReport = report.find((r) => getPathname(r.codeUrl) === target);
  let projectIds = report.map((item) => {
    return item.shortCode;
  });
  const res = moveToFirst(projectIds, targetReport.shortCode).join('..');
  return res;
};
const getUpstream = (report, target) => {
  let codeUrls = report.map((item) => {
    return item.codeUrl;
  });
  if (codeUrls.length === 1) {
    return codeUrls.join(' 、 ');
  } else {
    let targetReport = report.find((r) => getPathname(r.codeUrl) === target);
    let sortCodeUrls = moveToFirst(codeUrls, targetReport.codeUrls);
    let targetUrl = sortCodeUrls[0];
    sortCodeUrls.shift();
    // return sortCodeUrls.join(' 、 ');
    return `目标上游地址：${targetUrl}
    对比上游地址：${sortCodeUrls.join(' 、 ')}`;
  }
};
export const openGiteeIssue = (report, values) => {
  let name = report
    .map((item) => {
      return getPathname(item.codeUrl);
    })
    .join('、');
  let upstream = getUpstream(report, values.targetSoftware);
  // report
  //   .map((item) => {
  //     return item.codeUrl;
  //   })
  //   .join(' 、 ');
  let projectId = getProjectId(report, values.targetSoftware);
  // .map((item) => {
  //   return item.shortCode;
  // })
  // .join('..');
  let reportLink = `https://oss-compass.org/oh#reportDetailPage?projectId=${projectId}`;
  let title = `【TPC】【孵化选型申请】${
    values?.targetSoftware || name
  } 申请进入 OpenHarmony TPC 孵化项目`;

  let body = `
  1. 【需求描述】

  > ${values.reason}

  2. 【功能描述】

  > ${values.functionalDescription}

  3. 【孵化周期】

  > ${values.incubationTime}

  4. 【引入方式】

  > ${values.adaptationMethod}

  5. 【Commiters】

  > ${values.committers}
  
  6. 【上游地址】
  
  > ${upstream}
  
  7. 【报告链接】

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
