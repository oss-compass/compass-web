import React, { PropsWithChildren, useRef, useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import { useClickAway } from 'react-use';
import { useTranslation } from 'next-i18next';

const DocLink: React.FC<
  PropsWithChildren<{
    description: string;
    weight?: string;
    threshold?: string;
    detail?: string;
    notes?: string;
  }>
> = ({ description, weight, threshold, detail, notes }) => {
  const { t } = useTranslation();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useClickAway(popoverRef, () => {
    setPopoverVisible(false);
  });

  return (
    <div className="h-6 overflow-hidden text-ellipsis whitespace-nowrap">
      <span className="">{description}</span>

      {weight && detail ? (
        <div className="absolute right-0 bottom-2 h-4 w-24 bg-gradient-to-r from-white/30 to-white">
          <a
            className="text-primary float-right ml-1 cursor-pointer hover:underline"
            data-html2canvas-ignore="true"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setPopoverVisible(true);
            }}
          >
            {t('common:know_more')}
          </a>
        </div>
      ) : null}

      <Popper
        open={popoverVisible}
        anchorEl={anchorEl}
        sx={{
          zIndex: 9999,
        }}
        placement="bottom-end"
      >
        <div
          className="flex w-[564px] flex-col overflow-hidden rounded bg-white p-4 text-xs drop-shadow-2xl md:w-[90%]"
          ref={popoverRef}
        >
          {detail ? (
            <>
              <p className="mb-2 flex">
                <span className="w-[78px] flex-shrink-0 font-semibold">
                  • {t('analyze:doc_popper.definition')}:
                </span>
                {description}
              </p>
              <p className="mb-2 flex">
                <span className="w-[78px] flex-shrink-0 font-semibold">
                  • {t('analyze:doc_popper.weight')}:
                </span>
                {weight}
              </p>
              <p className="mb-2 flex">
                <span className="w-[78px] flex-shrink-0 font-semibold">
                  • {t('analyze:doc_popper.threshold')}:
                </span>
                {threshold}
              </p>
              {notes && (
                <p className="mb-2 flex">
                  <span className="w-[78px] flex-shrink-0 font-semibold">
                    • {t('analyze:doc_popper.notes')}:
                  </span>
                  {notes}
                </p>
              )}
              <p className="mt-2 flex">{detail}</p>
            </>
          ) : (
            <>
              <p className="flex">{description}</p>
            </>
          )}
        </div>
      </Popper>
    </div>
  );
};

export default DocLink;
