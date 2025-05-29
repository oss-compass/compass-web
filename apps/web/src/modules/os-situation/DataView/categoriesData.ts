import { id } from 'date-fns/locale';

const allOptions = {
  Push年度: [],
  开发者全球: [
    {
      value:
        '/test/contributor_model/line_AS_country_activity_contributor_count.json',
      text: '开发者全球年度活跃_欧盟合并',
    },
    {
      value:
        '/test/contributor_model/line_AS_country_not_merge_eu_activity_contributor_count.json',
      text: '开发者全球年度活跃_欧盟拆开',
    },
    {
      value:
        '/test/contributor_model/line_AS_country_add_contributor_count.json',
      text: '开发者全球年度新增_欧盟合并',
    },
    {
      value:
        '/test/contributor_model/line_AS_country_not_merge_eu_add_contributor_count.json',
      text: '开发者全球年度新增_欧盟拆开',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_country_activity_contributor_count.json',
      text: '开发者全球季度活跃_欧盟合并',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_contributor_count.json',
      text: '开发者全球季度活跃_欧盟拆开',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_country_add_contributor_count.json',
      text: '开发者全球季度新增_欧盟合并',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_country_not_merge_eu_add_contributor_count.json',
      text: '开发者全球季度新增_欧盟拆开',
    },
  ],
  开发者中国: [
    {
      value:
        '/test/contributor_model/merge_line_AS_china_city_activity_contributor_count.json',
      text: '开发者中国年度活跃',
    },
    {
      value:
        '/test/contributor_model/merge_line_AS_china_city_add_contributor_count.json',
      text: '开发者中国年度新增',
    },
    {
      value:
        '/test/contributor_model/line_AS_china_city_activity_contributor_count.json',
      text: '开发者中国 (Github) 年度活跃',
    },
    {
      value:
        '/test/contributor_model/line_AS_china_city_add_contributor_count.json',
      text: '开发者中国 (Github) 年度新增',
    },
    {
      value:
        '/test/contributor_model/gitee_line_AS_china_city_activity_contributor_count.json',
      text: '开发者中国 (Gitee) 年度活跃',
    },
    {
      value:
        '/test/contributor_model/gitee_line_AS_china_city_add_contributor_count.json',
      text: '开发者中国 (Gitee) 年度新增',
    },

    {
      value:
        '/test/contributor_model/merge_line_QS-JAN_china_city_activity_contributor_count.json',
      text: '开发者中国季度活跃',
    },
    {
      value:
        '/test/contributor_model/merge_line_QS-JAN_china_city_add_contributor_count.json',
      text: '开发者中国季度新增',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_china_city_activity_contributor_count.json',
      text: '开发者中国 (Github) 季度活跃',
    },
    {
      value:
        '/test/contributor_model/line_QS-JAN_china_city_add_contributor_count.json',
      text: '开发者中国 (Github) 季度新增',
    },
    {
      value:
        '/test/contributor_model/gitee_line_QS-JAN_china_city_activity_contributor_count.json',
      text: '开发者中国 (Gitee) 季度活跃',
    },
    {
      value:
        '/test/contributor_model/gitee_line_QS-JAN_china_city_add_contributor_count.json',
      text: '开发者中国 (Gitee) 季度新增',
    },
  ],
  项目全球: [
    {
      value: '/test/repo_model/line_AS_country_activity_repo_count.json',
      text: '项目全球年度活跃_欧盟合并',
    },
    {
      value:
        '/test/repo_model/line_AS_country_not_merge_eu_activity_repo_count.json',
      text: '项目全球年度活跃_欧盟拆开',
    },
    {
      value: '/test/repo_model/line_AS_country_add_repo_count.json',
      text: '项目全球年度新增_欧盟合并',
    },
    {
      value:
        '/test/repo_model/line_AS_country_not_merge_eu_add_repo_count.json',
      text: '项目全球年度新增_欧盟拆开',
    },
    {
      value: '/test/repo_model/line_QS-JAN_country_activity_repo_count.json',
      text: '项目全球季度活跃_欧盟合并',
    },
    {
      value:
        '/test/repo_model/line_QS-JAN_country_not_merge_eu_activity_repo_count.json',
      text: '项目全球季度活跃_欧盟拆开',
    },
    {
      value: '/test/repo_model/line_QS-JAN_country_add_repo_count.json',
      text: '项目全球季度新增_欧盟合并',
    },
    {
      value:
        '/test/repo_model/line_QS-JAN_country_not_merge_eu_add_repo_count.json',
      text: '项目全球季度新增_欧盟拆开',
    },
  ],
  项目中国: [
    {
      value:
        '/test/repo_model/merge_line_AS_china_city_activity_repo_count.json',
      text: '项目中国年度活跃',
    },
    {
      value: '/test/repo_model/merge_line_AS_china_city_add_repo_count.json',
      text: '项目中国年度新增',
    },
    {
      value:
        '/test/repo_model/merge_line_QS-JAN_china_city_activity_repo_count.json',
      text: '项目中国季度活跃',
    },
    {
      value:
        '/test/repo_model/merge_line_QS-JAN_china_city_add_repo_count.json',
      text: '项目中国季度新增',
    },
    {
      value: '/test/repo_model/line_AS_china_city_activity_repo_count.json',
      text: '项目中国 (Github) 年度活跃',
    },
    {
      value: '/test/repo_model/line_AS_china_city_add_repo_count.json',
      text: '项目中国 (Github) 年度新增',
    },
    {
      value: '/test/repo_model/line_QS-JAN_china_city_activity_repo_count.json',
      text: '项目中国 (Github) 季度活跃',
    },
    {
      value: '/test/repo_model/line_QS-JAN_china_city_add_repo_count.json',
      text: '项目中国 (Github) 季度新增',
    },
    {
      value:
        '/test/repo_model/gitee_line_AS_china_city_activity_repo_count.json',
      text: '项目中国 (Gitee) 年度活跃',
    },
    {
      value: '/test/repo_model/gitee_line_AS_china_city_add_repo_count.json',
      text: '项目中国 (Gitee) 年度新增',
    },
    {
      value:
        '/test/repo_model/gitee_line_QS-JAN_china_city_activity_repo_count.json',
      text: '项目中国 (Gitee) 季度活跃',
    },
    {
      value:
        '/test/repo_model/gitee_line_QS-JAN_china_city_add_repo_count.json',
      text: '项目中国 (Gitee) 季度新增',
    },
  ],
  // License年度: [
  //   {
  //     value: '/test/repo_model/line_AS_license.json',
  //     text: 'License 全球年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_美利坚合众国_license.json',
  //     text: 'License 美国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_欧盟_license.json',
  //     text: 'License 欧盟年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_中国_license.json',
  //     text: 'License 中国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_印度_license.json',
  //     text: 'License 印度年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_英国_license.json',
  //     text: 'License 英国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_日本_license.json',
  //     text: 'License 日本年度',
  //   },
  // ],
  License: [
    {
      value: '/test/repo_model/line_QS-JAN_license.json',
      text: 'License 全球季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_美利坚合众国_license.json',
      text: 'License 美国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_欧盟_license.json',
      text: 'License 欧盟季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_中国_license.json',
      text: 'License 中国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_印度_license.json',
      text: 'License 印度季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_英国_license.json',
      text: 'License 英国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_日本_license.json',
      text: 'License 日本季度',
    },
  ],
  // 编程语言年度: [
  //   {
  //     value: '/test/repo_model/line_AS_main_language_list.json',
  //     text: '编程语言全球年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_美利坚合众国_main_language_list.json',
  //     text: '编程语言美国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_欧盟_main_language_list.json',
  //     text: '编程语言欧盟年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_中国_main_language_list.json',
  //     text: '编程语言中国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_印度_main_language_list.json',
  //     text: '编程语言印度年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_英国_main_language_list.json',
  //     text: '编程语言英国年度',
  //   },
  //   {
  //     value: '/test/repo_model/line_AS_日本_main_language_list.json',
  //     text: '编程语言日本年度',
  //   },
  // ],
  编程语言: [
    {
      value: '/test/repo_model/line_QS-JAN_main_language_list.json',
      text: '编程语言全球季度',
    },
    {
      value:
        '/test/repo_model/line_QS-JAN_美利坚合众国_main_language_list.json',
      text: '编程语言美国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_欧盟_main_language_list.json',
      text: '编程语言欧盟季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_中国_main_language_list.json',
      text: '编程语言中国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_印度_main_language_list.json',
      text: '编程语言印度季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_英国_main_language_list.json',
      text: '编程语言英国季度',
    },
    {
      value: '/test/repo_model/line_QS-JAN_日本_main_language_list.json',
      text: '编程语言日本季度',
    },
  ],
  技术领域Push: [
    {
      value:
        '/test/repo_model/line_AS_technology_global_activity_push_contribution.json',
      text: '全球技术领域 Push 年度',
    },
    {
      value:
        '/test/repo_model/line_AS_technology_country_美利坚合众国_activity_push_contribution.json',
      text: '美国技术领域 Push 年度',
    },
    {
      value:
        '/test/repo_model/line_AS_technology_country_欧盟_activity_push_contribution.json',
      text: '欧盟技术领域 Push 年度',
    },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_country_印度_activity_push_contribution.json',
    //     text: '印度技术领域 Push 年度',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_country_俄罗斯_activity_push_contribution.json',
    //     text: '俄罗斯技术领域 Push 年度',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_country_英国_activity_push_contribution.json',
    //     text: '英国技术领域 Push 年度',
    //   },
    {
      value:
        '/test/repo_model/line_AS_technology_country_中国_activity_push_contribution.json',
      text: '中国技术领域 Push 年度',
    },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_操作系统_activity_push_contribution.json',
    //     text: '中国技术领域 操作系统 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_数据库_activity_push_contribution.json',
    //     text: '中国技术领域 数据库 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_大数据_activity_push_contribution.json',
    //     text: '中国技术领域 大数据 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_人工智能_activity_push_contribution.json',
    //     text: '中国技术领域 人工智能 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_云原生_activity_push_contribution.json',
    //     text: '中国技术领域 云原生 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_编程语言_activity_push_contribution.json',
    //     text: '中国技术领域 编程语言 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_移动应用_activity_push_contribution.json',
    //     text: '中国技术领域 移动应用 年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_technology_china_city_前端_activity_push_contribution.json',
    //     text: '中国技术领域 前端 年度 Push',
    //   },
    {
      value: '/test/repo_model/line_AS_北京市_activity_push_contribution.json',
      text: '中国技术领域北京市年度 Push',
    },
    {
      value: '/test/repo_model/line_AS_上海市_activity_push_contribution.json',
      text: '中国技术领域上海市年度 Push',
    },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_广州市_activity_push_contribution.json',
    //     text: '中国技术领域广州市年度 Push',
    //   },
    //   {
    //     value:
    //       '/test/repo_model/line_AS_深圳市_activity_push_contribution.json',
    //     text: '中国技术领域深圳市年度 Push',
    //   },
    {
      value: '/test/repo_model/line_AS_杭州市_activity_push_contribution.json',
      text: '中国技术领域杭州市年度 Push',
    },
  ],
  // 技术领域年度项目活跃: [
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_global_activity_repo_count.json',
  //     text: '全球技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_美利坚合众国_activity_repo_count.json',
  //     text: '美国技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_欧盟_activity_repo_count.json',
  //     text: '欧盟技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_印度_activity_repo_count.json',
  //     text: '印度技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_俄罗斯_activity_repo_count.json',
  //     text: '俄罗斯技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_英国_activity_repo_count.json',
  //     text: '英国技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_中国_activity_repo_count.json',
  //     text: '中国技术领域 活跃项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_操作系统_activity_repo_count.json',
  //     text: '中国技术领域 操作系统 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_数据库_activity_repo_count.json',
  //     text: '中国技术领域 数据库 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_大数据_activity_repo_count.json',
  //     text: '中国技术领域 大数据 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_人工智能_activity_repo_count.json',
  //     text: '中国技术领域 人工智能 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_云原生_activity_repo_count.json',
  //     text: '中国技术领域 云原生 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_编程语言_activity_repo_count.json',
  //     text: '中国技术领域 编程语言 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_移动应用_activity_repo_count.json',
  //     text: '中国技术领域 移动应用 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_前端_activity_repo_count.json',
  //     text: '中国技术领域 前端 年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_北京市_activity_repo_count.json',
  //     text: '中国技术领域北京市年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_上海市_activity_repo_count.json',
  //     text: '中国技术领域上海市年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_广州市_activity_repo_count.json',
  //     text: '中国技术领域广州市年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_深圳市_activity_repo_count.json',
  //     text: '中国技术领域深圳市年度 活跃项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_杭州市_activity_repo_count.json',
  //     text: '中国技术领域杭州市年度 活跃项目',
  //   },
  // ],
  // 技术领域年度项目新增: [
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_global_add_repo_count.json',
  //     text: '全球技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_美利坚合众国_add_repo_count.json',
  //     text: '美国技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_欧盟_add_repo_count.json',
  //     text: '欧盟技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_印度_add_repo_count.json',
  //     text: '印度技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_俄罗斯_add_repo_count.json',
  //     text: '俄罗斯技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_英国_add_repo_count.json',
  //     text: '英国技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_country_中国_add_repo_count.json',
  //     text: '中国技术领域 新增项目 年度',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_操作系统_add_repo_count.json',
  //     text: '中国技术领域 操作系统 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_数据库_add_repo_count.json',
  //     text: '中国技术领域 数据库 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_大数据_add_repo_count.json',
  //     text: '中国技术领域 大数据 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_人工智能_add_repo_count.json',
  //     text: '中国技术领域 人工智能 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_云原生_add_repo_count.json',
  //     text: '中国技术领域 云原生 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_编程语言_add_repo_count.json',
  //     text: '中国技术领域 编程语言 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_移动应用_add_repo_count.json',
  //     text: '中国技术领域 移动应用 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_technology_china_city_前端_add_repo_count.json',
  //     text: '中国技术领域 前端 年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_北京市_add_repo_count.json',
  //     text: '中国技术领域北京市年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_上海市_add_repo_count.json',
  //     text: '中国技术领域上海市年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_广州市_add_repo_count.json',
  //     text: '中国技术领域广州市年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_深圳市_add_repo_count.json',
  //     text: '中国技术领域深圳市年度 新增项目',
  //   },
  //   {
  //     value:
  //       '/test/repo_model/line_AS_杭州市_add_repo_count.json',
  //     text: '中国技术领域杭州市年度 新增项目',
  //   },
  // ],

  技术领域开发者活跃: [
    {
      value:
        '/test/contributor_model/line_AS_technology_global_activity_contributor_count.json',
      text: '全球技术领域 活跃开发者 年度',
    },
    {
      value:
        '/test/contributor_model/line_AS_technology_country_美利坚合众国_activity_contributor_count.json',
      text: '美国技术领域 活跃开发者 年度',
    },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_country_欧盟_activity_contributor_count.json',
    //   text: '欧盟技术领域 活跃开发者 年度',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_country_印度_activity_contributor_count.json',
    //   text: '印度技术领域 活跃开发者 年度',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_country_俄罗斯_activity_contributor_count.json',
    //   text: '俄罗斯技术领域 活跃开发者 年度',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_country_英国_activity_contributor_count.json',
    //   text: '英国技术领域 活跃开发者 年度',
    // },
    {
      value:
        '/test/contributor_model/line_AS_technology_country_中国_activity_contributor_count.json',
      text: '中国技术领域 活跃开发者 年度',
    },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_操作系统_activity_contributor_count.json',
    //   text: '中国技术领域 操作系统 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_数据库_activity_contributor_count.json',
    //   text: '中国技术领域 数据库 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_大数据_activity_contributor_count.json',
    //   text: '中国技术领域 大数据 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_人工智能_activity_contributor_count.json',
    //   text: '中国技术领域 人工智能 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_云原生_activity_contributor_count.json',
    //   text: '中国技术领域 云原生 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_编程语言_activity_contributor_count.json',
    //   text: '中国技术领域 编程语言 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_移动应用_activity_contributor_count.json',
    //   text: '中国技术领域 移动应用 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_technology_china_city_前端_activity_contributor_count.json',
    //   text: '中国技术领域 前端 年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_北京市_activity_contributor_count.json',
    //   text: '中国技术领域北京市年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_上海市_activity_contributor_count.json',
    //   text: '中国技术领域上海市年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_广州市_activity_contributor_count.json',
    //   text: '中国技术领域广州市年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_深圳市_activity_contributor_count.json',
    //   text: '中国技术领域深圳市年度 活跃开发者',
    // },
    // {
    //   value:
    //     '/test/contributor_model/line_AS_杭州市_activity_contributor_count.json',
    //   text: '中国技术领域杭州市年度 活跃开发者',
    // },
  ],
  技术领域开发者新增: [
    {
      value:
        '/test/contributor_model/line_AS_technology_global_add_contributor_count.json',
      text: '全球技术领域 新增开发者 年度',
    },
    {
      value:
        '/test/contributor_model/line_AS_technology_country_美利坚合众国_add_contributor_count.json',
      text: '美国技术领域 新增开发者 年度',
    },

    {
      value:
        '/test/contributor_model/line_AS_technology_country_中国_add_contributor_count.json',
      text: '中国技术领域 新增开发者 年度',
    },
  ],
};
export const categoriesData = {
  push: [
    {
      name: '全球代码贡献量',
      id: 'global_push',
      value: [
        {
          value:
            '/test/contributor_model/line_AS_country_activity_push_contribution.json',
          text: '全球代码贡献量（欧盟合并）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_country_not_merge_eu_activity_push_contribution.json',
          text: '全球代码贡献量（欧盟拆开）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_eu_country_activity_push_contribution.json',
          text: '欧盟代码贡献量年度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_activity_push_contribution.json',
          text: '全球代码贡献量（欧盟合并）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_push_contribution.json',
          text: '全球代码贡献量（欧盟拆开）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_eu_country_activity_push_contribution.json',
          text: '欧盟代码贡献量季度',
        },
      ],
    },
    {
      name: '中国代码贡献量',
      id: 'china_push',
      value: [
        {
          value:
            '/test/contributor_model/merge_line_AS_china_city_activity_push_contribution.json',
          text: '中国代码贡献量年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_china_city_activity_push_contribution.json',
          text: '中国代码贡献量（GitHub）年度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_AS_china_city_activity_push_contribution.json',
          text: '中国代码贡献量（Gitee）年度',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_activity_push_contribution.json',
          text: '中国代码贡献量季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_china_city_activity_push_contribution.json',
          text: '中国代码贡献量（GitHub）季度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_QS-JAN_china_city_activity_push_contribution.json',
          text: '中国代码贡献量（Gitee）季度',
        },
      ],
    },
  ],
  repositories: [
    {
      name: '全球活跃、新增开源项目数量',
      id: 'global_repositories',
      value: [
        {
          value: '/test/repo_model/line_AS_country_activity_repo_count.json',
          text: '全球活跃项目数（欧盟合并）年度',
        },
        {
          value:
            '/test/repo_model/line_AS_country_not_merge_eu_activity_repo_count.json',
          text: '全球活跃项目数（欧盟拆开）年度',
        },
        {
          value: '/test/repo_model/line_AS_country_add_repo_count.json',
          text: '全球新增项目数（欧盟合并）年度',
        },
        {
          value:
            '/test/repo_model/line_AS_country_not_merge_eu_add_repo_count.json',
          text: '全球新增项目数（欧盟拆开）年度',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_country_activity_repo_count.json',
          text: '全球活跃项目数（欧盟合并）季度',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_country_not_merge_eu_activity_repo_count.json',
          text: '全球活跃项目数（欧盟拆开）季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_country_add_repo_count.json',
          text: '全球新增项目数（欧盟合并）季度',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_country_not_merge_eu_add_repo_count.json',
          text: '全球新增项目数（欧盟拆开）季度',
        },
      ],
    },
    {
      name: '中国活跃、新增开源项目数量',
      id: 'china_repositories',
      value: [
        {
          value:
            '/test/repo_model/merge_line_AS_china_city_activity_repo_count.json',
          text: '中国活跃项目数年度',
        },
        {
          value:
            '/test/repo_model/merge_line_AS_china_city_add_repo_count.json',
          text: '中国新增项目数年度',
        },
        {
          value:
            '/test/repo_model/merge_line_QS-JAN_china_city_activity_repo_count.json',
          text: '中国活跃项目数季度',
        },
        {
          value:
            '/test/repo_model/merge_line_QS-JAN_china_city_add_repo_count.json',
          text: '中国新增项目数季度',
        },
        {
          value: '/test/repo_model/line_AS_china_city_activity_repo_count.json',
          text: '中国活跃项目数（GitHub）年度',
        },
        {
          value: '/test/repo_model/line_AS_china_city_add_repo_count.json',
          text: '中国新增项目数（GitHub）年度',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_china_city_activity_repo_count.json',
          text: '中国活跃项目数（GitHub）季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_china_city_add_repo_count.json',
          text: '中国新增项目数（GitHub）季度',
        },
        {
          value:
            '/test/repo_model/gitee_line_AS_china_city_activity_repo_count.json',
          text: '中国活跃项目数（Gitee）年度',
        },
        {
          value:
            '/test/repo_model/gitee_line_AS_china_city_add_repo_count.json',
          text: '中国新增项目数（Gitee）年度',
        },
        {
          value:
            '/test/repo_model/gitee_line_QS-JAN_china_city_activity_repo_count.json',
          text: '中国活跃项目数（Gitee）季度',
        },
        {
          value:
            '/test/repo_model/gitee_line_QS-JAN_china_city_add_repo_count.json',
          text: '中国新增项目数（Gitee）季度',
        },
      ],
    },
  ],
  topics: [
    {
      name: '技术领域代码贡献量',
      id: 'technology_push',
      value: [
        {
          value:
            '/test/repo_model/line_AS_technology_global_activity_push_contribution.json',
          text: '全球技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_美利坚合众国_activity_push_contribution.json',
          text: '美国技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_欧盟_activity_push_contribution.json',
          text: '欧盟技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_中国_activity_push_contribution.json',
          text: '中国技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_北京市_activity_push_contribution.json',
          text: '北京市技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_上海市_activity_push_contribution.json',
          text: '上海市技术领域代码贡献量年度',
        },
        {
          value:
            '/test/repo_model/line_AS_杭州市_activity_push_contribution.json',
          text: '杭州市技术领域代码贡献量年度',
        },
      ],
    },
    {
      name: '技术领域活跃开发者数量',
      id: 'technology_contributor',
      value: [
        {
          value:
            '/test/contributor_model/line_AS_technology_global_activity_contributor_count.json',
          text: '全球技术领域活跃开发者数年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_美利坚合众国_activity_contributor_count.json',
          text: '美国技术领域活跃开发者数年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_中国_activity_contributor_count.json',
          text: '中国技术领域活跃开发者数年度',
        },
      ],
    },
    {
      name: '技术领域新增开发者数量',
      id: 'technology_add_contributor',
      value: [
        {
          value:
            '/test/contributor_model/line_AS_technology_global_add_contributor_count.json',
          text: '全球技术领域新增开发者数年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_美利坚合众国_add_contributor_count.json',
          text: '美国技术领域新增开发者数年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_中国_add_contributor_count.json',
          text: '中国技术领域新增开发者数年度',
        },
      ],
    },
  ],
  contributor: [
    {
      name: '全球开发者数量',
      id: 'global_contributor',
      value: [
        {
          value:
            '/test/contributor_model/line_AS_country_activity_contributor_count.json',
          text: '全球活跃开发者数（欧盟合并）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_country_not_merge_eu_activity_contributor_count.json',
          text: '全球活跃开发者数（欧盟拆开）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_country_add_contributor_count.json',
          text: '全球新增开发者数（欧盟合并）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_country_not_merge_eu_add_contributor_count.json',
          text: '全球新增开发者数（欧盟拆开）年度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_activity_contributor_count.json',
          text: '全球活跃开发者数（欧盟合并）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_contributor_count.json',
          text: '全球活跃开发者数（欧盟拆开）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_add_contributor_count.json',
          text: '全球新增开发者数（欧盟合并）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_add_contributor_count.json',
          text: '全球新增开发者数（欧盟拆开）季度',
        },
      ],
    },
    {
      name: '中国开发者数量',
      id: 'china_contributor',
      value: [
        {
          value:
            '/test/contributor_model/merge_line_AS_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数年度',
        },
        {
          value:
            '/test/contributor_model/merge_line_AS_china_city_add_contributor_count.json',
          text: '中国新增开发者数年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数（GitHub）年度',
        },
        {
          value:
            '/test/contributor_model/line_AS_china_city_add_contributor_count.json',
          text: '中国新增开发者数（GitHub）年度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_AS_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数（Gitee）年度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_AS_china_city_add_contributor_count.json',
          text: '中国新增开发者数（Gitee）年度',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数季度',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_add_contributor_count.json',
          text: '中国新增开发者数季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数（GitHub）季度',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_china_city_add_contributor_count.json',
          text: '中国新增开发者数（GitHub）季度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_QS-JAN_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数（Gitee）季度',
        },
        {
          value:
            '/test/contributor_model/gitee_line_QS-JAN_china_city_add_contributor_count.json',
          text: '中国新增开发者数（Gitee）季度',
        },
      ],
    },
  ],
  language: [
    {
      name: '全球编程语言分布',
      id: 'global_language',
      value: [
        {
          value: '/test/repo_model/line_QS-JAN_main_language_list.json',
          text: '全球编程语言分布季度',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_美利坚合众国_main_language_list.json',
          text: '美国编程语言分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_欧盟_main_language_list.json',
          text: '欧盟编程语言分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_中国_main_language_list.json',
          text: '中国编程语言分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_印度_main_language_list.json',
          text: '印度编程语言分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_英国_main_language_list.json',
          text: '英国编程语言分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_日本_main_language_list.json',
          text: '日本编程语言分布季度',
        },
      ],
    },
  ],
  license: [
    {
      name: 'License的应用与发展态势',
      id: 'global_license',
      value: [
        {
          value: '/test/repo_model/line_QS-JAN_license.json',
          text: '全球开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_美利坚合众国_license.json',
          text: '美国开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_欧盟_license.json',
          text: '欧盟开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_中国_license.json',
          text: '中国开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_印度_license.json',
          text: '印度开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_英国_license.json',
          text: '英国开源许可证分布季度',
        },
        {
          value: '/test/repo_model/line_QS-JAN_日本_license.json',
          text: '日本开源许可证分布季度',
        },
      ],
    },
  ],
};
