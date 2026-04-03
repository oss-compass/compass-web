import React from 'react';
import classnames from 'classnames';
import { Form } from 'antd';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import OrgInput from '@common/components/OrgEdit/OrgInput';
import DateRangePicker from '@common/components/OrgEdit/DateRangePicker';
import getErrorMessage from '@common/utils/getErrorMessage';
import { Button } from '@oss-compass/ui';
import { manageOsBoardUserOrg } from '../../api/tableData';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface ContributorOrganizationCellProps {
  contributor?: string | null;
  label: string;
  level: 'repo' | 'community';
  organization?: string | null;
  onUpdated?: () => unknown | Promise<unknown>;
  platform?: string | null;
  displayMode?: 'inline' | 'icon';
}

const DATE_FORMAT = 'YYYY-MM-DD';
const UP_TO_NOW_DATE = '2099-01-01';

const getDefaultDateRange = (): RangeValue => [
  dayjs().subtract(3, 'year').startOf('year'),
  dayjs(UP_TO_NOW_DATE, DATE_FORMAT),
];

const waitFor = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const ContributorOrganizationCell: React.FC<
  ContributorOrganizationCellProps
> = ({
  contributor,
  label,
  level,
  organization,
  onUpdated,
  platform,
  displayMode = 'inline',
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [orgName, setOrgName] = React.useState(organization || '');
  const [date, setDate] = React.useState<RangeValue>(getDefaultDateRange);
  const [form] = Form.useForm();

  const canEdit = Boolean(contributor && label && level && platform);

  React.useEffect(() => {
    if (!open) return;

    const nextOrgName = organization || '';
    const nextDate = getDefaultDateRange();
    setOrgName(nextOrgName);
    setDate(nextDate);
    form.setFieldsValue({
      orgName: nextOrgName,
      date: nextDate,
    });
  }, [form, open, organization]);

  const mutation = useMutation({
    mutationFn: manageOsBoardUserOrg,
  });

  const handleClose = React.useCallback(() => {
    setOpen(false);
    form.resetFields();
    setDate(getDefaultDateRange());
  }, [form]);

  const handleSubmit = React.useCallback(async () => {
    if (!canEdit || !contributor || !platform) {
      return;
    }

    try {
      const values = await form.validateFields();
      const firstDate = values.date?.[0]?.format(DATE_FORMAT);
      const lastDate = values.date?.[1]?.format(DATE_FORMAT);
      const nextOrgName = values.orgName;

      const response = await mutation.mutateAsync({
        contributor,
        label,
        level,
        platform,
        organization: {
          org_name: nextOrgName,
          first_date: firstDate,
          last_date: lastDate,
        },
      });

      const success =
        response.status === true || String(response.status) === 'true';

      if (!success) {
        toast.error(response.message || t('common:toast.modification_failed'));
        return;
      }

      handleClose();
      toast.success(t('common:toast.modification_successful'));
      await waitFor(3000);
      await onUpdated?.();
    } catch (error) {
      const message = getErrorMessage(error);

      if (message) {
        toast.error(message);
      }
    }
  }, [
    canEdit,
    contributor,
    form,
    handleClose,
    label,
    level,
    mutation,
    onUpdated,
    platform,
    t,
  ]);

  return (
    <>
      {displayMode === 'icon' ? (
        <button
          type="button"
          disabled={!canEdit}
          className={classnames('flex-shrink-0 text-blue-600', {
            'cursor-not-allowed text-gray-400': !canEdit,
            'cursor-pointer hover:text-blue-700': canEdit,
          })}
          onClick={() => {
            if (canEdit) {
              setOpen(true);
            }
          }}
          aria-label={t('common:btn.edit')}
          title={t('common:btn.edit')}
        >
          <FiEdit className="text-sm" />
        </button>
      ) : (
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="truncate">{organization || '-'}</span>
          <button
            type="button"
            disabled={!canEdit}
            className={classnames('flex-shrink-0 text-blue-600', {
              'cursor-not-allowed text-gray-400': !canEdit,
              'cursor-pointer hover:text-blue-700': canEdit,
            })}
            onClick={() => {
              if (canEdit) {
                setOpen(true);
              }
            }}
            aria-label={t('common:btn.edit')}
            title={t('common:btn.edit')}
          >
            <FiEdit className="text-sm" />
          </button>
        </div>
      )}

      <Dialog
        open={open}
        handleClose={handleClose}
        classes={{
          paper: classnames(
            'w-[460px] !max-w-[660px] !rounded-none border-2 border-black !m-0',
            'md:h-full md:w-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogTitle={
          <>
            <p className="mb-4">
              {(contributor || '-') +
                ' ' +
                t('analyze:organization_information_modification')}
            </p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={handleClose}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={
          <div className="border-b-0 border-[#E7E7E7] py-4">
            <Form
              form={form}
              layout="vertical"
              style={{ width: '100%', maxWidth: 600 }}
            >
              <Form.Item
                label={t('analyze:org_name')}
                name="orgName"
                rules={[{ required: true, message: '' }]}
              >
                <OrgInput
                  className="h-full w-full"
                  inputClass="daisy-input-bordered daisy-input h-12 w-full flex-1 border-2 border-black px-4 text-base outline-none"
                  dropClass="top-[50px] border-2"
                  value={orgName}
                  onChange={setOrgName}
                  placeholder=""
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
              >
                <DateRangePicker
                  inputClass="daisy-input-bordered rounded-none daisy-input h-12 w-full flex-1 border-2 border-black pr-2.5 text-base outline-none"
                  value={date}
                  onChange={setDate}
                />
              </Form.Item>

              <Form.Item className="!mb-0">
                <div className="flex items-center gap-3">
                  <Button
                    className="w-[120px] whitespace-nowrap"
                    loading={mutation.isLoading}
                    onClick={handleSubmit}
                  >
                    {t('common:btn.confirm')}
                  </Button>
                  <Button
                    size="sm"
                    intent="text"
                    className="whitespace-nowrap"
                    onClick={handleClose}
                  >
                    {t('common:btn.cancel')}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        }
      />
    </>
  );
};

export default ContributorOrganizationCell;
