import React from 'react';
import { Button, Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useAcceptTpcSoftwareReportMetricClarificationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import { RiskStore, riskEvent } from '@modules/oh/store/useRiskStore';

const CheckRisk = ({ report, metricName }) => {
  const { shortCode, clarificationPermission } = report;
  const mutation =
    useAcceptTpcSoftwareReportMetricClarificationMutation(gqlClient);

  return (
    <>
      {clarificationPermission && (
        <Popover>
          <Button
            title="确认风险澄清"
            className="flex items-center !rounded-none"
            size="small"
            type="primary"
            onClick={() => {
              mutation.mutate(
                {
                  shortCode,
                  metricName,
                },
                {
                  onSuccess: () => {
                    RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
                    toast.success('确认成功');
                    // refetch();
                    // inputRef.current?.reset();
                  },
                }
              );
            }}
          >
            <CheckOutlined rev={undefined} />
          </Button>
        </Popover>
      )}
    </>
  );
};

export default CheckRisk;
