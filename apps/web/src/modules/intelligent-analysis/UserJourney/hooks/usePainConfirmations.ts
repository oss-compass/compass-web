import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchPainConfirmations,
  fetchPainHistory,
  upsertPainConfirmation,
  type PainConfirmationRecord,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';

const QUERY_KEY = (fileKey: string) => ['painConfirmations', fileKey];
const HISTORY_QUERY_KEY = (
  fileKey: string,
  stepId: string,
  painIndex: number
) => ['painHistory', fileKey, stepId, painIndex];

/**
 * 按 "stepId#painIndex" 建立快速查找 map
 */
export const buildConfirmationMap = (
  records: PainConfirmationRecord[]
): Map<string, PainConfirmationRecord> => {
  const map = new Map<string, PainConfirmationRecord>();
  records.forEach((r) => {
    map.set(`${r.step_id}#${r.pain_index}`, r);
  });
  return map;
};

/**
 * 加载并缓存某个报告的所有痛点确认记录。
 */
export const usePainConfirmations = (fileKey: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY(fileKey ?? ''),
    queryFn: () => fetchPainConfirmations(fileKey!),
    enabled: !!fileKey,
    staleTime: 1000 * 60 * 5, // 5 分钟内不重新拉取
    retry: 1,
  });

  const confirmationMap = buildConfirmationMap(query.data?.confirmations ?? []);

  const mutation = useMutation({
    mutationFn: (payload: UpsertPainConfirmationPayload) =>
      upsertPainConfirmation(fileKey!, payload),
    onSuccess: (result) => {
      // 乐观更新：直接把新数据合并进缓存，避免重新 fetch
      queryClient.setQueryData(
        QUERY_KEY(fileKey ?? ''),
        (
          old:
            | { file_key: string; confirmations: PainConfirmationRecord[] }
            | undefined
        ) => {
          if (!old) {
            return {
              file_key: fileKey!,
              confirmations: [result.data],
            };
          }
          const key = `${result.data.step_id}#${result.data.pain_index}`;
          const filtered = old.confirmations.filter(
            (r) => `${r.step_id}#${r.pain_index}` !== key
          );
          return {
            ...old,
            confirmations: [...filtered, result.data],
          };
        }
      );

      // 同时清除该痛点的历史记录缓存，以便下次打开弹窗时重新加载
      queryClient.invalidateQueries({
        queryKey: ['painHistory', fileKey],
      });
    },
  });

  return {
    confirmationMap,
    isLoading: query.isLoading,
    upsert: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
};

/**
 * 加载单条痛点的完整历史记录
 */
export const usePainHistory = (
  fileKey: string | undefined,
  stepId: string,
  painIndex: number
) => {
  return useQuery({
    queryKey: HISTORY_QUERY_KEY(fileKey ?? '', stepId, painIndex),
    queryFn: () => fetchPainHistory(fileKey!, stepId, painIndex),
    enabled: !!fileKey && !!stepId,
    staleTime: 1000 * 60, // 1 分钟缓存
  });
};
