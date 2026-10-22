import React from 'react';
import LinkLegacy from '@common/components/LinkLegacy';
import { DocTitle, Paragraph } from './components';

const Charter = () => {
  return (
    <div className="mb-24">
      <DocTitle>Charter / 章程</DocTitle>
      <Paragraph>
        The OSS Compass community charter describes how the project is governed.
        It is currently available in Chinese only.
        <LinkLegacy href="https://github.com/oss-compass/community-zh/blob/main/governance/Charter_Zh-CN.md">
          Read the charter
        </LinkLegacy>
        . OSS Compass 社区章程（目前仅提供中文版）
        <LinkLegacy href="https://github.com/oss-compass/community-zh/blob/main/governance/Charter_Zh-CN.md">
          点击查看
        </LinkLegacy>
        。
      </Paragraph>
    </div>
  );
};

export default Charter;
