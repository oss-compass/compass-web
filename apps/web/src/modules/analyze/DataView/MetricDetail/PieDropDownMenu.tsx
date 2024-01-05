import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDots } from 'react-icons/bs';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import classnames from 'classnames';

interface CardDropDownMenuProps {
  showOrgModel?: boolean;
  orgModel?: boolean;
  onOrgModelChange?: (v: boolean) => void;
  onlyIdentity?: boolean;
  onOnlyIdentityChange?: (v: boolean) => void;
  onlyOrg?: boolean;
  onOnlyOrgChange?: (v: boolean) => void;
}

const CardDropDownMenu = (props: CardDropDownMenuProps) => {
  const {
    showOrgModel = false,
    orgModel = true,
    onlyIdentity = false,
    onlyOrg = false,
    onOrgModelChange,
    onOnlyIdentityChange,
    onOnlyOrgChange,
  } = props;

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const ReferenceNode = (
    <>
      {showOrgModel && (
        <div
          className={classnames(
            'flex h-8 cursor-pointer  items-center  border-b  px-4 md:hidden',
            [orgModel ? 'text-primary' : 'text-[#585858]']
          )}
          onClick={() => {
            onOrgModelChange?.(!orgModel);
          }}
        >
          <span className="ml-1 text-xs">
            {t('analyze:metric_detail:show_organization')}
          </span>
        </div>
      )}
      <div
        className={classnames(
          'flex h-8 cursor-pointer items-center border-b  px-4 md:hidden',
          [onlyIdentity ? 'text-primary' : 'text-[#585858]']
        )}
        onClick={() => {
          onOnlyIdentityChange?.(!onlyIdentity);
        }}
      >
        <span className="ml-1 text-xs">
          {t('analyze:metric_detail:only_manager_participant')}
        </span>
      </div>
      <div
        className={classnames(
          'flex h-8 cursor-pointer items-center px-4 md:hidden',
          [onlyOrg ? 'text-primary' : 'text-[#585858]']
        )}
        onClick={() => {
          onOnlyOrgChange?.(!onlyOrg);
        }}
      >
        <span className="ml-1 text-xs">
          {t('analyze:metric_detail:only_individual_organization')}
        </span>
      </div>
    </>
  );

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (!open) return;
          setOpen(() => false);
        }}
      >
        <div data-html2canvas-ignore="true">
          <div
            className="ml-2 cursor-pointer p-1 text-lg"
            onClick={(e) => handleClick(e)}
          >
            <BsThreeDots />
          </div>
          <Popper
            id={id}
            open={open}
            style={{
              zIndex: 1000,
            }}
            placement={'bottom-end'}
            anchorEl={anchorEl}
          >
            <div className="rounded bg-white py-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.1)]">
              {ReferenceNode}
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CardDropDownMenu;
