import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchPainConfirmations,
  upsertPainConfirmation,
  type PainConfirmationRecord,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';

const QUERY_KEY = (fileKey: string) => ['painConfirmations', fileKey];

/**
 * 按 "file_key#step_id#pain_index" 建立快速查找 map
 */
export const buildConfirmationMap = (
  records: PainConfirmationRecord[]
): Map<string, PainConfirmationRecord> => {
  const map = new Map<string, PainConfirmationRecord>();
  records.forEach((r) => {
    map.set(`${r.file_key}#${r.step_id}#${r.pain_index}`, r);
  });
  return map;
};

/**
 * 加载并缓存某个报告的所有痛点确认记录。
 */
export const usePainConfirmations = (
  fileKey: string | undefined,
  options?: { enabled?: boolean }
) => {
  const queryClient = useQueryClient();
  const enabled = (options?.enabled ?? true) && !!fileKey;

  const query = useQuery({
    queryKey: QUERY_KEY(fileKey ?? ''),
    queryFn: () => fetchPainConfirmations(fileKey!),
    enabled,
    staleTime: 0,
    retry: 1,
  });

  const confirmationMap = buildConfirmationMap(query.data?.confirmations ?? []);

  const mutation = useMutation({
    mutationFn: (payload: UpsertPainConfirmationPayload) =>
      upsertPainConfirmation(fileKey!, payload),
    onSuccess: async () => {
      const latest = await fetchPainConfirmations(fileKey!);
      queryClient.setQueryData(QUERY_KEY(fileKey ?? ''), latest);
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
