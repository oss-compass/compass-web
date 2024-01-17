import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { AiOutlineLoading } from 'react-icons/ai';
import { useRequest } from 'ahooks';
import {
  apiDownloadFiles,
  Status,
} from '@modules/analyze/DataView/MetricDetail/tableDownload';

// 对象驼峰转下划线
const objectHumpToLine = (obj) => {
  var newObj = new Object();
  for (let key in obj) {
    newObj[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = obj[key];
  }
  return newObj;
};
const Download = ({
  beginFun,
  pollingFun,
  query,
  fileName,
}: {
  beginFun: (query) => Promise<any>;
  pollingFun: (uuid) => Promise<any>;
  query: any;
  fileName: string;
}) => {
  const newQuery = objectHumpToLine(query);
  newQuery['sort_opts'] && (newQuery['sort_opts'] = [newQuery['sort_opts']]);

  const [loadingDownLoad, setLoadingDownLoad] = useState(false);
  const downloadFinish = () => setLoadingDownLoad(false);
  const { run, cancel } = useRequest(pollingFun, {
    pollingInterval: 3000,
    pollingWhenHidden: false,
    manual: true,
    onSuccess: ({ data }, params) => {
      if (data.status === Status.COMPLETE && data.downdload_path) {
        apiDownloadFiles(data.downdload_path, fileName, downloadFinish);
        cancel();
      } else if (data.status === Status.UNKNOWN) {
        downloadFinish();
        cancel();
        throw new Error('Download Error');
      }
    },
  });
  const downloadFun = async () => {
    try {
      const { data } = await beginFun(newQuery);
      if (data.code === 200 && data.status === Status.PENDING) {
        setTimeout(() => {
          run(data.uuid);
        }, 2000);
      } else if (data.status === Status.COMPLETE && data.downdload_path) {
        apiDownloadFiles(data.downdload_path, fileName, downloadFinish);
      } else {
        throw new Error('Download Error');
      }
    } catch (e) {
      console.log(e);
      downloadFinish();
    }
  };
  return (
    <>
      <div className="flex h-7 w-10 cursor-pointer items-center justify-center rounded-sm border border-[#3f60ef] text-xs text-[#3f60ef]">
        {loadingDownLoad ? (
          <AiOutlineLoading className="t animate-spin" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={async () => {
              setLoadingDownLoad(true);
              await downloadFun();
            }}
          >
            <BsDownload />
          </div>
        )}
      </div>
    </>
  );
};
export default Download;
