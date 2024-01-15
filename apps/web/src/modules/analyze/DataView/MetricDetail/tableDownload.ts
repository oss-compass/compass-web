import axios from 'axios';

const apiDownloadFiles = (res, fileName) => {
  if (res.data.type === 'application/json') {
    // this.$message({
    //   type: 'error',
    //   message: '下载失败，文件不存在或权限不足',
    // });
  } else {
    let blob = new Blob([res.data]);
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName + '.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
};

export const contributorDownload = (query, fileName) => {
  return axios
    .post('/api/v1/contributor/export', query, {
      headers: {
        accept: 'application/json',
      },
    })
    .then((res) => {
      apiDownloadFiles(res, fileName);
    });
};
export const issueDownload = (query, fileName) => {
  return axios
    .post('/api/v1/contributor/export', query, {
      headers: {
        accept: 'application/json',
      },
    })
    .then((res) => {
      apiDownloadFiles(res, fileName);
    });
};
export const prDownload = (query, fileName) => {
  return axios
    .post('/api/v1/contributor/export', query, {
      headers: {
        accept: 'application/json',
      },
    })
    .then((res) => {
      apiDownloadFiles(res, fileName);
    });
};
