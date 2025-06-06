import React, { useState } from 'react';
import client from '@common/gqlClient';
import { useCreateThirdSoftwareReportMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Modal, Button, Form, Alert, Input, Typography } from 'antd'; // 引入 Typography

const { Text } = Typography; // 解构 Text 组件

const GenReport = ({ selectedSoftware }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框显示
  const [form] = Form.useForm(); // 表单实例
  const [softwareToEdit, setSoftwareToEdit] = useState([]); // 需要编辑的软件列表
  const [confirmLoading, setConfirmLoading] = useState(false); // 新增：控制模态框确认按钮的loading状态

  const createMutation = useCreateThirdSoftwareReportMutation(client, {
    onSuccess(res) {
      if (res.createThirdSoftwareReport?.status) {
        toast.success('提交生成报告成功，可在我的报告中查看生成状态');
        setIsModalVisible(false);
        router.push(`/os-selection?tab=${2}`);
      } else {
        toast.error(
          res.createThirdSoftwareReport?.message || t('common:toast.add_failed')
        );
      }
      setConfirmLoading(false); // 操作成功或失败后，关闭loading
      setIsModalVisible(false);
    },
    onError(e: any) {
      const errors = e?.response?.errors;
      let msg = '';
      if (Array.isArray(errors) && errors.length > 0) {
        msg = errors[0].message;
      }
      toast.error(msg || t('common:toast.add_failed'));
      setConfirmLoading(false); // 操作失败后，关闭loading
    },
  });

  // 验证URL是否为GitHub或Gitee仓库链接的函数
  const isValidRepoUrl = (url) => {
    if (!url) return false;
    const githubRegex =
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_\.]+(\.git)?$/;
    const giteeRegex =
      /^(https?:\/\/)?(www\.)?gitee\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_\.]+(\.git)?$/;
    return githubRegex.test(url) || giteeRegex.test(url);
  };

  const handleCompare = () => {
    console.log(selectedSoftware);
    if (selectedSoftware.length > 0) {
      const softwareWithoutValidUrl = selectedSoftware.filter(
        (item) => !isValidRepoUrl(item.label)
      );

      if (softwareWithoutValidUrl.length > 0) {
        setSoftwareToEdit(softwareWithoutValidUrl);
        setIsModalVisible(true);
        // 设置表单初始值
        const initialValues = {};
        softwareWithoutValidUrl.forEach((item) => {
          initialValues[item.name] = item.label; // 使用name作为key，label作为初始值
        });
        form.setFieldsValue(initialValues);
      } else {
        submitReport(selectedSoftware);
      }
    }
  };

  const submitReport = (softwareList) => {
    setConfirmLoading(true); // 开启loading
    createMutation.mutate({
      label: 'OpenHarmony-TPC',
      level: 'community',
      softwareReports: softwareList.map((item) => {
        return { name: item.name, codeUrl: item.label };
      }),
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 检查并添加默认协议头
        const processedValues = Object.keys(values).reduce((acc, key) => {
          let url = values[key];
          if (url && !/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
          }
          acc[key] = url;
          return acc;
        }, {});

        const updatedSelectedSoftware = selectedSoftware.map((item) => {
          if (softwareToEdit.some((editItem) => editItem.name === item.name)) {
            // 使用处理后的值
            return { ...item, label: processedValues[item.name] };
          }
          return item;
        });
        submitReport(updatedSelectedSoftware);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        setConfirmLoading(false); // 验证失败后，关闭loading
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      <Button
        onClick={handleCompare}
        className="flex items-center gap-2"
        type="primary" // 使用Ant Design的primary类型
        loading={confirmLoading} // 绑定loading状态
        disabled={confirmLoading} // 在loading状态下禁用按钮
      >
        <div className="flex items-center gap-2">
          <span>生成报告</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm text-blue-500">
            {selectedSoftware.length}
          </span>
        </div>
      </Button>

      <Modal
        title="填写仓库链接"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading} // 将loading状态绑定到这里
      >
        <div className="my-4">
          <Alert
            message="以下软件并未提供Github或Gitee仓库链接，请提供对应Github或Gitee仓库链接以生成报告。"
            type="warning"
            showIcon
          />
        </div>
        <Form form={form} layout="vertical">
          {softwareToEdit.map((item) => (
            <Form.Item
              key={item.name}
              label={
                <>
                  软件名称: {item.name}
                  {item.label && (
                    <Text type="secondary" style={{ marginLeft: 8 }}>
                      (原链接:{' '}
                      <a
                        href={item.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                      )
                    </Text>
                  )}
                </>
              }
              name={item.name}
              rules={[
                {
                  required: true,
                  message: '请输入GitHub或Gitee仓库链接!',
                },
                {
                  validator: (_, value) =>
                    isValidRepoUrl(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('请输入有效的GitHub或Gitee仓库链接!')
                        ),
                },
              ]}
            >
              <Input placeholder="请输入GitHub或Gitee仓库链接" />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default GenReport;
