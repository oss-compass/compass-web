import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { toast } from 'react-hot-toast';
import { convertBase64 } from '@common/utils/file';
import { randomFromInterval } from '@common/utils/number';

const MyUpload: React.FC<{
  onFileChange?: (images: any[]) => void;
  imageList?: any[];
  readonly?: boolean;
}> = ({ onFileChange, imageList = [], readonly = false }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(
    imageList
    // [
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
    //   ]
  );
  const isImageFile = (file) => {
    const imageTypes = [
      'image/jpeg',
      'image/png',
      //   'image/gif',
      //   'image/bmp',
      'image/webp',
    ];
    return imageTypes.includes(file.type);
  };
  const beforeUpload = (file) => {
    if (!isImageFile(file)) {
      toast.error(`${file.name} 不是支持的图片文件`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await convertBase64(file.originFileObj)) as string;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onFileChange) {
      setTimeout(() => {
        const images = newFileList.map((item) => {
          return {
            id: item?.id || randomFromInterval(0, 10000),
            filename: item.name,
            base64: item.thumbUrl || item?.url,
          };
        });
        onFileChange(images);
      }, 300);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </button>
  );
  return (
    <>
      <Upload
        className="oh"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        showUploadList={{
          showRemoveIcon: !readonly,
        }}
      >
        {fileList.length >= 5 || readonly ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default MyUpload;
