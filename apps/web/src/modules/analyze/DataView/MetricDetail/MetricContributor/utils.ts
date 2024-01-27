export const getMaxDomain = (tableData) => {
  if (tableData?.length > 0) {
    const filterData = tableData?.map((item) => {
      let filterCount = item?.contributionTypeList?.reduce(
        (acc, current) => acc + current.contribution,
        0
      );
      return { ...item, filterCount };
    });
    let maxCountElement = filterData?.reduce((prev, current) =>
      prev?.filterCount > current.filterCount ? prev : current
    );
    return maxCountElement.filterCount;
  } else {
    return 0;
  }
};
export const getDomainData = (data, contributionTypeMap) => {
  let arr = data.map((item) => {
    return { ...item, ...contributionTypeMap[item.contributionType] };
  });
  const result = [];
  arr.forEach(({ color, contribution, text, type }) => {
    const domainType = result.find((z) => z.type === type);
    if (domainType) {
      domainType.contribution += contribution;
      domainType.childern.push({ text, contribution });
    } else {
      result.push({
        type,
        color,
        contribution,
        childern: [{ text, contribution }],
      });
    }
  });
  return result.sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
  });
};
