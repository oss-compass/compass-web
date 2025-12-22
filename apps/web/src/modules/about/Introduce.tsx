import React from 'react';
import DocLink from '@common/components/DocLink';
import LinkLegacy from '@common/components/LinkLegacy';
import { Paragraph, DocTitle } from './components';
import { useTranslation, Trans } from 'next-i18next';

const Introduce = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-24">
      <DocTitle>{t('about:our_vision')}</DocTitle>
      <Paragraph>
        <Trans
          i18nKey={'about:our_vision_desc1' as any}
          components={{
            s: <LinkLegacy href="https://oss-compass.org/" />,
          }}
          values={{
            v: t('common:oss_compass'),
          }}
        />
      </Paragraph>

      <Paragraph>
        <Trans
          i18nKey={'about:our_vision_desc2' as any}
          components={{
            m: (
              <LinkLegacy href="https://github.com/oss-compass/docs/tree/main/metrics-models/" />
            ),
            s: <LinkLegacy href="https://oss-compass.org/" />,
          }}
          values={{
            e: t('about:ecosystem_evaluation_system'),
            v: t('common:oss_compass'),
          }}
        />
      </Paragraph>

      <DocTitle>{t('about:communication')}</DocTitle>
      <Paragraph>
        <Trans
          i18nKey={'about:communication_desc' as any}
          components={{
            l: <DocLink href="/docs/community/" />,
          }}
          values={{
            v: t('about:this_page'),
          }}
        />
      </Paragraph>

      <DocTitle>{t('about:acknowledgements')}</DocTitle>
      <Paragraph>
        <Trans
          i18nKey={'about:acknowledgements_desc' as any}
          components={{
            l: <LinkLegacy href="https://chaoss.community/" />,
          }}
          values={{
            v: t('about:chaoss_community'),
          }}
        />
      </Paragraph>
    </div>
  );
};

export default Introduce;
