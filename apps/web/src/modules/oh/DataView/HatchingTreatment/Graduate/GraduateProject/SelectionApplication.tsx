import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, Form } from 'antd';
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
import { toast } from 'react-hot-toast';

const SelectionApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareGraduationMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareGraduation.status == 'true') {
        const id = data.createTpcSoftwareGraduation.id;
        toast.success(
          `提交成功，即将跳转 Gitee，会自动生成 Issue模板，您只需点击按钮创建 Issue 即可`
        );
        setTimeout(() => {
          openGraduationIssue(report, form.getFieldsValue(true), id);
        }, 3000);
      } else {
        toast.error(data.createTpcSoftwareGraduation.message);
      }
    },
    onError(res) {
      toast.error(getErrorMessage(res));
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

          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};
export default SelectionApplication;
