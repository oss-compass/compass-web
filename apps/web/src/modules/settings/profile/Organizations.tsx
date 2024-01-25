import React, { useRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import OrgEdit from '@common/components/OrgEdit';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { useSnapshot } from 'valtio';
import { userInfoStore, userEvent } from '@modules/auth/UserInfoStore';
import {
  useModifyUserOrgsMutation,
  ContributorOrgInput,
} from '@oss-compass/graphql';

const OrgItem = ({ provider, index, organizations, onSuccess }) => {
  const customFormat = (date) => {
    if (date.startsWith('2099')) {
      return t('common:up_to_now');
    }
    return date;
  };
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);
  const mutation = useModifyUserOrgsMutation(client, {
    onSuccess(res) {
      if (res.modifyUserOrgs?.status === 'true') {
        onSuccess();
        toast.success(
          res.modifyUserOrgs?.message || t('common:toast.delete_successful')
        );
      }
      if (res.modifyUserOrgs?.status === 'false') {
        toast.error(
          res.modifyUserOrgs?.message || t('common:toast.delete_successful')
        );
      }
    },
  });
  const onDelete = () => {
    const arr = [...organizations];
    arr.splice(index, 1);
    mutation.mutate({
      platform: 'github',
      organizations: [...arr],
    });
  };
  return (
    <div>
      {showEdit ? (
        <OrgEdit
          setShowEdit={setShowEdit}
          organizations={organizations as ContributorOrgInput[]}
          onSuccess={onSuccess}
          type={'edit'}
          index={index}
        />
      ) : (
        <div className="flex items-center justify-between border-b border-[#E7E7E7] py-4">
          <div className="flex">
            <div className="mr-2 w-[120px] font-bold">
              <span className="line-clamp-1" title={provider.orgName}>
                {provider.orgName}
              </span>
            </div>
            <div className="flex text-[#868690]">
              <div className="mr-2">{customFormat(provider?.firstDate)}</div>
              {'-'}{' '}
              <div className="ml-2">{customFormat(provider?.lastDate)}</div>
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

const Organizations = () => {
  const { t } = useTranslation();
  const { currentUser } = useSnapshot(userInfoStore);
  const contributingOrgs = currentUser.contributingOrgs.map((item) => {
    return {
      orgName: item.orgName,
      firstDate: item.firstDate?.slice(0, 10),
      lastDate: item.lastDate?.slice(0, 10),
    };
  });
  const [showEdit, setShowEdit] = useState(false);
  const onSuccess = () => {
    setTimeout(() => {
      userInfoStore.event$?.emit(userEvent.REFRESH);
    }, 1000);
  };
  return (
    <div className="w-[560px] lg:w-full">
      <div className="pb-2 pt-10 text-xl font-bold">
        {t('setting:profile.organizations')}
      </div>
      <div className="mb-2">{t('setting:profile.organizations_desc')}</div>
      <div>
        {contributingOrgs.map((item, index) => {
          return (
            <OrgItem
              key={item.orgName + index}
              provider={item}
              index={index}
              organizations={contributingOrgs as ContributorOrgInput[]}
              onSuccess={onSuccess}
            />
          );
        })}
      </div>
      {showEdit && (
        <OrgEdit
          setShowEdit={setShowEdit}
          organizations={contributingOrgs as ContributorOrgInput[]}
          onSuccess={onSuccess}
        />
      )}
      <div className="mt-4">
        <span
          className={classNames('cursor-pointer text-[#3A5BEF] ', {
            'cursor-not-allowed !text-[#868690]': showEdit,
          })}
          onClick={() => {
            !showEdit && setShowEdit(true);
          }}
        >
          {t('setting:profile.add_a_new_organization')}
        </span>
      </div>
    </div>
  );
};

export default Organizations;
