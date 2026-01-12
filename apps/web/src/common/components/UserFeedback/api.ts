import axios from 'axios';

// 反馈模块类型定义
export type FeedbackModule =
  | 'analyze'
  | 'developer'
  | 'os-selection'
  | 'os-situation'
  | 'dataHub'
  | 'lab';

// 反馈请求参数接口
export interface FeedbackRequest {
  module: FeedbackModule;
  content: string;
}

// 反馈响应接口
export interface FeedbackResponse {
  success: boolean;
  message?: string;
}

/**
 * 统一的成功提示词
 */
const SUCCESS_MESSAGE =
  '反馈提交成功！感谢您的宝贵建议，我们会认真对待每一条反馈。';

/**
 * 提交用户反馈
 * @param params 反馈参数
 * @returns Promise<FeedbackResponse>
 */
export const submitFeedback = async (
  params: FeedbackRequest
): Promise<FeedbackResponse> => {
  try {
    const response = await axios.post('/api/v2/feedback/save_data', params);

    // 根据实际API响应格式调整，使用模块特定的成功提示
    return {
      success: true,
      message: response.data?.message || SUCCESS_MESSAGE,
    };
  } catch (error) {
    console.error('提交反馈失败:', error);

    // 处理错误响应
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || '反馈提交失败，请稍后重试',
      };
    }

    return {
      success: false,
      message: '网络错误，请检查网络连接',
    };
  }
};

/**
 * 根据路径自动识别模块
 * @param pathname 当前页面路径
 * @returns FeedbackModule
 */
export const getModuleFromPath = (pathname: string): FeedbackModule => {
  if (pathname.includes('/analyze')) return 'analyze';
  if (pathname.includes('/developer')) return 'developer';
  if (pathname.includes('/os-selection')) return 'os-selection';
  if (pathname.includes('/os-situation')) return 'os-situation';
  if (pathname.includes('/dataHub')) return 'dataHub';
  if (pathname.includes('/lab')) return 'lab';

  // 默认返回analyze模块
  return 'analyze';
};
