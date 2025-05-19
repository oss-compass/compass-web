import React, { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import classNames from 'classnames';
import dayjs from 'dayjs';
import client from '@common/gqlClient';
import {
  useCreateAuthTokenMutation,
  useDeleteAuthTokenMutation,
  useTokenListQuery,
} from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const PersonalTokens = () => {
  const { t } = useTranslation();
  const { data, refetch } = useTokenListQuery(client);
  const createMutation = useCreateAuthTokenMutation(client, {
    onSuccess(res) {
      if (res.createAuthToken?.data?.token) {
        setNewToken(res.createAuthToken.data.token);
        setShowTokenModal(true);
        setShowAddModal(false);
        setNewTokenName('');
        setNewTokenExpiry(7);
        setTimeout(() => {
          refetch();
        }, 500);
      } else {
        toast.error(
          res.createAuthToken?.message || t('common:toast.add_failed')
        );
      }
    },
    onError(e: any) {
      const errors = e?.response?.errors;
      let msg = '';
      if (Array.isArray(errors) && errors.length > 0) {
        msg = errors[0].message;
      }
      toast.error(msg || t('common:toast.add_failed'));
    },
  });
  const deleteMutation = useDeleteAuthTokenMutation(client, {
    onSuccess(res) {
      if (res.deleteAuthToken?.status === true) {
        toast.success(
          res.deleteAuthToken?.message || t('common:toast.delete_successful')
        );
        setTimeout(() => {
          refetch();
        }, 500);
      } else {
        toast.error(
          res.deleteAuthToken?.message || t('common:toast.delete_failed')
        );
      }
    },
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenExpiry, setNewTokenExpiry] = useState(7);
  const [newToken, setNewToken] = useState('');
  const tokens = data?.tokenList || [];

  const onAddToken = () => {
    const tokenData = {
      name: newTokenName,
      expiresAt: dayjs().add(newTokenExpiry, 'day').toISOString(),
    };
    createMutation.mutate({ ...tokenData });
  };

  // const onDeleteToken = (tokenId) => {
  //   deleteMutation.mutate({ id: tokenId });
  // };
  const onDeleteToken = (tokenId) => {
    setTokenToDelete(tokenId);
    setShowConfirmDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    if (tokenToDelete) {
      deleteMutation.mutate({ id: tokenToDelete });
      setShowConfirmDeleteModal(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(newToken)
      .then(() => {
        message.success(t('setting:token.token_copied'));
      })
      .catch(() => {
        message.error(t('setting:token.copy_token_failed'));
      });
  };

  return (
    <div id="personalTokens" className="w-[560px] lg:w-full">
      <div className="pb-2 pt-10 text-xl font-bold">
        {t('setting:token.private_token')}
      </div>
      <div className="mb-2">{t('setting:token.access_api')}</div>
      <div>
        {tokens.map((token) => (
          <div
            key={token.id}
            className="flex items-center justify-between border-b border-[#E7E7E7] py-4"
          >
            <div className="flex">
              <div className="mr-2 w-[120px] font-bold">
                <span className="line-clamp-1" title={token.name}>
                  {token.name}
                </span>
              </div>
              <div className="flex text-[#868690]">
                <div className="mr-2">{t('setting:token.expires_at')}</div>
                <div className="ml-1">
                  {dayjs(token.expiresAt).format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
            <div className="flex">
              <RiDeleteBinLine
                className="mr-4 cursor-pointer"
                onClick={() => onDeleteToken(token.id)}
              />
              {/* <FiEdit className="cursor-pointer" /> */}
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
          {t('setting:token.add_private_token')}
        </span>
      </div>
      <Modal
        title={t('setting:token.add_private_token_title')}
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddModal(false)}>
            {t('common:btn.cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onAddToken}
            disabled={!newTokenName || newTokenExpiry === undefined}
          >
            {t('common:btn.save')}
          </Button>,
        ]}
      >
        <Input
          placeholder={t('setting:token.token_name')}
          value={newTokenName}
          onChange={(e) => setNewTokenName(e.target.value)}
          className="mb-2"
        />
        <Select
          options={[
            { label: t('setting:token.expiry.7_days'), value: 7 },
            { label: t('setting:token.expiry.30_days'), value: 30 },
            { label: t('setting:token.expiry.90_days'), value: 90 },
            { label: t('setting:token.expiry.180_days'), value: 180 },
          ]}
          placeholder={t('setting:token.select_expiry')}
          value={newTokenExpiry}
          onChange={(value) => setNewTokenExpiry(value)}
          className="w-full"
        />
      </Modal>
      <Modal
        title={t('setting:token.token_created')}
        open={showTokenModal}
        onCancel={() => setShowTokenModal(false)}
        footer={[
          <Button key="copy" type="primary" onClick={handleCopy}>
            {t('setting:token.copy_token')}
          </Button>,
          <Button key="close" onClick={() => setShowTokenModal(false)}>
            {t('common:btn.confirm_close')}
          </Button>,
        ]}
      >
        <div className="p-4">
          <p>{t('setting:token.your_token')}:</p>
          <pre
            className="my-4"
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            {newToken}
          </pre>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            {t('setting:token.save_token_warning')}
          </p>
        </div>
      </Modal>
      <Modal
        title={t('common:btn.delete')}
        open={showConfirmDeleteModal}
        onCancel={() => setShowConfirmDeleteModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowConfirmDeleteModal(false)}>
            {t('common:btn.cancel')}
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmDelete}>
            {t('common:btn.confirm')}
          </Button>,
        ]}
      >
        <p>{t('setting:token.delete_token')}</p>
      </Modal>
    </div>
  );
};

export default PersonalTokens;
