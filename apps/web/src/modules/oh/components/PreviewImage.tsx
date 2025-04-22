import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { PictureOutlined } from '@ant-design/icons';
import { GrClose } from 'react-icons/gr';
import { Popover } from 'antd';
import Dialog from '@common/components/Dialog';
import Upload from '@modules/oh/components/Upload';
import { toast } from 'react-hot-toast';

const PreviewImage = ({ report }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const imageList = report?.architectureDiagrams.map((item) => {
    return {
      uid: item.id,
      name: item.filename,
      status: 'done',
      url: item.url,
    };
  });
  return (
    <>
      {report?.architectureDiagrams.length > 0 && (
        <Popover content={'查看架构图'}>
          <PictureOutlined
            onClick={() => {
              setOpenConfirm(true);
            }}
          />
        </Popover>
      )}
      <Dialog
        open={openConfirm}
        classes={{
          paper: classnames(
            'border w-[65%] !max-w-[65%] min-h-[400px] !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogTitle={
          <>
            <p className="">{report?.name} 架构图</p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={
          <div className="w-full">
            <Upload imageList={imageList} readonly={true} />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export default PreviewImage;
