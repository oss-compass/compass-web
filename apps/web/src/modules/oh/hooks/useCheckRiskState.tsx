import { useGetRisk } from '@modules/oh/store/useRiskStore';
import { useMemo } from 'react';

const useCheckRiskState = (shortCode, mertic) => {
  const { key, 维度: dimension } = mertic;
  const { metricState } = useGetRisk(shortCode, key);
  const riskFill = useMemo(() => {
    if (metricState && metricState.length > 0) {
      const leaderState = metricState.filter((item) => item.memberType === 1);
      const commiterState = metricState.filter((item) => item.memberType === 0);
      const legalState = metricState.filter((item) => item.memberType === 2);
      const complianceState = metricState.filter(
        (item) => item.memberType === 3
      );
      if (dimension === '合法合规') {
        return legalState.length > 0 && complianceState.length > 0;
      } else {
        return (
          leaderState.length > 0 &&
          commiterState.length > 0 &&
          complianceState.length > 0
        );
      }
    }
    return false;
  }, [metricState, dimension]);

  return {
    riskFill,
  };
};

export default useCheckRiskState;
