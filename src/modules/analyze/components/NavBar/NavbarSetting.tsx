import React, { useRef } from 'react';
import DisplaySetting from '@modules/analyze/components/NavBar/DisplaySetting';
import RepoFilter from '@modules/analyze/components/NavBar/RepoFilter';
import { useSnapshot } from 'valtio';
import { avgAndScoreState } from '@modules/analyze/store';
import { AiOutlineSetting } from 'react-icons/ai';
import { useClickAway, useToggle } from 'react-use';
import classnames from 'classnames';
import useLevel from '@modules/analyze/hooks/useLevel';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { CommunityRepoType } from '@common/constant';
import Badge from '../Badge';

const NavbarSetting: React.FC = () => {
  const level = useLevel();
  const snap = useSnapshot(avgAndScoreState);
  const { compareItems } = useCompareItems();
  const [dropdownOpen, toggleDropdown] = useToggle(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleDropdown(false);
  });
  return (
    <div className="relative">
      <div
        className="mx-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#CFCFCF]"
        onClick={() => toggleDropdown()}
      >
        <AiOutlineSetting className="text-xl" />
      </div>
      <ul
        ref={ref}
        style={{ boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.1)' }}
        className={classnames(
          'absolute right-0 z-[200] w-[150px] rounded bg-base-100 py-2 text-xs',
          { hidden: !dropdownOpen }
        )}
      >
        <DisplaySetting
          showAvg={snap.showAvg}
          onAvgChange={(b) => (avgAndScoreState.showAvg = b)}
          showMedian={snap.showMedian}
          onMedianChange={(b) => (avgAndScoreState.showMedian = b)}
          onePoint={snap.onePointSys}
          onChange={(v: boolean) => {
            avgAndScoreState.onePointSys = v;
          }}
        />
        {level === 'community' && (
          <RepoFilter
            repoType={snap.repoType}
            onRepoChange={(b) =>
              (avgAndScoreState.repoType = b as CommunityRepoType)
            }
          />
        )}

        {compareItems.length === 1 ? <Badge /> : null}
      </ul>
    </div>
  );
};

export default NavbarSetting;
