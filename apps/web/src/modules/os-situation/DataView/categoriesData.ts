export const importExportChartTitles = [
  '全球开源进出口贡献量',
  '进口贡献量（年度）',
  '进口贡献量（季度）',
  '出口贡献量（年度）',
  '出口贡献量（季度）',
  '进出口贡献量总和（年度）',
  '进出口贡献量总和（季度）',
  '进出口贡献量占总贡献量比例（年度）',
  '进出口贡献量占总贡献量比例（季度）',
  // 'Top30进出口push量',
  // '全球总push量',
  // 'Top30进出口/全球总push量比例图',
];
export const categoriesData = {
  push: [
    {
      name: '全球代码贡献量（Push次数）',
      id: 'global_push',
      value: [
        {
          value:
            '/test/contributor_model/line_AS_country_not_merge_eu_activity_push_contribution.json',
          text: '全球代码贡献量',
        },
        {
          value:
            '/test/contributor_model/line_AS_eu_country_activity_push_contribution.json',
          text: '欧盟代码贡献量',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_push_contribution.json',
          text: '全球代码贡献量',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_eu_country_activity_push_contribution.json',
          text: '欧盟代码贡献量',
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
          text: '中国代码贡献量（年度）',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_activity_push_contribution.json',
          text: '中国代码贡献量（季度）',
        },
      ],
    },
  ],
  import_export: [
    {
      name: '开源进出口贡献量',
      id: 'global_push',
      value: importExportChartTitles.map((item) => {
        return {
          value: item,
          text: item,
        };
      }),
    },
  ],
  repositories: [
    {
      name: '全球活跃、新增开源项目数量',
      id: 'global_repositories',
      value: [
        {
          value: '/test/repo_model/line_AS_country_activity_repo_count.json',
          text: '全球活跃项目数（年度）',
        },
        {
          value: '/test/repo_model/line_AS_country_add_repo_count.json',
          text: '全球新增项目数（年度）',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_country_activity_repo_count.json',
          text: '全球活跃项目数（季度）',
        },
        {
          value: '/test/repo_model/line_QS-JAN_country_add_repo_count.json',
          text: '全球新增项目数（季度）',
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
          text: '中国活跃项目数（年度）',
        },
        {
          value:
            '/test/repo_model/merge_line_AS_china_city_add_repo_count.json',
          text: '中国新增项目数（年度）',
        },
        {
          value:
            '/test/repo_model/merge_line_QS-JAN_china_city_activity_repo_count.json',
          text: '中国活跃项目数（季度）',
        },
        {
          value:
            '/test/repo_model/merge_line_QS-JAN_china_city_add_repo_count.json',
          text: '中国新增项目数（季度）',
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
          text: '全球技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_美利坚合众国_activity_push_contribution.json',
          text: '美国技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_欧盟_activity_push_contribution.json',
          text: '欧盟技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_technology_country_中国_activity_push_contribution.json',
          text: '中国技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_北京市_activity_push_contribution.json',
          text: '北京市技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_上海市_activity_push_contribution.json',
          text: '上海市技术领域代码贡献量（年度）',
        },
        {
          value:
            '/test/repo_model/line_AS_杭州市_activity_push_contribution.json',
          text: '杭州市技术领域代码贡献量（年度）',
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
          text: '全球技术领域活跃开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_中国_activity_contributor_count.json',
          text: '中国技术领域活跃开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_美利坚合众国_activity_contributor_count.json',
          text: '美国技术领域活跃开发者数（年度）',
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
          text: '全球技术领域新增开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_中国_add_contributor_count.json',
          text: '中国技术领域新增开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_AS_technology_country_美利坚合众国_add_contributor_count.json',
          text: '美国技术领域新增开发者数（年度）',
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
            '/test/contributor_model/line_AS_country_not_merge_eu_activity_contributor_count.json',
          text: '全球活跃开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_AS_country_not_merge_eu_add_contributor_count.json',
          text: '全球新增开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_contributor_count.json',
          text: '全球活跃开发者数（季度）',
        },
        {
          value:
            '/test/contributor_model/line_QS-JAN_country_not_merge_eu_add_contributor_count.json',
          text: '全球新增开发者数（季度）',
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
          text: '中国活跃开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/merge_line_AS_china_city_add_contributor_count.json',
          text: '中国新增开发者数（年度）',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_activity_contributor_count.json',
          text: '中国活跃开发者数（季度）',
        },
        {
          value:
            '/test/contributor_model/merge_line_QS-JAN_china_city_add_contributor_count.json',
          text: '中国新增开发者数（季度）',
        },
      ],
    },
  ],
  language: [
    {
      name: '编程语言活跃开源仓库数量',
      id: 'global_language',
      value: [
        {
          value: '/test/repo_model/line_QS-JAN_main_language_list.json',
          text: '全球编程语言活跃开源仓库数量',
        },
        {
          value:
            '/test/repo_model/line_QS-JAN_美利坚合众国_main_language_list.json',
          text: '美国编程语言活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_欧盟_main_language_list.json',
          text: '欧盟编程语言活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_中国_main_language_list.json',
          text: '中国编程语言活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_印度_main_language_list.json',
          text: '印度编程语言活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_英国_main_language_list.json',
          text: '英国编程语言活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_日本_main_language_list.json',
          text: '日本编程语言活跃开源仓库数量',
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
          text: '全球License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_美利坚合众国_license.json',
          text: '美国License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_欧盟_license.json',
          text: '欧盟License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_中国_license.json',
          text: '中国License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_印度_license.json',
          text: '印度License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_英国_license.json',
          text: '英国License活跃开源仓库数量',
        },
        {
          value: '/test/repo_model/line_QS-JAN_日本_license.json',
          text: '日本License活跃开源仓库数量',
        },
      ],
    },
  ],
};
