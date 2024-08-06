import React, { useRef } from 'react';
import { List } from 'antd';
import CommentInput, { InputRefProps } from './CommentInput';
import RiskContent from './RiskContent';
import CheckRisk from './CheckRisk';
import {
  useTpcSoftwareReportMetricClarificationPageQuery,
  useCreateTpcSoftwareReportMetricClarificationMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  RiskStore,
  riskEvent,
} from '@modules/oh/components/GraduationEvaluationInfo/store/useRiskStore';
import RiskBadgeInner from '@modules/oh/components/GraduationEvaluationInfo/Badge/RiskBadgeInner';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const RiskClarification = ({ metric, report }) => {
  const { hasOhRole } = useHasOhRole();
  const { shortCode } = report;
  const metricName = metric.key;
  const dimension = metric.维度;
  const inputRef = useRef<InputRefProps>(null);
  //   const [listData, setListData] = useState([]);
  const params = {
    shortCode,
    metricName,
    reportType: 1,
    page: 1,
    per: 50,
  };
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    useTpcSoftwareReportMetricClarificationPageQuery.getKey(params),
    async (arg) => {
      const { pageParam } = arg;
      return await useTpcSoftwareReportMetricClarificationPageQuery.fetcher(
        gqlClient,
        {
          ...params,
          ...pageParam,
        }
      )();
    },
    {
      onSuccess(data) {
        // setListData(data.)
      },
      staleTime: 60 * 1000,
      getNextPageParam: (lastPage) => {
        // const count = lastPage?.labModelComments?.count! || 0;
        // const page = lastPage?.labModelComments?.page! || 0;
        // const totalPage = lastPage?.labModelComments?.totalPage! || 0;
        // if (totalPage > page) {
        //   return { page: page + 1 };
        // }
        // return null;
      },
    }
  );
  const listData = data?.pages?.reduce((acc, cur) => {
    return acc.concat(cur.tpcSoftwareReportMetricClarificationPage.items);
  }, []);
  const commentMutation =
    useCreateTpcSoftwareReportMetricClarificationMutation(gqlClient);

  return (
    <>
      <List
        className="oh !rounded-none"
        size="large"
        header={
          <div className="flex justify-between">
            <div className="flex items-center text-base font-bold">
              <span className="mr-4">风险澄清</span>
              <RiskBadgeInner report={report} keyId={metricName} />
            </div>
            <CheckRisk
              dimension={dimension}
              report={report}
              metricName={metricName}
            />
          </div>
        }
        footer={
          <HasOhRole>
            <div></div>
            <CommentInput
              ref={inputRef}
              loading={commentMutation.isLoading}
              disabled={!hasOhRole}
              placeholder={'按Enter发送风险澄清'}
              onSubmit={(content) => {
                commentMutation.mutate(
                  {
                    shortCode,
                    metricName,
                    content,
                    reportType: 1,
                  },
                  {
                    onSuccess: (res) => {
                      if (
                        res?.createTpcSoftwareReportMetricClarification
                          ?.status === 'true'
                      ) {
                        toast.success('发送成功');
                        refetch();
                        RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
                        inputRef.current?.reset();
                      } else {
                        toast.error(
                          res?.createTpcSoftwareReportMetricClarification
                            ?.message
                        );
                      }
                    },
                  }
                );
              }}
            />
          </HasOhRole>
        }
        bordered
        loading={isLoading || isFetchingNextPage}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="relative flex flex-col !items-start"
          >
            <RiskContent
              shortCode={shortCode}
              item={item}
              refetch={() => refetch()}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default RiskClarification;
