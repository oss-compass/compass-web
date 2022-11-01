import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import RepoSelect from '@modules/submitProject/RepoSelect';
import Modal from '@common/components/Modal';
import InputUrlField, { InputRef } from '../Misc/InputUrlField';
import AddSelectPopover from '../Misc/AddSelectPopover';
import FillItem from '../Misc/FillItem';

export interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export interface Ref {
  getValues: () => string[];
}

const SoftwareArtifactRepository = forwardRef<Ref, Props>(
  ({ value, onChange }, ref) => {
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
          Software Artifact Repository
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

        <Modal
          visible={modalVisible}
          bodyClass={
            'w-[640px] md:w-full h-[600px] bg-white border-2 border-black drop-shadow-2xl'
          }
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
        </Modal>
      </>
    );
  }
);

SoftwareArtifactRepository.displayName = 'SoftwareArtifactRepository';
export default SoftwareArtifactRepository;
