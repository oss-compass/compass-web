// 国家名称映射工具函数
// 用于将中文国家名称转换为国际化键值

export const countryNameMapping: Record<string, string> = {
  // 主要国家
  美国: 'us',
  中国: 'china',
  '中国(台湾地区除外)': 'china',
  欧盟: 'eu',
  印度: 'india',
  英国: 'uk',
  日本: 'japan',
  德国: 'germany',
  法国: 'france',
  加拿大: 'canada',
  澳大利亚: 'australia',
  韩国: 'south_korea',
  巴西: 'brazil',
  俄罗斯: 'russia',
  荷兰: 'netherlands',
  瑞典: 'sweden',
  瑞士: 'switzerland',
  新加坡: 'singapore',
  以色列: 'israel',
  挪威: 'norway',
  丹麦: 'denmark',
  芬兰: 'finland',
  波兰: 'poland',
  西班牙: 'spain',
  意大利: 'italy',
  比利时: 'belgium',
  奥地利: 'austria',
  爱尔兰: 'ireland',
  新西兰: 'new_zealand',
  捷克: 'czech_republic',
  乌克兰: 'ukraine',

  // 欧盟成员国
  葡萄牙: 'portugal',
  罗马尼亚: 'romania',
  保加利亚: 'bulgaria',
  希腊: 'greece',
  匈牙利: 'hungary',
  立陶宛: 'lithuania',
  爱沙尼亚: 'estonia',
  克罗地亚: 'croatia',
  拉脱维亚: 'latvia',
  斯洛伐克: 'slovakia',
  塞浦路斯: 'cyprus',
  卢森堡: 'luxembourg',
  马耳他: 'malta',
  斯洛文尼亚: 'slovenia',

  // 亚洲国家
  印度尼西亚: 'indonesia',
  土耳其: 'turkey',
  越南: 'vietnam',
  巴基斯坦: 'pakistan',
  孟加拉国: 'bangladesh',
  台湾地区: 'taiwan',
  伊朗: 'iran',
  菲律宾: 'philippines',
  泰国: 'thailand',
  斯里兰卡: 'sri_lanka',
  阿拉伯联合酋长国: 'uae',

  // 美洲国家
  哥伦比亚: 'colombia',
  阿根廷: 'argentina',
  墨西哥: 'mexico',

  // 非洲国家
  尼日利亚: 'nigeria',
  肯尼亚: 'kenya',
  埃塞俄比亚: 'ethiopia',
  加纳: 'ghana',
  南非: 'south_africa',

  // 欧洲其他国家
  白俄罗斯: 'belarus',
  秘鲁: 'peru',

  // 中国城市
  北京市: 'beijing',
  上海市: 'shanghai',
  深圳市: 'shenzhen',
  杭州市: 'hangzhou',
  广州市: 'guangzhou',
  成都市: 'chengdu',
  南京市: 'nanjing',
  武汉市: 'wuhan',
  西安市: 'xian',
  重庆市: 'chongqing',
  苏州市: 'suzhou',
  长沙市: 'changsha',
  合肥市: 'hefei',
  天津市: 'tianjin',
  厦门市: 'xiamen',
  大连市: 'dalian',
  福州市: 'fuzhou',
  济南市: 'jinan',
  哈尔滨市: 'harbin',
  沈阳市: 'shenyang',
  珠海市: 'zhuhai',
  昆明市: 'kunming',
  宁波市: 'ningbo',
  南昌市: 'nanchang',
  佛山市: 'foshan',
  东莞市: 'dongguan',
  太原市: 'taiyuan',
  南宁市: 'nanning',
  石家庄市: 'shijiazhuang',
  贵阳市: 'guiyang',
  温州市: 'wenzhou',
  中山市: 'zhongshan',
  兰州市: 'lanzhou',
  洛阳市: 'luoyang',
  桂林市: 'guilin',
  芜湖市: 'wuhu',

  // 技术分类
  前端: 'frontend',
  开发框架: 'development_framework',
  操作系统: 'operating_system',
  数据库: 'database',
  云原生: 'cloud_native',
  区块链: 'blockchain',
  人工智能: 'artificial_intelligence',
  大数据: 'big_data',
  网络通信: 'network_communication',
  移动应用: 'mobile_application',
  编程语言: 'programming_language',
  'IoT 物联网': 'iot',
  芯片: 'chip',
  机器人: 'robotics',
  富媒体: 'rich_media',
  工业软件: 'industrial_software',
  智能汽车: 'smart_vehicle',

  // 特殊处理的名称
  '中国(台湾地区除外)-Gitee': 'china',
  '中国(台湾地区除外)-Github': 'china',
};

/**
 * 将中文国家名称转换为国际化键值
 * @param chineseName 中文国家名称
 * @returns 国际化键值，如果找不到映射则返回原名称
 */
export const getCountryKey = (chineseName: string): string => {
  return countryNameMapping[chineseName] || chineseName;
};

/**
 * 使用国际化函数获取国家名称的翻译
 * @param chineseName 中文国家名称
 * @param t 国际化翻译函数
 * @returns 翻译后的国家名称
 */
export const getTranslatedCountryName = (
  chineseName: string,
  t: (key: string) => string
): string => {
  const countryKey = getCountryKey(chineseName);
  // 如果找到了映射键值，使用国际化翻译
  if (countryNameMapping[chineseName]) {
    return t(`countries.${countryKey}`);
  }
  // 如果没有找到映射，返回原名称
  return chineseName;
};

/**
 * 批量转换图表数据中的国家名称
 * @param data 包含name属性的数据数组
 * @param t 国际化翻译函数
 * @returns 转换后的数据数组
 */
export const translateChartCountryNames = <T extends { name: string }>(
  data: T[],
  t: (key: string) => string
): T[] => {
  return data.map((item) => ({
    ...item,
    name: getTranslatedCountryName(item.name, t),
  }));
};

/**
 * 转换ECharts系列数据中的国家名称
 * @param series ECharts系列配置数组
 * @param t 国际化翻译函数
 * @returns 转换后的系列配置数组
 */
export const translateEChartsSeriesNames = (
  series: any[],
  t: (key: string) => string
): any[] => {
  return series.map((seriesItem) => ({
    ...seriesItem,
    name: getTranslatedCountryName(seriesItem.name, t),
  }));
};
