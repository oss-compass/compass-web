import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Popper from '@mui/material/Popper';
import { useContributorsDetailListQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useGetContributionTypeI18n } from './contribution';
import { getDomainData } from './utils';
import { PopperContent } from './ContributorTable/DomainPersona';
import {
  buildContributorDetailVariables,
  createVirtualAnchor,
  getContributorDetailFromResult,
  getContributorName,
  getPointerPosition,
  isContributorSlice,
  isDetailOfContributor,
} from './contributorPersona';
import type {
  ContributorDetailQueryContext,
  VirtualAnchor,
} from './contributorPersona';

/**
 * Small delay before the window is dismissed: the pointer has to travel from
 * the hovered slice to the window, and entering the window cancels the
 * pending dismissal.
 */
const CLOSE_DELAY = 300;

export interface ContributorHoverState {
  name: string;
  anchorEl: VirtualAnchor;
}

export interface ContributorPopperHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Tracks the contributor slice below the cursor and returns both the echarts
 * events (to forward to `MetricChart#onEvents`) and the props consumed by the
 * floating window. Sharing the logic keeps every contribution pie chart of
 * the deep insight page behaving the same way.
 */
export const useContributorPersonaHover = () => {
  const [hover, setHover] = useState<ContributorHoverState | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setHover(null), CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const chartEvents = useMemo(
    () => ({
      mouseover: (params: any) => {
        if (!isContributorSlice(params)) return;
        const { x, y } = getPointerPosition(params);
        cancelClose();
        setHover({
          name: getContributorName(params),
          anchorEl: createVirtualAnchor(x, y),
        });
      },
      globalout: scheduleClose,
    }),
    [cancelClose, scheduleClose]
  );

  const popperHandlers = useMemo(
    () => ({ onMouseEnter: cancelClose, onMouseLeave: scheduleClose }),
    [cancelClose, scheduleClose]
  );

  return { hover, chartEvents, popperHandlers };
};

const ContributorDomainPersonaTooltip: React.FC<
  ContributorDetailQueryContext & {
    hover: ContributorHoverState | null;
    popperHandlers: ContributorPopperHandlers;
  }
> = ({ label, level, beginDate, endDate, hover, popperHandlers }) => {
  const contributionTypeMap = useGetContributionTypeI18n();
  const contributor = hover?.name || '';
  const { data } = useContributorsDetailListQuery(
    client,
    buildContributorDetailVariables(
      { label, level, beginDate, endDate },
      contributor
    ),
    { enabled: Boolean(contributor) }
  );
  const { detail, origin } = getContributorDetailFromResult(data);
  const domainData = useMemo(() => {
    const contributionTypeList = detail?.contributionTypeList;
    if (!contributionTypeList || contributionTypeList.length === 0) {
      return [];
    }
    return getDomainData(contributionTypeList, contributionTypeMap);
  }, [detail, contributionTypeMap]);
  const [active, setActive] = useState('');
  useEffect(() => {
    // Preselect the strongest domain so the details column is never empty.
    setActive(domainData[0]?.type || '');
  }, [domainData]);
  const open =
    domainData.length > 0 && isDetailOfContributor(detail, contributor);

  return (
    <Popper
      open={open}
      anchorEl={hover?.anchorEl ?? null}
      placement="right-start"
      style={{ zIndex: 1200 }}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [16, 16],
          },
        },
      ]}
    >
      <div data-html2canvas-ignore="true" {...popperHandlers}>
        <PopperContent
          dataList={domainData}
          name={hover?.name || ''}
          active={active}
          setActive={setActive}
          origin={origin}
        />
      </div>
    </Popper>
  );
};

export default ContributorDomainPersonaTooltip;
