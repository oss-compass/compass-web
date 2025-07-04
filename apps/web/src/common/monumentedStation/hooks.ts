import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUserInfo } from '@modules/auth/useUserInfo';
import TrackingManager from './TrackingManager';
import { ModuleActionConfig } from './types';

/**
 * 路由变化埋点Hook
 */
export function useRouteTracking() {
  const router = useRouter();
  const { currentUser, loading } = useUserInfo();
  const trackingManager = TrackingManager.getInstance();
  const initializedRef = useRef(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackingManager.onRouteChange(url);
    };

    // 等待用户信息加载完成后再初始化当前路由
    // 这样确保首次 module_visit 事件包含用户ID
    if (!loading && !initializedRef.current) {
      // 如果用户已登录，设置用户ID
      if (currentUser?.id) {
        trackingManager.setUserId(currentUser.id);
      }

      // 初始化当前路由
      trackingManager.onRouteChange(router.asPath);
      initializedRef.current = true;
    }

    // 监听路由变化
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, trackingManager, currentUser?.id, loading]);
}

/**
 * 模块核心功能点击埋点Hook
 */
export function useModuleAction() {
  const trackingManager = TrackingManager.getInstance();

  const reportAction = (config: ModuleActionConfig) => {
    trackingManager.reportModuleAction(
      config.module,
      config.type,
      config.content
    );
  };

  return { reportAction };
}

/**
 * 页面停留时长埋点Hook
 */
export function usePageStayTracking() {
  const startTimeRef = useRef<number>(Date.now());
  const trackingManager = TrackingManager.getInstance();

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      // 组件卸载时可以进行特殊处理
    };
  }, []);

  const getStayDuration = () => {
    return Date.now() - startTimeRef.current;
  };

  return { getStayDuration };
}

/**
 * 用户信息埋点Hook - 监听用户信息变化并更新埋点管理器
 */
export function useUserTracking() {
  const { currentUser, loading } = useUserInfo();
  const trackingManager = TrackingManager.getInstance();

  useEffect(() => {
    // 当用户信息发生变化时，更新埋点管理器中的用户ID
    // 注意：首次设置已在 useRouteTracking 中处理，这里主要处理后续变化
    if (!loading && currentUser?.id) {
      trackingManager.setUserId(currentUser.id);
    } else if (!loading && !currentUser?.id) {
      // 用户登出时清除用户ID
      trackingManager.setUserId(null);
    }
  }, [currentUser?.id, loading, trackingManager]);

  return {
    userId: currentUser?.id,
    isUserLoaded: !loading && !!currentUser?.id,
  };
}
