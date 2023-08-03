import React, { useState } from 'react';
import { Input, Modal, Button } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { FormItemLabel } from '../styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { BadgeCount } from '../styled';
import { ItemCard, ItemCardPlus } from './ItemCard';
import CategoryMenu from './CategoryMenu';

const FormMetric = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <FormItemLabel>选择度量指标</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        <ItemCard onHandleEdit={() => {}} onHandleDelete={() => {}} />
        <ItemCard onHandleEdit={() => {}} onHandleDelete={() => {}} />
        <ItemCard onHandleEdit={() => {}} onHandleDelete={() => {}} />
        <ItemCardPlus
          onHandleAdd={() => {
            setOpen(true);
          }}
        />
      </div>

      <Modal
        disableEnforceFocus
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
          <div
            className="absolute top-10 right-10 cursor-pointer p-2 "
            onClick={() => {
              setOpen(false);
            }}
          >
            <GrClose />
          </div>

          <div className="px-10 pt-8">
            <div className="mb-3 text-2xl font-medium">Add Metrics</div>
            <div className="mb-4 text-sm">Select up to 10 metricses</div>
            <Input placeholder="search..." className="mb-4 border-2" />

            <div className="flex h-[440px]">
              <div className="thin-scrollbar overflow-auto">
                <div className="border-silver flex flex-col border-l border-r border-t ">
                  <CategoryMenu />
                  <CategoryMenu />
                  <CategoryMenu />
                  <CategoryMenu />
                  <CategoryMenu />
                </div>
              </div>
              <div className="thin-scrollbar flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-4"></div>
              </div>
            </div>

            <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-between border-t bg-white px-9">
              <Button className="w-full">Save</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormMetric;
