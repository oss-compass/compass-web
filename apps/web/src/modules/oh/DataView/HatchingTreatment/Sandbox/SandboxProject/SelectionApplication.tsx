import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form } from 'antd';
import Dialog from '@common/components/Dialog';
import SelectReport from '@modules/oh/components/Report/SelectReport';
import { queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import { openGiteeIssue } from '@modules/oh/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import { getPathname } from '@common/utils';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';
import SelectionForm from './SelectionForm';
import ReportPageItems from '@modules/oh/components/Report/ReportPageItems';

const SelectionApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSelectionMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSelection.status == 'true') {
        const id = data.createTpcSoftwareSelection.id;
        // let issueUrl = data.createTpcSoftwareSelection.issueUrl;
        messageApi.open({
          type: 'success',
          style: {
            marginTop: '150px',
          },
          content: (
            <>
              提交成功，即将跳转 Gitee，会自动生成 Issue
              模板，您只需点击按钮创建 Issue 即可
              {/* 提交成功，已在 Gitee 建立 Issue 跟踪，可点击
              <a className="text-[#1677ff]" href={issueUrl} target="_blank">
                {issueUrl}
              </a>
              查看 Issue, */}
            </>
          ),
        });
        setTimeout(() => {
          openGiteeIssue(report, form.getFieldsValue(true), id);
        }, 3000);
      } else {
        messageApi.open({
          type: 'error',
          style: {
            marginTop: '200px',
          },
          content: data.createTpcSoftwareSelection.message,
        });
      }
    },
    onError(res) {
      messageApi.open({
        type: 'error',
        style: {
          marginTop: '200px',
        },
        content: getErrorMessage(res),
      });
    },
  });

  const submit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      const repoUrl = values.repoUrl.map((z) => z['repoUrl']);
      report &&
        mutation.mutate({
          ...queryKey,
          ...values,
          repoUrl,
          selectionType: 0,
          tpcSoftwareSelectionReportIds: report.map(
            (r) => r.tpcSoftwareReportMetric.tpcSoftwareReportId
          ),
        });
    });
  };
  const onReset = () => {
    form.resetFields();
    setReport([]);
  };

  return (
    <>
      {contextHolder}
      <SelectionForm
        form={form}
        report={report}
        setOpenConfirm={setOpenConfirm}
      />
      {report.length > 0 && (
        <div className="px-5">
          <div className="mb-4 text-base font-semibold">报告信息</div>
          <ReportPageItems reportItems={report} />
        </div>
      )}
      <Dialog
        open={openConfirm}
        classes={{
          paper: classnames(
            'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogContent={
          <div className="w-full">
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
            <SelectReport
              getReport={(item) => {
                if (item.length > 0) {
                  form.resetFields();
                  setReport(item);
                  form.setFieldsValue({
                    name: item.map((item) => item.name).join(', '),
                    targetSoftware:
                      item.length > 1 ? '' : getPathname(item[0].codeUrl),
                    committers:
                      item.length > 1
                        ? ''
                        : item[0].tpcSoftwareSig?.sigCommitter
                            ?.map((i) => i.giteeAccount)
                            .join(', '),
                  });
                }
                setOpenConfirm(false);
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      {report.length > 0 && (
        <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
          <HasOhRole>
            <Button
              disabled={!hasOhRole}
              className="rounded-none"
              type="primary"
              loading={mutation.isLoading}
              onClick={() => {
                submit();
              }}
            >
              提交申请
            </Button>
          </HasOhRole>
          {/* <Button className="rounded-none">保存</Button> */}
          {/* <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              autoFill('');
            }}
          >
            自动填充
          </Button> */}
          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};
export default SelectionApplication;
