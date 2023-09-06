import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import RepoSelect from '@modules/submitProject/RepoSelect';
import Dialog from '@mui/material/Dialog';
import { Transition } from '@common/components/Dialog';
import InputUrlField, { InputRef } from '../Misc/InputUrlField';
import AddSelectPopover from '../Misc/AddSelectPopover';
import FillItem from '../Misc/FillItem';
import { useTranslation } from 'react-i18next';

export interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export interface Ref {
  getValues: () => string[];
}

const SoftwareArtifactRepository = forwardRef<Ref, Props>(
  ({ value, onChange }, ref) => {
    const { t } = useTranslation();
    const inputRef = useRef<InputRef>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [inputVisible, setInputVisible] = useState(true);

    useImperativeHandle(ref, () => {
      return {
        getValues: () => [],
      };
    });

    return (
      <>
        <label className="mb-4 block text-xl font-medium">
          {t('submit_project:software_artifact_repository')}
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
              onChange([...value, v]);
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
          className="!z-20"
          onSelect={(v) => {
            setPopoverOpen(false);
            if (v === 'input') {
              if (inputVisible) {
                const url = inputRef.current?.verification();
                if (!url) {
                  inputRef.current?.shakeInput();
                  return;
                }
                onChange([...value, url]);
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
              'w-[640px] md:!m-0 md:w-full h-[600px] bg-white border-2 border-black drop-shadow-2xl',
          }}
          onClose={() => {
            setModalVisible(false);
          }}
        >
          <RepoSelect
            onConfirm={(val) => {
              onChange([...value, val]);
              setModalVisible(false);
            }}
          />
        </Dialog>
      </>
    );
  }
);

SoftwareArtifactRepository.displayName = 'SoftwareArtifactRepository';
export default SoftwareArtifactRepository;
