import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import dayjs from 'dayjs';

const calculateExpiryDate = (days: number | null) => {
  if (days === null) return '永不过期';
  return dayjs().add(days, 'day').format('YYYY-MM-DD');
};

const TokenItem = ({ token, index, tokens, onSuccess }) => {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);

  const onDelete = () => {
    const updatedTokens = [...tokens];
    updatedTokens.splice(index, 1);
    onSuccess(updatedTokens);
  };

  return (
    <div>
      {showEdit ? (
        <TokenEdit
          setShowEdit={setShowEdit}
          tokens={tokens}
          onSuccess={onSuccess}
          type="edit"
          index={index}
        />
      ) : (
        <div className="flex items-center justify-between border-b border-[#E7E7E7] py-4">
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
              onClick={onDelete}
            />
            <FiEdit
              className="cursor-pointer"
              onClick={() => setShowEdit(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const TokenEdit = ({ setShowEdit, tokens, onSuccess, type, index }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(tokens[index]?.name || '');
  const [expiry, setExpiry] = useState(tokens[index]?.expiry || 7);

  const onSave = () => {
    const updatedTokens = [...tokens];
    updatedTokens[index] = {
      ...updatedTokens[index],
      name,
      expiredAt: calculateExpiryDate(expiry),
    };
    onSuccess(updatedTokens);
    setShowEdit(false);
  };

  return (
    <div className="rounded border border-gray-300 p-4">
      <input
        placeholder={t('setting:profile.token_name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 w-full rounded border border-gray-300 p-2"
      />
      <select
        value={expiry}
        onChange={(e) => setExpiry(Number(e.target.value))}
        className="mb-2 w-full rounded border border-gray-300 p-2"
      >
        <option value={7}>7天后过期</option>
        <option value={30}>30天后过期</option>
        <option value={90}>90天后过期</option>
        <option value={null}>永不过期</option>
      </select>
      <div className="flex justify-end">
        <button
          onClick={() => setShowEdit(false)}
          className="mr-2 rounded border border-gray-300 px-4 py-2"
        >
          {t('common:cancel')}
        </button>
        <button
          onClick={onSave}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {t('common:save')}
        </button>
      </div>
    </div>
  );
};

const PersonalTokens = () => {
  const { t } = useTranslation();
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
  const [showEdit, setShowEdit] = useState(false);

  const onSuccess = (updatedTokens) => {
    setTokens(updatedTokens);
  };

  const onAddToken = () => {
    const newToken = {
      name: '',
      generatedAt: dayjs().format('YYYY-MM-DD'),
      expiredAt: calculateExpiryDate(7),
    };
    setTokens([...tokens, newToken]);
    setShowEdit(true);
  };

  return (
    <div className="w-[560px] lg:w-full">
      <div className="pb-2 pt-10 text-xl font-bold">
        {t('setting:profile.personal_tokens')}
      </div>
      <div className="mb-2">{t('setting:profile.personal_tokens_desc')}</div>
      <div>
        {tokens.map((token, index) => (
          <TokenItem
            key={token.name + index}
            token={token}
            index={index}
            tokens={tokens}
            onSuccess={onSuccess}
          />
        ))}
      </div>
      {showEdit && (
        <TokenEdit
          setShowEdit={setShowEdit}
          tokens={tokens}
          onSuccess={onSuccess}
          type="add"
          index={tokens.length - 1}
        />
      )}
      <div className="mt-4">
        <span
          className={classNames('cursor-pointer text-[#3A5BEF] ', {
            'cursor-not-allowed !text-[#868690]': showEdit,
          })}
          onClick={() => {
            !showEdit && onAddToken();
          }}
        >
          {t('setting:profile.add_a_new_token')}
        </span>
      </div>
    </div>
  );
};

export default PersonalTokens;
