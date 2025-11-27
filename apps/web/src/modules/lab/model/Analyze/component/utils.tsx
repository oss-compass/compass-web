import { IoPeopleCircle } from 'react-icons/io5';
import Image from 'next/image';

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

export const getIcons = (origin, name) => {
  switch (origin) {
    case 'github':
      return (
        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={'https://github.com/' + name + '.png'}
            onError={(e) => (e.currentTarget.src = '/images/github.png')}
            unoptimized
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
            placeholder="blur"
            blurDataURL="/images/github.png"
          />
        </div>
      );
    case 'gitee':
      return (
        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={'https://gitee.com/' + name + '.png'}
            onError={(e) =>
              (e.currentTarget.src = '/images/logos/gitee-red.svg')
            }
            unoptimized
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
            placeholder="blur"
            blurDataURL="/images/logos/gitee-red.svg"
          />
        </div>
      );
    case 'gitcode':
      console.log('gitcode');
      return (
        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={'https://gitcode.com/' + name + '.png'}
            onError={(e) => (e.currentTarget.src = '/images/logos/gitcode.png')}
            unoptimized
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
            placeholder="blur"
            blurDataURL="/images/logos/gitcode.png"
          />
        </div>
      );
    default:
      return <IoPeopleCircle />;
  }
};
export const getTableMetric = (data) => {
  return data?.labModelVersion?.metrics.filter(
    (item) =>
      // item.ident === 'issue_count_year' ||
      item.ident === 'commit_authors' || item.ident === 'issue_authors'
  );
};
const identMap = {
  // issue_count_year: [
  //   { type: 'contribution_type', values: ['code_author'] },
  //   { type: 'is_bot', values: ['false'] },
  // ],
  commit_authors: [
    { type: 'contribution_type', values: ['code_author'] },
    { type: 'is_bot', values: ['false'] },
  ],
  issue_authors: [
    { type: 'contribution_type', values: ['issue_creation'] },
    { type: 'is_bot', values: ['false'] },
  ],
};
export const tableMetricFilterOpts = (ident) => {
  return identMap[ident] || [];
};
