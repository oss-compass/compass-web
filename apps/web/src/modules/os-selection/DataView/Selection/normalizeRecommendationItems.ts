export const normalizeRecommendationItems = <
  T extends { packageId?: string | null }
>(
  items: readonly (T | null | undefined)[] | null | undefined
): Array<T & { name: string; target: string }> =>
  (items ?? []).flatMap((item) => {
    const parts = item?.packageId?.split('@@@@$$@@@@');
    if (!item || parts?.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      return [];
    }

    return [{ ...item, name: parts[0], target: parts[1] }];
  });
