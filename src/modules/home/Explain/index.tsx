import React from 'react';
import classnames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { useCounter } from 'react-use';
import LinkX from '@common/components/LinkX';
import { usePlantList, useModelList } from './plantConfig';
import PopCard from './PopCard';
import Plant from './Plant';
import Estrela from './Estrela';
import styles from './index.module.scss';

const SectionExplain = () => {
  const { t, i18n } = useTranslation();
  const plantList = usePlantList();
  const modelList = useModelList();
  const [value, { inc, reset, set }] = useCounter(
    plantList.length,
    plantList.length,
    0
  );

  return (
    <section>
      <div
        id="sectionexplain"
        className={classnames(
          styles.bg,
          'relative h-[900px] w-full overflow-hidden'
        )}
      >
        <div className={classnames('h-full w-full')}>
          <div
            className={classnames(
              styles.plantBg,
              i18n.language === 'zh' ? styles.plantBgZh : styles.plantBgEu,
              'h-full w-full'
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                set(plantList.length);
              }
            }}
          >
            <div className="absolute top-1/2 left-1/2">
              <LinkX href="/docs/metrics-models/robustness/">
                <a className={classnames(styles.title1)}></a>
              </LinkX>
              <LinkX href="/docs/category/productivity/">
                <a className={classnames(styles.title2)}></a>
              </LinkX>
              <LinkX href="/docs/metrics-models/niche-creation/">
                <a className={classnames(styles.title3)}></a>
              </LinkX>
              {modelList.map(({ name, ...item }, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      top: item.top + 'px',
                      left: item.left + 'px',
                      width: item.width + 'px',
                      height: item.height + 'px',
                      color: item.color,
                    }}
                    className={classnames(styles.modelStyle)}
                  >
                    {name}
                  </div>
                );
              })}
              {plantList.map(({ popContent, ...item }, i) => {
                return (
                  <Plant
                    key={i}
                    prop={item}
                    onMouseHover={() => {
                      set(i);
                    }}
                    className={classnames({ '!opacity-100': value == i })}
                  >
                    {value === i && (
                      <PopCard
                        className={classnames('left-[25px]', {
                          '-top-[145px]': item.bottom,
                          '-left-[245px]': item.right,
                        })}
                        popContent={popContent}
                        onNext={() => {
                          i === plantList.length - 1 ? reset() : inc();
                        }}
                      />
                    )}
                  </Plant>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={classnames(
            styles.working,
            'text-white md:px-2 md:text-3xl'
          )}
        >
          <Trans
            i18nKey="oss_eco_evaluation_system"
            ns="home"
            components={{
              br: <br />,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionExplain;
