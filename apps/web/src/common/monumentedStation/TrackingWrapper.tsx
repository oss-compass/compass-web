import React, { ReactElement, cloneElement } from 'react';
import { useModuleAction } from './hooks';
import { ModuleActionConfig } from './types';

interface TrackingWrapperProps {
  children: ReactElement;
  module: string;
  type: string;
  content?: any;
  disabled?: boolean;
  validate?: () => boolean | Promise<boolean>; // 可选的校验函数
  onValidationFailed?: () => void; // 校验失败时的回调
}

/**
 * 埋点包装组件 - 用于包装需要埋点的交互元素
 *
 * @param children - 需要埋点的子元素（必须是单个ReactElement）
 * @param module - 模块名称
 * @param type - 事件类型
 * @param content - 事件内容
 * @param disabled - 是否禁用埋点
 */
const TrackingWrapper: React.FC<TrackingWrapperProps> = ({
  children,
  module,
  type,
  content,
  disabled = false,
  validate,
  onValidationFailed,
}) => {
  const { reportAction } = useModuleAction();

  const handleClick = (originalOnClick?: (event: any) => void) => {
    return async (event: any) => {
      // 先执行原有的点击事件
      if (originalOnClick) {
        originalOnClick(event);
      }

      // 如果没有禁用埋点，则上报事件
      if (!disabled) {
        // 如果有校验函数，先执行校验
        if (validate) {
          try {
            const isValid = await validate();
            if (!isValid) {
              // 校验失败，执行失败回调
              if (onValidationFailed) {
                onValidationFailed();
              }
              return; // 不上报埋点
            }
          } catch (error) {
            console.error('埋点校验失败:', error);
            if (onValidationFailed) {
              onValidationFailed();
            }
            return; // 不上报埋点
          }
        }

        // 校验通过或无需校验，上报埋点
        const config: ModuleActionConfig = {
          module,
          type,
          content,
        };
        reportAction(config);
      }
    };
  };

  // 克隆子元素并添加点击事件处理
  const enhancedChild = cloneElement(children, {
    onClick: handleClick((children.props as any).onClick),
  } as any);

  return enhancedChild;
};

export default TrackingWrapper;
