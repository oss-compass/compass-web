import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Input, Modal, Button } from '@oss-compass/ui';
import { FormItemLabel, ItemCard, ItemCardPlus, RepoCard } from '../styled';
import BadgeCount from './BadgeCount';
import SubMenu from './SubMenu';
import CategoryMenu from './CategoryMenu';

const FormDataSet = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <FormItemLabel>选择数据集</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        <ItemCard
          onHandleEdit={() => {
            setOpen(true);
          }}
          onHandleDelete={() => {}}
        />
        <ItemCard
          onHandleEdit={() => {
            setOpen(true);
          }}
          onHandleDelete={() => {}}
        />
        <ItemCard
          onHandleEdit={() => {
            setOpen(true);
          }}
          onHandleDelete={() => {}}
        />
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
            <div className="mb-3 text-2xl font-medium">Add Dataset</div>
            <div className="mb-4 text-sm">Select up to 10 projects</div>
            <Input placeholder="search..." className="mb-4 border-2" />

            <div className="flex h-[440px]">
              <div className="thin-scrollbar overflow-auto">
                <div className="border-silver flex flex-col border-l border-r border-t ">
                  <CategoryMenu />
                  <CategoryMenu />
                  <CategoryMenu />
                  <CategoryMenu />
                </div>
              </div>
              <div className="thin-scrollbar flex-1 overflow-auto pl-4">
                <div className="grid grid-cols-2 gap-4">
                  <RepoCard />
                  <RepoCard />
                  <RepoCard />
                  <RepoCard />
                </div>
              </div>
            </div>

            <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-between border-t bg-white px-9">
              <div>
                找不到合适的数据集？点此通过社区
                <span className="text-primary mr-2">联系我们</span>
              </div>
              <div>
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormDataSet;
