import React from 'react';
import { useTranslation } from 'react-i18next';
import PopCardMobile from './PopCardMobile';
import { usePlantList } from '@modules/home/Explain/plantConfig';
import classnames from 'classnames';
import styles from '@modules/home/Explain/index.module.scss';

const Mobile = () => {
  const { t, i18n } = useTranslation();
  const plantList = usePlantList();
  return (
    <section className={'relative h-[900px] w-full >lg:hidden'}>
      <div
        className={classnames(
          'absolute top-0 left-0 right-0 bottom-0',
          styles.mobileBg
        )}
      ></div>
      <div
        className={classnames(
          'absolute top-0 left-0 right-0 bottom-0',
          styles.mobilePlantBg,
          i18n.language === 'zh' ? styles.plantBgZh : styles.plantBgEu
        )}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto ">
        <div
          className={classnames('relative grid grid-cols-2 gap-4 px-4 py-4 ')}
        >
          {plantList.map((p) => {
            return (
              <PopCardMobile
                key={`${p.color + p.left}`}
                tag={p.color}
                popContent={p.popContent}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mobile;
