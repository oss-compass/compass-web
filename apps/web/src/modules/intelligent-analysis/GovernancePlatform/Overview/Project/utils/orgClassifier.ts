// autocorrect: false

/**
 * 根据组织名称自动识别组织类型
 * @param orgName 组织名称
 * @returns '商业公司' | '高校及研究机构' | '其他'
 */
export const classifyOrganization = (orgName: string): string => {
  if (!orgName) return '-';

  const name = orgName.toLowerCase();

  // 高校及研究机构关键词
  const researchKeywords = [
    'university',
    'college',
    'institute',
    'academy',
    'lab',
    'laboratory',
    'school',
    '大学',
    '学院',
    '研究所',
    '研究院',
    '实验室',
    '科大',
    '工大',
    '师大',
    '理工',
    'polytechnic',
    'edu',
    'mit',
  ];

  // 商业公司关键词
  const companyKeywords = [
    'inc',
    'ltd',
    'corp',
    'corporation',
    'co.',
    'company',
    'tech',
    'technology',
    'technologies',
    'systems',
    'group',
    'solution',
    'solutions',
    'studio',
    'network',
    'networks',
    'cloud',
    'data',
    'ai',
    'robotics',
    'limited',
    'llc',
    '有限公司',
    '科技',
    '技术',
    '网络',
    '集团',
    '股份',
    '工作室',
    '智能',
    '数据',
    '云',
    '系统',
    '阿里',
    '腾讯',
    '百度',
    '字节',
    '华为',
    '小米',
    '京东',
    '美团',
    '网易',
    '微软',
    '谷歌',
    '亚马逊',
    '苹果',
    'intel',
    'nvidia',
    'amd',
    'microsoft',
    'google',
    'amazon',
    'apple',
    'facebook',
    'meta',
    'alibaba',
    'tencent',
    'baidu',
    'bytedance',
    'huawei',
    'xiaomi',
  ];

  // 优先匹配高校及研究机构
  if (researchKeywords.some((keyword) => name.includes(keyword))) {
    return '高校及研究机构';
  }

  // 其次匹配商业公司
  if (companyKeywords.some((keyword) => name.includes(keyword))) {
    return '商业公司';
  }

  // 默认为商业公司（因为开源贡献者中公司居多），或者返回其他
  // 这里策略是：如果都不匹配，默认归类为商业公司，因为很多公司名可能不带上述后缀
  // 但为了准确性，也可以返回'其他'，让用户自己判断。
  // 根据用户需求，主要识别这两类。如果都不匹配，可能是个人组织或其他非营利组织。
  // 考虑到数据源中很多公司名可能很简短（如 'facebook', 'redis' 等已在关键词中），
  // 对于无法识别的，暂时归为 '其他' 或 '商业公司'。
  // 观察数据样例，大部分非高校的都是公司。

  return '商业公司';
};
