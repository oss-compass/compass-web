import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form, Input, Select, Row, Col } from 'antd';
import Dialog from '@common/components/Dialog';
import SelectReport from '@modules/oh/components/GraduationReport/SelectReport';
import { queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareGraduationMutation } from '@oss-compass/graphql';
import { openGraduationIssue } from '@modules/oh/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import { getPathname } from '@common/utils';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';
import SelectionForm from './SelectionForm';

const SelectionApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareGraduationMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareGraduation.status == 'true') {
        const id = data.createTpcSoftwareGraduation.id;
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
          openGraduationIssue(report, form.getFieldsValue(true), id);
        }, 3000);
      } else {
        messageApi.open({
          type: 'error',
          style: {
            marginTop: '200px',
          },
          content: data.createTpcSoftwareGraduation.message,
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
      report &&
        mutation.mutate({
          ...queryKey,
          ...values,
          tpcSoftwareGraduationReportIds: report.map(
            (r) => r.graduationReportMetric.tpcSoftwareGraduationReportId
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
              className="rounded-none"
              type="primary"
              loading={mutation.isLoading}
              disabled={!hasOhRole}
              onClick={() => {
                submit();
              }}
            >
              提交申请
            </Button>
          </HasOhRole>

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
