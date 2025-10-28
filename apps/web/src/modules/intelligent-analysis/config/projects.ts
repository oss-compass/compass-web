export interface ProjectConfig {
  slug: string;
  name: string;
  displayName: string;
  developers: number;
  organizations: number;
  folderName: string;
}

/**
 * 智能分析项目配置
 * 新增项目时只需要在这里添加一条配置即可
 */
export const PROJECTS_CONFIG: ProjectConfig[] = [
  {
    slug: 'react-native',
    name: 'React Native',
    displayName: 'React Native',
    developers: 48371,
    organizations: 16137,
    folderName: 'RN',
  },
  {
    slug: 'rn-tpc',
    name: 'React Native TPC',
    displayName: 'React Native TPC',
    developers: 48808,
    organizations: 15909,
    folderName: 'RN-TPC',
  },
  {
    slug: 'flutter',
    name: 'Flutter',
    displayName: 'Flutter',
    developers: 56924,
    organizations: 14910,
    folderName: 'Flutter',
  },
  {
    slug: 'flutter-tpc',
    name: 'Flutter TPC',
    displayName: 'Flutter TPC',
    developers: 53039,
    organizations: 14158,
    folderName: 'Flutter-TPC',
  },
  // AI/ML 相关项目
  {
    slug: 'ollama',
    name: 'Ollama',
    displayName: 'Ollama',
    developers: 12271,
    organizations: 2589,
    folderName: 'ollama',
  },
  {
    slug: 'vllm',
    name: 'vLLM',
    displayName: 'vLLM',
    developers: 11418,
    organizations: 2030,
    folderName: 'vllm',
  },
  {
    slug: 'pytorch',
    name: 'PyTorch',
    displayName: 'PyTorch',
    developers: 6366,
    organizations: 2012,
    folderName: 'pytorch',
  },
  {
    slug: 'llama-factory',
    name: 'LLaMA-Factory',
    displayName: 'LLaMA-Factory',
    developers: 4087,
    organizations: 628,
    folderName: 'LLaMA-Factory',
  },
  {
    slug: 'onnxruntime',
    name: 'ONNX Runtime',
    displayName: 'ONNX Runtime',
    developers: 2594,
    organizations: 525,
    folderName: 'onnxruntime',
  },
  {
    slug: 'triton',
    name: 'Triton',
    displayName: 'Triton',
    developers: 1015,
    organizations: 259,
    folderName: 'triton',
  },
  {
    slug: 'vllm-ascend',
    name: 'vLLM-Ascend',
    displayName: 'vLLM-Ascend',
    developers: 531,
    organizations: 89,
    folderName: 'vllm-ascend',
  },
  {
    slug: 'jax',
    name: 'JAX',
    displayName: 'JAX',
    developers: 493,
    organizations: 274,
    folderName: 'jax',
  },
  {
    slug: 'xla',
    name: 'XLA',
    displayName: 'XLA',
    developers: 337,
    organizations: 42,
    folderName: 'xla',
  },

  // 跨平台开发框架


  {
    slug: 'ionic',
    name: 'Ionic',
    displayName: 'Ionic',
    developers: 1712,
    organizations: 713,
    folderName: 'Ionic',
  },
  {
    slug: 'kmp-oh',
    name: 'KMP OH',
    displayName: 'KMP OH',
    developers: 1915,
    organizations: 835,
    folderName: 'KMP_OH',
  },

  // 桌面应用框架
  {
    slug: 'electron',
    name: 'Electron',
    displayName: 'Electron',
    developers: 4450,
    organizations: 1636,
    folderName: 'Electron',
  },
  {
    slug: 'avalonia',
    name: 'Avalonia',
    displayName: 'Avalonia',
    developers: 1242,
    organizations: 292,
    folderName: 'Avalonia',
  },
  {
    slug: 'cef',
    name: 'CEF',
    displayName: 'CEF',
    developers: 216,
    organizations: 61,
    folderName: 'CEF',
  },

  // 浏览器相关
  {
    slug: 'chromium',
    name: 'Chromium',
    displayName: 'Chromium',
    developers: 12329,
    organizations: 3345,
    folderName: 'Chromium',
  },

  // 其他项目
  {
    slug: 'servers',
    name: 'Servers',
    displayName: 'Servers',
    developers: 1448,
    organizations: 754,
    folderName: 'servers',
  },
  {
    slug: 'aibrix',
    name: 'Aibrix',
    displayName: 'Aibrix',
    developers: 92,
    organizations: 57,
    folderName: 'aibrix',
  },
  {
    slug: 'a2a',
    name: 'A2A',
    displayName: 'A2A',
    developers: 56,
    organizations: 26,
    folderName: 'A2A',
  },
  {
    slug: 'react-native-raw',
    name: 'React Native raw',
    displayName: 'React Native raw',
    developers: 48371,
    organizations: 16137,
    folderName: 'RN-raw',
  },
];

// 导出便捷的映射对象
export const PROJECT_SLUG_MAP = PROJECTS_CONFIG.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, ProjectConfig>);

export const PROJECT_NAME_MAP = PROJECTS_CONFIG.reduce((acc, project) => {
  acc[project.slug] = project.folderName;
  return acc;
}, {} as Record<string, string>);

export const PROJECT_DISPLAY_NAME_MAP = PROJECTS_CONFIG.reduce((acc, project) => {
  acc[project.slug] = project.displayName;
  return acc;
}, {} as Record<string, string>);

export const VALID_PROJECT_SLUGS = PROJECTS_CONFIG.map(project => project.slug);

/**
 * 获取项目配置
 * @param slug 项目slug
 * @returns 项目配置对象或undefined
 */
export function getProjectConfig(slug: string): ProjectConfig | undefined {
  return PROJECT_SLUG_MAP[slug];
}

/**
 * 检查项目是否有效
 * @param slug 项目slug
 * @returns 是否为有效项目
 */
export function isValidProject(slug: string): boolean {
  return VALID_PROJECT_SLUGS.includes(slug);
}