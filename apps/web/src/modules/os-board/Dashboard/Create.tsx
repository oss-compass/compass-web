import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import Dialog from '@common/components/Dialog';
import { actions } from '../state';
import DashboardForm, {
  DashboardFormRef,
  DashboardFormValues,
} from './components/DashboardForm';

const CreateDashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const formRef = useRef<DashboardFormRef>(null);

  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleCreate = (values: DashboardFormValues) => {
    const dashboard = actions.createDashboard({
      name: values.name,
      type: values.type,
      config: {
        projects: values.projects,
        competitorProjects: values.competitors,
        metrics: values.metricIds,
        compareMode: values.compareMode,
        timeRange: { preset: '30d' },
      },
    });
    router.push(`/os-board/dashboard/${dashboard.id}`);
  };

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href="/os-board">{t('os_board:home.title')}</Link> /
            <span className="ml-2">{t('os_board:create.title')}</span>
          </div>
          <Button
            intent="text"
            size="sm"
            onClick={() => setConfirmCancel(true)}
          >
            {t('common:btn.cancel')}
          </Button>
        </div>

        <div className="border bg-white p-6 md:p-4">
          <DashboardForm
            ref={formRef}
            mode="create"
            onSubmit={handleCreate}
            onCancel={() => setConfirmCancel(true)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button size="sm" onClick={() => formRef.current?.submit()}>
            {t('common:btn.confirm')}
          </Button>
        </div>
      </Center>

      <Dialog
        open={confirmCancel}
        dialogTitle={t('os_board:create.cancel.title')}
        dialogContent={
          <div className="w-96">{t('os_board:create.cancel.body')}</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => setConfirmCancel(false)}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                setConfirmCancel(false);
                router.push('/os-board');
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setConfirmCancel(false)}
      />
    </div>
  );
};

export default CreateDashboard;
