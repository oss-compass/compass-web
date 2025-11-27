import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, Form } from 'antd';
import Dialog from '@common/components/Dialog';
import { queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSandboxMutation } from '@oss-compass/graphql';
import { openGiteeIssue } from '@modules/oh/utils/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import { getPathname } from '@common/utils';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';
import SelectionForm from './Form';
import ReportPageItems from '../Report/ReportPageItems';
import { toast } from 'react-hot-toast';
import SandboxSelectReport from './SelectReport';

const SelectionApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);

  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSandboxMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSandbox.status == 'true') {
        toast.success(
          `提交成功`
          // `提交成功，即将跳转 Gitee，会自动生成 Issue 模板，您只需点击按钮创建 Issue 即可`
        );
        setTimeout(() => {
          // openGiteeIssue(report, form.getFieldsValue(true), id);
          window.location.hash = 'sandboxTable?tab=2';
        }, 3000);
      } else {
        toast.error(data.createTpcSoftwareSandbox.message);
      }
    },
    onError(res) {
      toast.error(getErrorMessage(res));
    },
  });

  const submit = () => {
    form.validateFields().then((values) => {
      const repoUrl = values.repoUrl.map((z) => z['repoUrl']);
      // const adaptationCommitters = values.adaptationCommitters || [];
      console.log(report);
      report &&
        mutation.mutate({
          ...queryKey,
          ...values,
          repoUrl,
          // adaptationCommitters,
          reportCategory: 2,
          tpcSoftwareSandboxReportIds: report.map(
            (r) => r.tpcSoftwareSandboxReportMetric.tpcSoftwareSandboxReportId
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
            <SandboxSelectReport
              getReport={(item) => {
                if (item.length > 0) {
                  form.resetFields();
                  setReport(item);
                  form.setFieldsValue({
                    name: item[0].name,
                    targetSoftware: getPathname(item[0].codeUrl),
                    committers: item[0].tpcSoftwareSig?.sigCommitter
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
          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};
export default SelectionApplication;
