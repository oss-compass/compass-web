import React, { useState } from 'react';
import { Button } from '@oss-compass/ui';
import { useTranslation } from 'react-i18next';
import OrgInput from './OrgInput';
import DateRangePicker from './DateRangePicker';
import { Form } from 'antd';
import {
  ContributorOrgInput,
  useModifyUserOrgsMutation,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
const FORMAT_YMD = 'YYYY-MM-DD';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const OrgEdit = ({
  organizations = [],
  type = 'add',
  index,
  setShowEdit,
  onSuccess,
}: {
  organizations?: ContributorOrgInput[];
  type?: 'add' | 'edit';
  index?: number;
  setShowEdit: (b: boolean) => void;
  onSuccess?: () => void;
}) => {
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState(
    type === 'edit' ? organizations[index]['orgName'] : ''
  );
  const [date, setDate] = useState<RangeValue>(
    type === 'edit'
      ? [
          dayjs(organizations[index]['firstDate'], FORMAT_YMD),
          dayjs(organizations[index]['lastDate'], FORMAT_YMD),
        ]
      : null
  );
  const [form] = Form.useForm();
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const firstDate = values['date'][0].format(FORMAT_YMD);
      const lastDate = values['date'][1].format(FORMAT_YMD);
      const orgName = values['orgName'];
      if (type === 'edit') {
        organizations[index] = { orgName, firstDate, lastDate };
        mutation.mutate({
          platform: 'github',
          organizations: [...organizations],
        });
      } else {
        mutation.mutate({
          platform: 'github',
          organizations: [{ orgName, firstDate, lastDate }, ...organizations],
        });
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const disabledDate = (current: Dayjs) => {
    if (!organizations) {
      return false;
    }
    const result = organizations.some(({ firstDate, lastDate }, i) => {
      if (index === i) {
        return false;
      }
      return (
        firstDate && current > dayjs(firstDate) && current < dayjs(lastDate)
      );
    });
    return result;
  };
  const mutation = useModifyUserOrgsMutation(client, {
    onSuccess(res) {
      if (res.modifyUserOrgs?.status === 'true') {
        setShowEdit(false);
        toast.success(
          res.modifyUserOrgs?.message || type === 'add'
            ? t('common:toast.add_successful')
            : t('common:toast.modification_successful')
        );
        onSuccess();
      }

      if (res.modifyUserOrgs?.status === 'false') {
        toast.error(
          res.modifyUserOrgs?.message || type === 'add'
            ? t('common:toast.add_failed')
            : t('common:toast.modification_failed')
        );
      }
    },
  });
  return (
    <div className="border-b border-[#E7E7E7] py-4">
      <div className="flex items-center justify-between">
        <Form form={form} className="flex">
          <Form.Item
            name="orgName"
            className="mr-2 !mb-0 h-6 w-[160px]"
            rules={[{ required: true, message: '' }]}
            initialValue={orgName}
          >
            <OrgInput
              className="h-full w-full"
              dropClass="top-[30px] border"
              value={orgName}
              onChange={(e) => {
                setOrgName(e);
              }}
              placeholder={''}
            />
          </Form.Item>
          <Form.Item
            name="date"
            className="!mb-0 h-6 w-[240px]"
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
              disabledDate={disabledDate}
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
            />
          </Form.Item>
        </Form>
        <div className="flex">
          <Button
            intent="secondary"
            size="sm"
            className="h-6 px-2"
            loading={mutation.isLoading}
            onClick={() => {
              onCheck();
            }}
          >
            {type === 'add' ? t('common:btn.add') : t('common:btn.confirm')}
          </Button>
          <Button
            intent="text"
            size="sm"
            className="ml-2 h-6 px-1 text-[#868690]"
            onClick={() => {
              setShowEdit(false);
            }}
          >
            {t('common:btn.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default OrgEdit;
