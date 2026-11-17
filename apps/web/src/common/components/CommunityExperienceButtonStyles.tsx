import { useRouter } from 'next/router';

/** 按路由挂载，确保 body 下的 Modal / Popconfirm 也使用同一按钮圆角。 */
const CommunityExperienceButtonStyles = () => {
  const { pathname } = useRouter();
  const isCommunityExperience =
    /^\/intelligent-analysis\/(?:\[org\]\/)?(?:experience|community-experience)(?:\/|$)/.test(
      pathname
    ) || pathname === '/intelligent-analysis/user-journey';

  if (!isCommunityExperience) return null;

  return (
    <style jsx global>{`
      :root body :is(.ant-btn, [data-community-action]) {
        /* 仅统一操作按钮；图表分段、可点击卡片等保留各自的几何形状。 */
        border-radius: 8px !important;
      }

      :root
        body
        td.community-table-actions
        :is(.ant-btn, button, [data-community-action]) {
        border-color: transparent !important;
        box-shadow: none !important;
      }
    `}</style>
  );
};

export default CommunityExperienceButtonStyles;
