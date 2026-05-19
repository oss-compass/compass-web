import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchPainConfirmations,
  upsertPainConfirmation,
  type PainConfirmationRecord,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';

const QUERY_KEY = (fileKey: string) => ['painConfirmations', fileKey];

/**
 * 按 "file_key#step_id#pain_text" 建立快速查找 map
 */
export const buildConfirmationMap = (
  records: PainConfirmationRecord[]
): Map<string, PainConfirmationRecord> => {
  const map = new Map<string, PainConfirmationRecord>();
  records.forEach((r) => {
    // 统一标准化文本处理逻辑：trim + 压缩空格
    const normalizedText = r.pain_text.trim().replace(/\s+/g, ' ');
    map.set(`${r.file_key}#${r.step_id}#${normalizedText}`, r);
  });
  return map;
};

const normalizePainText = (t: string) => t.trim().replace(/\s+/g, ' ');

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
            | {
                file_key: string;
                confirmations: PainConfirmationRecord[];
                overview_pains?: any[];
              }
            | undefined
        ) => {
          if (!old) {
            return {
              file_key: fileKey!,
              confirmations: [result.data],
              overview_pains: [],
            };
          }
          const key = `${result.data.file_key}#${
            result.data.step_id
          }#${normalizePainText(result.data.pain_text)}`;
          const filtered = old.confirmations.filter(
            (r) =>
              `${r.file_key}#${r.step_id}#${normalizePainText(r.pain_text)}` !==
              key
          );
          return {
            ...old,
            confirmations: [...filtered, result.data],
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY(fileKey ?? ''),
        exact: true,
      });
    },
  });

  return {
    confirmationMap,
    overviewPains: query.data?.overview_pains ?? [],
    isLoading: query.isLoading,
    upsert: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
};
