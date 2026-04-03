import React, { useState, useMemo, useEffect } from 'react';
import useMenuContent from '../useMenuContent';
import type { MenuProps } from 'antd';
import { Menu, Tag } from 'antd';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@common/monumentedStation';
import { getLocalizedText } from '@modules/dataHub/utils';
import type { ApiMenuNode } from '../menuTree';
import { isApiMenuGroup } from '../menuTree';

type MenuTreeItem = NonNullable<NonNullable<MenuProps['items']>[number]>;
const MENU_INLINE_INDENT = 14;
const RECOMMENDED_TEXT = {
  en: 'Recommended',
  zh: '推荐',
};

const getRecommendedText = (language: string) => {
  return language === 'zh' || language === 'zh-CN'
    ? RECOMMENDED_TEXT.zh
    : RECOMMENDED_TEXT.en;
};

const renderGroupLabel = (name: string, label: string, language: string) => {
  if (name !== 'V3 API') {
    return label;
  }

  return (
    <span className="flex items-center gap-2">
      <span className="truncate">{label}</span>
      <Tag color="processing">{getRecommendedText(language)}</Tag>
    </span>
  );
};

const buildApiItems = (
  nodes: ApiMenuNode[],
  language: string
): MenuTreeItem[] => {
  return nodes.map((node): MenuTreeItem => {
    if (isApiMenuGroup(node)) {
      return {
        key: node.key,
        label: renderGroupLabel(
          node.name,
          getLocalizedText(node.convertName, language),
          language
        ),
        children: buildApiItems(node.children, language),
      };
    }

    return {
      key: node.id,
      label: getLocalizedText(node.summary, language),
    };
  });
};

const findParentKeys = (key: string, menuItems: MenuTreeItem[]): string[] => {
  for (const item of menuItems) {
    const itemKey = 'key' in item ? String(item.key) : '';
    if (itemKey === key) {
      return [itemKey];
    }

    const childItems =
      'children' in item && Array.isArray(item.children)
        ? (item.children as MenuTreeItem[])
        : undefined;

    if (childItems) {
      const childKeys = findParentKeys(key, childItems);
      if (childKeys.length > 0) {
        return [itemKey, ...childKeys];
      }
    }
  }

  return [];
};

const SideBarContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { result } = useMenuContent();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const currentHash = useHashchangeEvent();

  const onClick: MenuProps['onClick'] = (e) => {
    const menuKey = String(e.key);

    if (menuKey.startsWith('api')) {
      trackEvent({
        module: 'dataHub',
        type: 'rest_api',
        content: {
          menu_key: menuKey,
        },
      });
    }

    window.location.hash = menuKey;
  };

  const apiItems = useMemo(() => {
    const items = buildApiItems(result || [], i18n.language);

    items.unshift({
      key: 'introduction',
      label: t('open_api:introduction'),
    });

    return items;
  }, [i18n.language, result, t]);

  const items = useMemo<MenuTreeItem[]>(
    () => [
      { key: 'about', label: t('common:header.about') },
      { key: 'restApi', label: 'REST API', children: apiItems },
      {
        key: 'archive',
        label: t('open_api:archived_data'),
        children: [
          { key: 'archive-insight', label: t('open_api:opensource_insight') },
        ],
      },
    ],
    [apiItems, t]
  );

  useEffect(() => {
    const hash = currentHash.replace('#', '');

    if (!hash) {
      setSelectedKeys([]);
      return;
    }

    setSelectedKeys([hash]);

    const parentKeys = findParentKeys(hash, items).slice(0, -1);
    setOpenKeys((prev) => Array.from(new Set([...prev, ...parentKeys])));
  }, [currentHash, items]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <>
      <div className="mb-4 line-clamp-1 px-6 text-lg font-semibold">
        {t('common:header.opensource_research_service')}
      </div>
      <Menu
        onClick={onClick}
        style={{ width: '100%', border: 0, fontWeight: 500 }}
        mode="inline"
        inlineIndent={MENU_INLINE_INDENT}
        items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default SideBarContent;
