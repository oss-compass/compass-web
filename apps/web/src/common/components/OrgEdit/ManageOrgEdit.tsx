import React, { useState } from 'react';
import { Button } from '@oss-compass/ui';
import { useTranslation } from 'react-i18next';
import OrgInput from './OrgInput';
import DateRangePicker from './DateRangePicker';
import { Form } from 'antd';
import { useManageUserOrgsMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import type { Dayjs } from 'dayjs';
const FORMAT_YMD = 'YYYY-MM-DD';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const ManageOrgEdit = ({
  label,
  level,
  contributor,
  name,
  setShowEdit,
}: {
  label?: string;
  level?: string;
  contributor?: string;
  name?: string;
  setShowEdit: (b: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState(name || '');
  const [date, setDate] = useState<RangeValue>(null);
  const [form] = Form.useForm();
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const firstDate = values['date'][0].format(FORMAT_YMD);
      const lastDate = values['date'][1].format(FORMAT_YMD);
      const orgName = values['orgName'];
      mutation.mutate({
        label,
        level,
        contributor,
        platform: 'github',
        organizations: [{ orgName, firstDate, lastDate }],
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const mutation = useManageUserOrgsMutation(client, {
    onSuccess(res) {
      if (res.manageUserOrgs?.status === 'true') {
        setShowEdit(false);
        if (res.manageUserOrgs?.prUrl) {
          let message = (
            <div className="flex w-full max-w-[460px] flex-col overflow-hidden text-green-500">
              {t('common:toast.modification_successful')}
              <a
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
                href={res.manageUserOrgs?.prUrl}
              >
                {res.manageUserOrgs?.prUrl}
              </a>
            </div>
          );
          toast.success(message, {
            duration: 5000,
            className: '!max-w-[500px]',
          });
        } else {
          toast.success(t('common:toast.modification_successful'));
        }
      }
      if (res.manageUserOrgs?.status === 'false') {
        toast.error(
          res.manageUserOrgs?.message || t('common:toast.modification_failed')
        );
      }
    },
  });
  return (
    <div className="border-b-0 border-[#E7E7E7] py-4">
      <div className="flex flex-col items-start justify-between gap-6">
        <Form
          form={form}
          layout={'vertical'}
          style={{ width: '100%', maxWidth: 600 }}
        >
          <Form.Item
            label={t('analyze:org_name')}
            name="orgName"
            rules={[{ required: true, message: '' }]}
            initialValue={orgName}
          >
            <OrgInput
              className="h-full w-full"
              inputClass="daisy-input-bordered daisy-input h-12 w-full flex-1 border-2  px-4 text-base outline-none border-black"
              dropClass="top-[50px]  border-2"
              value={orgName}
              onChange={(e) => {
                setOrgName(e);
              }}
              placeholder={''}
            />
          </Form.Item>
          <Form.Item
            label={t('analyze:date')}
            name="date"
            rules={[
              {
                type: 'array' as const,
                required: true,
                message: '',
              },
            ]}
            initialValue={date}
          >
            <DateRangePicker
              inputClass="daisy-input-bordered rounded-none daisy-input h-12 w-full flex-1 border-2 pr-2.5 text-base outline-none border-black"
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="flex w-[120px] cursor-pointer items-center justify-center rounded-none bg-black px-3 py-2 text-base text-white hover:opacity-80"
              loading={mutation.isLoading}
              onClick={() => {
                onCheck();
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ManageOrgEdit;
