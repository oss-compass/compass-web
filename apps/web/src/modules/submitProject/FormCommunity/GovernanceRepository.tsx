import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import uniq from 'lodash/uniq';
import Dialog from '@mui/material/Dialog';
import RepoSelect from '@modules/submitProject/RepoSelect';
import { Transition } from '@common/components/Dialog';
import InputUrlField, { InputRef } from '../Misc/InputUrlField';
import AddSelectPopover from '../Misc/AddSelectPopover';
import FillItem from '../Misc/FillItem';
import { useTranslation } from 'react-i18next';
import Tooltip from '@common/components/Tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export interface Ref {
  getValues: () => string[];
}

const GovernanceRepository = forwardRef<Ref, Props>(
  ({ value, onChange }, ref) => {
    const { t } = useTranslation();
    const inputRef = useRef<InputRef>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        getValues: () => [],
      };
    });

    return (
      <>
        <label className="mt-10 mb-4 flex items-center text-xl font-medium">
          {t('submit_project:governance_repository')}
          <Tooltip
            arrow
            title={
              <>
                <span className="text-sm">
                  {t('submit_project:governance_repository_desc')}
                </span>
              </>
            }
            placement="right"
          >
            <span className="ml-2 cursor-pointer">
              <AiOutlineQuestionCircle />
            </span>
          </Tooltip>
          <span className="ml-2 text-base font-normal text-gray-400">
            ({t('submit_project:optional')})
          </span>
        </label>

        {value.map((item, index, array) => {
          return (
            <FillItem
              key={item}
              url={item}
              onDelete={(v) => {
                const newUrls = value.filter((url) => url !== v);
                onChange(newUrls);
              }}
            />
          );
        })}

        {inputVisible && (
          <InputUrlField
            ref={inputRef}
            onClose={() => {
              setInputVisible(false);
            }}
            onPressEnter={(v) => {
              onChange(uniq([...value, v]));
            }}
          />
        )}

        <AddSelectPopover
          open={popoverOpen}
          onClose={() => {
            setPopoverOpen(false);
          }}
          onClick={() => {
            setPopoverOpen(true);
          }}
          onSelect={(v) => {
            setPopoverOpen(false);
            if (v === 'input') {
              if (inputVisible) {
                const url = inputRef.current?.verification();
                if (!url) {
                  inputRef.current?.shakeInput();
                  return;
                }
                onChange(uniq([...value, url]));
              }
              setInputVisible(true);
            }

            if (v === 'select') setModalVisible(true);
          }}
        />

        <Dialog
          TransitionComponent={Transition}
          open={modalVisible}
          classes={{
            paper:
              'w-[640px] md:w-full md:!m-0 h-[600px] bg-white border-2 border-black drop-shadow-2xl',
          }}
          onClose={() => {
            setModalVisible(false);
          }}
        >
          <RepoSelect
            onConfirm={(val) => {
              onChange(uniq([...value, val]));
              setModalVisible(false);
            }}
          />
        </Dialog>
      </>
    );
  }
);

GovernanceRepository.displayName = 'GovernanceRepository';
export default GovernanceRepository;
