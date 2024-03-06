import axios from 'axios';

export enum Status {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  UNKNOWN = 'unknown',
}
export const apiDownloadFiles = (path, fileName, onFinish) => {
  let link = document.createElement('a');
  link.href = path;
  link.download = fileName + '.csv';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  onFinish && onFinish();
  document.body.removeChild(link);
};
export const getContributorPolling = (uuid) => {
  return axios.get(
    '/api/v1/contributor/export_state/' + uuid + '?t=' + new Date().getTime()
  );
};
export const getContributorExport = (query) => {
  return axios.post('/api/v1/contributor/export', query, {
    headers: {
      accept: 'application/json',
    },
  });
};
export const getIssuePolling = (uuid) => {
  return axios.get(
    '/api/v1/issue/export_state/' + uuid + '?t=' + new Date().getTime()
  );
};
export const getIssueExport = (query) => {
  return axios.post('/api/v1/issue/export', query, {
    headers: {
      accept: 'application/json',
    },
  });
};
export const getPrPolling = (uuid) => {
  return axios.get(
    '/api/v1/pull/export_state/' + uuid + '?t=' + new Date().getTime()
  );
};
export const getPrExport = (query) => {
  return axios.post('/api/v1/pull/export', query, {
    headers: {
      accept: 'application/json',
    },
  });
};
