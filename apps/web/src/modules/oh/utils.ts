import { getPathname } from '@common/utils';

export const setUrlHost = (url) => {
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  } else {
    return `//${url}`;
  }
};

export const openGiteeIssue = (report, values) => {
  let name = report
    .map((item) => {
      return getPathname(item.codeUrl);
    })
    .join('、');
  let upstream = report
    .map((item) => {
      return item.codeUrl;
    })
    .join(' 、 ');
  let projectId = report
    .map((item) => {
      return item.shortCode;
    })
    .join('..');
  let reportLink = `https://oss-compass.org/oh#reportDetailPage?projectId=${projectId}`;
  let title = `【TPC】【孵化选型申请】${
    values?.targetSoftware || name
  } 申请进入 OpenHarmony TPC 沙箱选型项目`;

  let body = `
  1. 【需求来源】

  > ${values.demandSource || '无'}

  2. 【需求背景】

  > ${values.reason}

  3. 【功能描述】

  > ${values.functionalDescription}
  
  4. 【上游地址】
  
  > ${upstream}
  
  5. 【报告链接】

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
