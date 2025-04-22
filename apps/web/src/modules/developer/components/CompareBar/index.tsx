import React from 'react';
import useCompareItems from '@modules/developer/hooks/useCompareItems';
import classnames from 'classnames';
import AddInput from './AddInput';
import useBreakpoint from '@common/hooks/useBreakpoint';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import CompareItem from './CompareItem';

const CompareBar: React.FC<{ lab?: boolean }> = ({ lab = false }) => {
  const breakpoint = useBreakpoint();
  const { compareItems } = useCompareItems();
  const len = compareItems.length;

  return (
    <div className="relative z-[70] mb-8 flex min-h-[80px] md:hidden">
      {lab && (
        <div className="absolute top-0 left-0 z-30 h-[20px] w-[50px] rounded-br rounded-tl-lg bg-[#FFAB03] text-center text-sm font-medium text-white">
          Lab
        </div>
      )}
      <div className="min-w-0 flex-1 rounded-tl-lg rounded-bl-lg bg-[#00B5EA]">
        <div className="overflow flex h-full">
          {compareItems.map((item, index) => {
            return (
              <CompareItem
                key={item.label}
                item={item}
                showCloseIcon={len > 1}
                showColorSwitch={len > 1}
                showGuideTips={index === 0 && breakpoint === 'lg'}
                className={classnames({
                  'rounded-tl-lg rounded-bl-lg !border-l-0': index === 0,
                  '!pt-6': lab,
                  // 'text-center': len == 1,
                })}
              />
            );
          })}
        </div>
      </div>
      <AddInput />
    </div>
  );
};

export default withErrorBoundary(CompareBar, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
