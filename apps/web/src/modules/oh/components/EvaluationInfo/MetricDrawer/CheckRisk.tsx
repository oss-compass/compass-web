import React from 'react';
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useAcceptTpcSoftwareReportMetricClarificationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import { userRiskStore, userEvent } from '@modules/oh/store/UserRiskStore';

const CheckRisk = ({ shortCode, metricName }) => {
  const mutation =
    useAcceptTpcSoftwareReportMetricClarificationMutation(gqlClient);

  return (
    <>
      <Button
        title="批准风险澄清"
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
                userRiskStore.event$[shortCode]?.emit(userEvent.REFRESH);
                toast.success('批准成功');
                // refetch();
                // inputRef.current?.reset();
              },
            }
          );
        }}
      >
        <CheckOutlined rev={undefined} />
      </Button>
      {/* <div className="flex pb-4">
          <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
            <Image
              src={
                item?.user?.loginBinds[0]?.avatarUrl ||
                '/images/default-avatar.png'
              }
              unoptimized
              fill
              sizes="64px"
              style={{
                objectFit: 'cover',
              }}
              alt={'avatar'}
            />
          </div>
          <div className="flex-1 pl-2">
            <div className="mt-1 flex items-center justify-between">
              <div className=" flex items-center ">
                <div className="text-sm font-medium">{item?.user?.name}</div>
                <div className="text-secondary ml-2 text-xs">
                  {formatToNow(item?.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {edit ? (
            <CommentEdit
              content={content}
              clarificationId={id}
              onUpdateSuccess={() => {
                refetch();
                setTimeout(() => {
                  setEdit(false);
                }, 1000);
              }}
              onCancel={() => {
                setEdit(false);
              }}
            />
          ) : (
            content
          )}
        </div>
        <div className="absolute top-4 right-4">
          <CommentItemMore
            userId={userId}
            clarificationId={item.id}
            onDeleteEdit={() => {
              setEdit(true);
            }}
            onDeleteSuccess={() => {
              refetch();
            }}
          />
        </div> */}
    </>
  );
};

export default CheckRisk;
