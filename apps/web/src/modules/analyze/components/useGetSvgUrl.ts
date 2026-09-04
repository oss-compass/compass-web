import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { rangeTags } from '../constant';
import { format } from 'date-fns';
import { toUnderline } from '@common/utils/format';

const queryMap = {
  metricCodequality: 'collab_dev_index',
  metricCommunity: 'community',
  metricActivity: 'activity',
  metricGroupActivity: 'organizations_activity',
};

export const useGetSvgUrl = (
  slug: string,
  id: string,
  yAxisScale: boolean,
  onePointSys: boolean,
  yKey: string
) => {
  const { range, timeStart, timeEnd } = useQueryDateRange();
  let url = `/chart/${slug}.svg`;
  const params: string[] = [];
  let metrc = '';
  let field = '';
  if (id === 'topic_overview') {
    metrc = 'overview';
  } else {
    const [metrcKey, fieldKey] = yKey.split('.');
    metrc = queryMap[metrcKey];
    if (id.indexOf('overview') === -1) {
      field = toUnderline(fieldKey);
    }
  }
  metrc && params.push(`metric=${metrc}`);
  field && params.push(`field=${field}`);
  !onePointSys && params.push(`y_trans=1`);
  !yAxisScale && params.push(`y_abs=1`);
  if (
    id === 'code_quality_is_maintained' ||
    id === 'code_quality_loc_frequency'
  ) {
    params.push(`chart=bar`);
  }
  if (rangeTags.includes(range)) {
    params.push(`range=${range}`);
  } else {
    const begin_date = format(timeStart!, 'yyyy-MM-dd');
    const end_date = format(timeEnd!, 'yyyy-MM-dd');
    params.push(`begin_date=${begin_date}`, `end_date=${end_date}`);
  }
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  return url;
};
