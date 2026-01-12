import React, { useState, useEffect } from 'react';
import { useUserInfo } from '@modules/auth/useUserInfo';
import FeedbackButton from './FeedbackButton';
import FeedbackDialog from './FeedbackDialog';

interface UserFeedbackProps {
  // 可以通过props控制是否显示反馈功能
  enabled?: boolean;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ enabled = true }) => {
  const { currentUser, loading } = useUserInfo();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 从localStorage读取用户的显示偏好（七天有效期）
  useEffect(() => {
    const savedData = localStorage.getItem('userFeedbackVisible');
    if (savedData !== null) {
      try {
        const parsedData = JSON.parse(savedData);
        // 检查是否是新格式（包含时间戳）
        if (typeof parsedData === 'object' && parsedData.timestamp) {
          const now = Date.now();
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7天的毫秒数

          // 检查是否在七天有效期内
          if (now - parsedData.timestamp < sevenDaysInMs) {
            setIsButtonVisible(parsedData.visible);
          } else {
            // 过期了，清除localStorage并重置为默认值
            localStorage.removeItem('userFeedbackVisible');
            setIsButtonVisible(true);
          }
        } else {
          // 兼容旧格式，直接使用布尔值
          setIsButtonVisible(parsedData);
        }
      } catch (error) {
        // 解析失败，重置为默认值
        localStorage.removeItem('userFeedbackVisible');
        setIsButtonVisible(true);
      }
    }
  }, []);

  // 保存用户的显示偏好到localStorage（七天有效期）
  const handleButtonVisibilityChange = (visible: boolean) => {
    setIsButtonVisible(visible);
    const dataToSave = {
      visible: visible,
      timestamp: Date.now(),
    };
    localStorage.setItem('userFeedbackVisible', JSON.stringify(dataToSave));
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseButton = () => {
    handleButtonVisibilityChange(false);
  };

  // 如果功能被禁用，不渲染任何内容
  if (!enabled) {
    return null;
  }

  // 如果正在加载用户信息，不显示反馈按钮
  if (loading) {
    return null;
  }

  // 如果用户未登录，不显示反馈按钮
  if (!currentUser) {
    return null;
  }

  return (
    <>
      <FeedbackButton
        onClick={handleOpenDialog}
        onClose={handleCloseButton}
        isVisible={isButtonVisible}
      />
      <FeedbackDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default UserFeedback;
