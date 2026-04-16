import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useResizeDetector } from 'react-resize-detector';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Button } from '@oss-compass/ui';
import DashboardDatePicker from './DashboardDatePicker';
import ProjectList from './ProjectList';
import { useRouter } from 'next/router';

interface DetailNavProps {
  dashboard: {
    name: string;
    origin?: string | null;
    updatedAt?: string;
    updated_at?: string;
    type?: 'repo' | 'community';
    dashboard_type?: 'repo' | 'community';
    config?: {
      type?: 'repo' | 'community';
      compareMode: boolean;
      projects: readonly string[];
      competitorProjects?: readonly string[];
    };
  };
  /** editor 或 admin：显示用户管理、预警管理按钮 */
  canManage?: boolean;
  /** admin：显示删除按钮中的操作 */
  isAdmin?: boolean;
  onEdit: () => void;
  onAlertManage: () => void;
  onUserManage: () => void;
  onDelete: () => void;
}

type OptionalItemKey =
  | 'badge'
  | 'updatedAt'
  | 'projects'
  | 'alertManage'
  | 'userManage'
  | 'newDashboard'
  | 'delete';

const OPTIONAL_ITEM_ORDER: OptionalItemKey[] = [
  'badge',
  'updatedAt',
  'projects',
  'alertManage',
  'userManage',
  'newDashboard',
  'delete',
];

const OPTIONAL_ITEM_PRIORITY: OptionalItemKey[] = [
  'badge',
  'alertManage',
  'userManage',
  'newDashboard',
  'updatedAt',
  'delete',
  'projects',
];

const EMPTY_PROJECTS: readonly string[] = [];

const getMinTitleWidth = (containerWidth: number) => {
  if (containerWidth < 360) return 72;
  if (containerWidth < 480) return 96;
  if (containerWidth < 640) return 120;
  if (containerWidth < 768) return 140;
  if (containerWidth < 1024) return 180;
  return 240;
};

const DetailNav: React.FC<DetailNavProps> = ({
  dashboard,
  canManage = false,
  isAdmin = false,
  onEdit,
  onAlertManage,
  onUserManage,
  onDelete,
}) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const navRef = React.useRef<HTMLElement>(null);
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const itemWidthCache = React.useRef<Record<string, number>>({});
  const [visibleOptionalKeys, setVisibleOptionalKeys] =
    React.useState<OptionalItemKey[]>(OPTIONAL_ITEM_ORDER);

  const dashboardType =
    dashboard.config?.type ||
    dashboard.dashboard_type ||
    dashboard.type ||
    'repo';
  const updatedAt = dashboard.updatedAt || dashboard.updated_at || '';
  const projects = React.useMemo(
    () => dashboard.config?.projects || EMPTY_PROJECTS,
    [dashboard.config?.projects]
  );
  const competitorProjects = React.useMemo(
    () => dashboard.config?.competitorProjects || EMPTY_PROJECTS,
    [dashboard.config?.competitorProjects]
  );
  const compareMode = dashboard.config?.compareMode || false;
  const origin = dashboard.origin;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      return dateStr.slice(0, 10);
    } catch {
      return '-';
    }
  };

  const setItemRef = React.useCallback(
    (key: string) => (node: HTMLDivElement | null) => {
      itemRefs.current[key] = node;
      if (node) {
        itemWidthCache.current[key] = Math.max(
          node.offsetWidth,
          node.scrollWidth
        );
      }
    },
    []
  );

  const getItemWidth = React.useCallback((key: string) => {
    const node = itemRefs.current[key];
    const width = node ? Math.max(node.offsetWidth, node.scrollWidth) : 0;

    if (width > 0) {
      itemWidthCache.current[key] = width;
      return width;
    }

    return itemWidthCache.current[key] || 0;
  }, []);

  const recomputeVisibility = React.useCallback(() => {
    const containerWidth = navRef.current?.clientWidth || 0;

    if (!containerWidth) return;

    const essentialWidth = getItemWidth('datePicker') + getItemWidth('edit');

    if (!essentialWidth) return;

    const minTitleWidth = getMinTitleWidth(containerWidth);
    const layoutBuffer = 48;
    const itemGapWidth = 8;
    let usedWidth = minTitleWidth + essentialWidth + layoutBuffer;
    const nextVisible = new Set<OptionalItemKey>();

    OPTIONAL_ITEM_PRIORITY.forEach((key) => {
      const itemWidth = getItemWidth(key);

      if (!itemWidth) return;

      const nextWidth = usedWidth + itemWidth + itemGapWidth;

      if (nextWidth <= containerWidth) {
        usedWidth = nextWidth;
        nextVisible.add(key);
      }
    });

    setVisibleOptionalKeys((prev) => {
      const next = OPTIONAL_ITEM_ORDER.filter((key) => nextVisible.has(key));
      const isSame =
        prev.length === next.length &&
        prev.every((itemKey, index) => itemKey === next[index]);

      return isSame ? prev : next;
    });
  }, [getItemWidth]);

  useResizeDetector({
    targetRef: navRef,
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 100,
    onResize: () => {
      recomputeVisibility();
    },
  });

  const measurementKey = React.useMemo(
    () =>
      [
        i18n.language,
        dashboard.name,
        dashboardType,
        updatedAt,
        origin || '',
        compareMode ? '1' : '0',
        projects.join('|'),
        competitorProjects.join('|'),
      ].join('::'),
    [
      compareMode,
      competitorProjects,
      dashboard.name,
      dashboardType,
      i18n.language,
      origin,
      projects,
      updatedAt,
    ]
  );

  React.useEffect(() => {
    setVisibleOptionalKeys(OPTIONAL_ITEM_ORDER);

    const frameId = window.requestAnimationFrame(() => {
      recomputeVisibility();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [measurementKey, recomputeVisibility]);

  const visibleOptionalKeySet = React.useMemo(
    () => new Set(visibleOptionalKeys),
    [visibleOptionalKeys]
  );

  const optionalItemClassName = React.useCallback(
    (key: OptionalItemKey, className?: string) =>
      classnames('flex-shrink-0 whitespace-nowrap', className, {
        hidden: !visibleOptionalKeySet.has(key),
      }),
    [visibleOptionalKeySet]
  );

  return (
    <StickyNav className=">md:-top-[80px] md:-top-[48px]">
      <Header />
      <nav
        ref={navRef}
        className={classnames(
          'flex h-[56px] items-center gap-4 overflow-hidden border-b border-t bg-white px-6 py-2',
          'md:px-4'
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4 overflow-hidden">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden">
            <h1 className="min-w-0 truncate whitespace-nowrap text-lg font-semibold">
              {dashboard.name}
            </h1>
            <div
              ref={setItemRef('badge')}
              className={optionalItemClassName('badge')}
            >
              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                {dashboardType === 'repo'
                  ? t('os_board:dashboard.type.repo')
                  : t('os_board:dashboard.type.community')}
              </span>
            </div>
            <div
              ref={setItemRef('updatedAt')}
              className={optionalItemClassName(
                'updatedAt',
                'text-xs text-gray-500'
              )}
            >
              <span className="whitespace-nowrap">
                {t('os_board:detail.updated_at')}: {formatDate(updatedAt)}
              </span>
            </div>
          </div>

          <div
            ref={setItemRef('projects')}
            className={optionalItemClassName(
              'projects',
              'min-w-0 overflow-hidden'
            )}
          >
            <ProjectList
              projects={projects}
              competitorProjects={competitorProjects}
              compareMode={compareMode}
              origin={origin}
              compact
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 overflow-hidden">
          <div
            ref={setItemRef('datePicker')}
            className="flex-shrink-0 whitespace-nowrap"
          >
            <DashboardDatePicker />
          </div>

          <div ref={setItemRef('edit')} className="flex-shrink-0">
            {canManage && (
              <Button className="whitespace-nowrap" size="sm" onClick={onEdit}>
                {t('common:btn.edit')}
              </Button>
            )}
          </div>

          <div
            ref={setItemRef('alertManage')}
            className={optionalItemClassName('alertManage')}
          >
            {canManage && (
              <Button
                className="whitespace-nowrap"
                size="sm"
                onClick={onAlertManage}
              >
                {t('os_board:detail.alerts_manage')}
              </Button>
            )}
          </div>
          <div
            ref={setItemRef('userManage')}
            className={optionalItemClassName('userManage')}
          >
            {canManage && (
              <Button
                className="whitespace-nowrap"
                size="sm"
                intent="text"
                onClick={onUserManage}
              >
                {t('lab:user_management')}
              </Button>
            )}
          </div>

          <div
            ref={setItemRef('newDashboard')}
            className={optionalItemClassName('newDashboard')}
          >
            <Button
              className="whitespace-nowrap"
              size="sm"
              intent="text"
              onClick={() => router.push('/os-board/dashboard/create')}
            >
              {t('os_board:home.new_dashboard')}
            </Button>
          </div>

          <div
            ref={setItemRef('delete')}
            className={optionalItemClassName('delete')}
          >
            {isAdmin && (
              <Button
                className="whitespace-nowrap"
                size="sm"
                intent="text"
                onClick={onDelete}
              >
                {t('common:btn.delete')}
              </Button>
            )}
          </div>
        </div>
      </nav>
    </StickyNav>
  );
};

export default DetailNav;
