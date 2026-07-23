import React from 'react';
import LinkLegacy from '@common/components/LinkLegacy';
import { Paragraph, DocTitle } from './components';

const Charter = () => {
  return (
    <div className="mb-24">
      <DocTitle>Charter / 章程</DocTitle>
      <Paragraph>
        The OSS Compass community charter is available
        <LinkLegacy href="https://github.com/oss-compass/community-zh/tree/main/governance">
          here
        </LinkLegacy>
        . / OSS Compass 社区章程请
        <LinkLegacy href="https://github.com/oss-compass/community-zh/tree/main/governance">
          点击查看
        </LinkLegacy>
        。
      </Paragraph>
    </div>
  );
};

export default Charter;
