import React, { useEffect, useState, useMemo } from 'react';
import useMenuContent from '../useMenuContent';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from '@modules/dataHub/utils';

const SideBarContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { result } = useMenuContent();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const currentHash = useHashchangeEvent();

  const onClick: MenuProps['onClick'] = (e) => {
    window.location.hash = e.key;
  };

  // 构建菜单项
  const ApiItems = useMemo(() => {
    const res = result.map((item) => {
      return {
        key: item.name,
        label: getLocalizedText(item.convertName, i18n.language),
        children: item.menus.map((menu) => {
          return {
            key: menu?.name || menu?.id,
            label: getLocalizedText(
              menu?.convertName || menu?.summary,
              i18n.language
            ),
            children: menu?.subMenus?.map((subMenu) => {
              return {
                key: subMenu.id,
                label: getLocalizedText(subMenu.summary, i18n.language),
              };
            }),
          };
        }),
      };
    });
    res.unshift({
      key: 'introduction',
      label: t('open_api:introduction'),
      children: undefined,
    });
    return res;
  }, [result, i18n.language]);

  const items = [
    { key: 'about', label: t('common:header.about') },
    { key: 'restApi', label: 'REST API', children: ApiItems },
    {
      key: 'archive',
      label: t('open_api:archived_data'),
      children: [
        { key: 'archive-insight', label: t('open_api:opensource_insight') },
      ],
    },
  ];
  const findParentKeys = (key: string, menuItems: any[]): string[] => {
    for (const item of menuItems) {
      if (item.key === key) {
        return [item.key];
      }
      if (item.children) {
        const childKeys = findParentKeys(key, item.children);
        if (childKeys.length > 0) {
          return [item.key, ...childKeys];
        }
      }
    }
    return [];
  };
  // 监听 hash 变化并更新选中和打开的菜单项
  useEffect(() => {
    const hash = currentHash.replace('#', ''); // 去掉 hash 前的 #
    setSelectedKeys([hash]);

    // 根据 hash 动态设置需要展开的菜单项
    const parentKeys = findParentKeys(hash, items);
    setOpenKeys([...parentKeys, ...openKeys]);
    // setOpenKeys(parentKeys);
  }, [currentHash]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <>
      <div className="line-clamp-1 mb-4 max-w-[255px] pl-8 text-lg font-semibold">
        {t('common:header.opensource_research_service')}
      </div>
      <Menu
        onClick={onClick}
        style={{ width: 255, border: 0, fontWeight: 500 }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys} // 当前选中的菜单项
        openKeys={openKeys} // 当前展开的菜单项
        onOpenChange={onOpenChange} // 菜单展开/收起时触发
      />
    </>
  );
};

export default SideBarContent;
