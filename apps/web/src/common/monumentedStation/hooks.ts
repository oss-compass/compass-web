import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import TrackingManager from './TrackingManager';
import { ModuleActionConfig } from './types';

/**
 * 路由变化埋点Hook
 */
export function useRouteTracking() {
  const router = useRouter();
  const trackingManager = TrackingManager.getInstance();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackingManager.onRouteChange(url);
    };

    // 初始化当前路由
    trackingManager.onRouteChange(router.asPath);

    // 监听路由变化
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, trackingManager]);
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
