import React, { useState } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import classNames from 'classnames';
import dayjs from 'dayjs';

const { Option } = Select;

const calculateExpiryDate = (days: number | null) => {
  if (days === null) return '永不过期';
  return dayjs().add(days, 'day').format('YYYY-MM-DD');
};

const PersonalTokens = () => {
  const [tokens, setTokens] = useState([
    {
      name: 'Token 1',
      generatedAt: dayjs().format('YYYY-MM-DD'),
      expiredAt: calculateExpiryDate(7),
    },
    {
      name: 'Token 2',
      generatedAt: dayjs().format('YYYY-MM-DD'),
      expiredAt: calculateExpiryDate(30),
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenExpiry, setNewTokenExpiry] = useState<number | null>(7);

  const onSuccess = (updatedTokens: any[]) => {
    setTokens(updatedTokens);
  };

  const onAddToken = () => {
    const newToken = {
      name: newTokenName,
      generatedAt: dayjs().format('YYYY-MM-DD'),
      expiredAt: calculateExpiryDate(newTokenExpiry),
    };
    setTokens([...tokens, newToken]);
    setShowAddModal(false);
    setNewTokenName('');
    setNewTokenExpiry(7);
  };

  const onDeleteToken = (index: number) => {
    const updatedTokens = [...tokens];
    updatedTokens.splice(index, 1);
    onSuccess(updatedTokens);
  };

  return (
    <div className="w-[560px] lg:w-full">
      <div className="pb-2 pt-10 text-xl font-bold">私人令牌</div>
      <div className="mb-2">使用私人令牌访问 OSS Compass Open API。</div>
      <div>
        {tokens.map((token, index) => (
          <div
            key={token.name + index}
            className="flex items-center justify-between border-b border-[#E7E7E7] py-4"
          >
            <div className="flex">
              <div className="mr-2 w-[120px] font-bold">
                <span className="line-clamp-1" title={token.name}>
                  {token.name}
                </span>
              </div>
              <div className="flex text-[#868690]">
                <div className="mr-2">{token.generatedAt}</div>
                {'-'} <div className="ml-2">{token.expiredAt}</div>
              </div>
            </div>
            <div className="flex">
              <RiDeleteBinLine
                className="mr-4 cursor-pointer"
                onClick={() => onDeleteToken(index)}
              />
              <FiEdit className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <span
          className={classNames('cursor-pointer text-[#3A5BEF] ', {
            'cursor-not-allowed !text-[#868690]': showAddModal,
          })}
          onClick={() => {
            !showAddModal && setShowAddModal(true);
          }}
        >
          新增私人令牌
        </span>
      </div>
      <Modal
        title="新增私人令牌"
        visible={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddModal(false)}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onAddToken}
            disabled={!newTokenName || newTokenExpiry === undefined}
          >
            保存
          </Button>,
        ]}
      >
        <Input
          placeholder="令牌名称"
          value={newTokenName}
          onChange={(e) => setNewTokenName(e.target.value)}
          className="mb-2"
        />
        <Select
          placeholder="选择过期时间"
          value={newTokenExpiry}
          onChange={(value) => setNewTokenExpiry(value)}
          className="w-full"
        >
          <Option value={7}>7天后过期</Option>
          <Option value={30}>30天后过期</Option>
          <Option value={90}>90天后过期</Option>
          <Option value={null}>永不过期</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default PersonalTokens;
