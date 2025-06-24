import { useTranslation } from 'next-i18next';

export const useImportExportChartTitles = () => {
  const { t } = useTranslation('os-situation');

  const keys = [
    'importExport.global',
    'importExport.import_annual',
    'importExport.import_quarterly',
    'importExport.export_annual',
    'importExport.export_quarterly',
    'importExport.total_annual',
    'importExport.total_quarterly',
    'importExport.ratio_annual',
    'importExport.ratio_quarterly',
  ];

  return keys.map((key, index) => {
    const item = t(key);
    return {
      id: key,
      value: [],
      name: item,
    };
  });
};

export const useCategoriesData = () => {
  const { t } = useTranslation('os-situation');
  const importExportChartTitles = useImportExportChartTitles();

  return {
    push: [
      {
        name: t('categories.global_push'),
        id: 'global_push',
        value: [
          {
            id: 'categoriesData.global_code_contribution_annual',
            value:
              '/test/contributor_model/line_AS_country_not_merge_eu_activity_push_contribution.json',
            name: t('categoriesData.global_code_contribution_annual'),
          },
          {
            id: 'categoriesData.eu_code_contribution_annual',
            value:
              '/test/contributor_model/line_AS_eu_country_activity_push_contribution.json',
            name: t('categoriesData.eu_code_contribution_annual'),
          },
          {
            id: 'categoriesData.global_code_contribution_quarterly',
            value:
              '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_push_contribution.json',
            name: t('categoriesData.global_code_contribution_quarterly'),
          },
          {
            id: 'categoriesData.eu_code_contribution_quarterly',
            value:
              '/test/contributor_model/line_QS-JAN_eu_country_activity_push_contribution.json',
            name: t('categoriesData.eu_code_contribution_quarterly'),
          },
        ],
      },
      {
        name: t('categories.china_push'),
        id: 'china_push',
        value: [
          {
            id: 'categoriesData.china_code_contribution_annual',
            value:
              '/test/contributor_model/merge_line_AS_china_city_activity_push_contribution.json',
            name: t('categoriesData.china_code_contribution_annual'),
          },
          {
            id: 'categoriesData.china_code_contribution_quarterly',
            value:
              '/test/contributor_model/merge_line_QS-JAN_china_city_activity_push_contribution.json',
            name: t('categoriesData.china_code_contribution_quarterly'),
          },
        ],
      },
    ],
    import_export: importExportChartTitles,
    repositories: [
      {
        name: t('categoriesData.global_repositories_name'),
        id: 'global_repositories',
        value: [
          {
            id: 'categoriesData.global_active_projects_annual',
            value: '/test/repo_model/line_AS_country_activity_repo_count.json',
            name: t('categoriesData.global_active_projects_annual'),
          },
          {
            id: 'categoriesData.global_new_projects_annual',
            value: '/test/repo_model/line_AS_country_add_repo_count.json',
            name: t('categoriesData.global_new_projects_annual'),
          },
          {
            id: 'categoriesData.global_active_projects_quarterly',
            value:
              '/test/repo_model/line_QS-JAN_country_activity_repo_count.json',
            name: t('categoriesData.global_active_projects_quarterly'),
          },
          {
            id: 'categoriesData.global_new_projects_quarterly',
            value: '/test/repo_model/line_QS-JAN_country_add_repo_count.json',
            name: t('categoriesData.global_new_projects_quarterly'),
          },
        ],
      },
      {
        name: t('categoriesData.china_repositories_name'),
        id: 'china_repositories',
        value: [
          {
            id: 'categoriesData.china_active_projects_annual',
            value:
              '/test/repo_model/merge_line_AS_china_city_activity_repo_count.json',
            name: t('categoriesData.china_active_projects_annual'),
          },
          {
            id: 'categoriesData.china_new_projects_annual',
            value:
              '/test/repo_model/merge_line_AS_china_city_add_repo_count.json',
            name: t('categoriesData.china_new_projects_annual'),
          },
          {
            id: 'categoriesData.china_active_projects_quarterly',
            value:
              '/test/repo_model/merge_line_QS-JAN_china_city_activity_repo_count.json',
            name: t('categoriesData.china_active_projects_quarterly'),
          },
          {
            id: 'categoriesData.china_new_projects_quarterly',
            value:
              '/test/repo_model/merge_line_QS-JAN_china_city_add_repo_count.json',
            name: t('categoriesData.china_new_projects_quarterly'),
          },
        ],
      },
    ],

    topics: [
      {
        name: t('categoriesData.technology_push_name'),
        id: 'technology_push',
        value: [
          {
            id: 'categoriesData.global_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_technology_global_activity_push_contribution.json',
            name: t('categoriesData.global_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.us_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_technology_country_美利坚合众国_activity_push_contribution.json',
            name: t('categoriesData.us_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.eu_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_technology_country_欧盟_activity_push_contribution.json',
            name: t('categoriesData.eu_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.china_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_technology_country_中国_activity_push_contribution.json',
            name: t('categoriesData.china_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.beijing_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_北京市_activity_push_contribution.json',
            name: t('categoriesData.beijing_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.shanghai_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_上海市_activity_push_contribution.json',
            name: t('categoriesData.shanghai_tech_code_contribution_annual'),
          },
          {
            id: 'categoriesData.hangzhou_tech_code_contribution_annual',
            value:
              '/test/repo_model/line_AS_杭州市_activity_push_contribution.json',
            name: t('categoriesData.hangzhou_tech_code_contribution_annual'),
          },
        ],
      },
      {
        name: t('categoriesData.technology_contributor_name'),
        id: 'technology_contributor',
        value: [
          {
            id: 'categoriesData.global_tech_active_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_global_activity_contributor_count.json',
            name: t('categoriesData.global_tech_active_developers_annual'),
          },
          {
            id: 'categoriesData.china_tech_active_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_country_中国_activity_contributor_count.json',
            name: t('categoriesData.china_tech_active_developers_annual'),
          },
          {
            id: 'categoriesData.us_tech_active_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_country_美利坚合众国_activity_contributor_count.json',
            name: t('categoriesData.us_tech_active_developers_annual'),
          },
        ],
      },
      {
        name: t('categoriesData.technology_add_contributor_name'),
        id: 'technology_add_contributor',
        value: [
          {
            id: 'categoriesData.global_tech_new_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_global_add_contributor_count.json',
            name: t('categoriesData.global_tech_new_developers_annual'),
          },
          {
            id: 'categoriesData.china_tech_new_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_country_中国_add_contributor_count.json',
            name: t('categoriesData.china_tech_new_developers_annual'),
          },
          {
            id: 'categoriesData.us_tech_new_developers_annual',
            value:
              '/test/contributor_model/line_AS_technology_country_美利坚合众国_add_contributor_count.json',
            name: t('categoriesData.us_tech_new_developers_annual'),
          },
        ],
      },
    ],
    contributor: [
      {
        name: t('categoriesData.global_contributor_name'),
        id: 'global_contributor',
        value: [
          {
            id: 'categoriesData.global_active_developers_annual',
            value:
              '/test/contributor_model/line_AS_country_not_merge_eu_activity_contributor_count.json',
            name: t('categoriesData.global_active_developers_annual'),
          },
          {
            id: 'categoriesData.global_new_developers_annual',
            value:
              '/test/contributor_model/line_AS_country_not_merge_eu_add_contributor_count.json',
            name: t('categoriesData.global_new_developers_annual'),
          },
          {
            id: 'categoriesData.global_active_developers_quarterly',
            value:
              '/test/contributor_model/line_QS-JAN_country_not_merge_eu_activity_contributor_count.json',
            name: t('categoriesData.global_active_developers_quarterly'),
          },
          {
            id: 'categoriesData.global_new_developers_quarterly',
            value:
              '/test/contributor_model/line_QS-JAN_country_not_merge_eu_add_contributor_count.json',
            name: t('categoriesData.global_new_developers_quarterly'),
          },
        ],
      },
      {
        name: t('categoriesData.china_contributor_name'),
        id: 'china_contributor',
        value: [
          {
            id: 'categoriesData.china_active_developers_annual',
            value:
              '/test/contributor_model/merge_line_AS_china_city_activity_contributor_count.json',
            name: t('categoriesData.china_active_developers_annual'),
          },
          {
            id: 'categoriesData.china_new_developers_annual',
            value:
              '/test/contributor_model/merge_line_AS_china_city_add_contributor_count.json',
            name: t('categoriesData.china_new_developers_annual'),
          },
          {
            id: 'categoriesData.china_active_developers_quarterly',
            value:
              '/test/contributor_model/merge_line_QS-JAN_china_city_activity_contributor_count.json',
            name: t('categoriesData.china_active_developers_quarterly'),
          },
          {
            id: 'categoriesData.china_new_developers_quarterly',
            value:
              '/test/contributor_model/merge_line_QS-JAN_china_city_add_contributor_count.json',
            name: t('categoriesData.china_new_developers_quarterly'),
          },
        ],
      },
    ],
    language: [
      {
        name: t('categoriesData.global_language_name'),
        id: 'global_language',
        value: [
          {
            id: 'categoriesData.global_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_main_language_list.json',
            name: t('categoriesData.global_language_active_repos'),
          },
          {
            id: 'categoriesData.us_language_active_repos',
            value:
              '/test/repo_model/line_QS-JAN_美利坚合众国_main_language_list.json',
            name: t('categoriesData.us_language_active_repos'),
          },
          {
            id: 'categoriesData.eu_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_欧盟_main_language_list.json',
            name: t('categoriesData.eu_language_active_repos'),
          },
          {
            id: 'categoriesData.china_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_中国_main_language_list.json',
            name: t('categoriesData.china_language_active_repos'),
          },
          {
            id: 'categoriesData.india_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_印度_main_language_list.json',
            name: t('categoriesData.india_language_active_repos'),
          },
          {
            id: 'categoriesData.uk_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_英国_main_language_list.json',
            name: t('categoriesData.uk_language_active_repos'),
          },
          {
            id: 'categoriesData.japan_language_active_repos',
            value: '/test/repo_model/line_QS-JAN_日本_main_language_list.json',
            name: t('categoriesData.japan_language_active_repos'),
          },
        ],
      },
    ],
    license: [
      {
        name: t('categoriesData.global_license_name'),
        id: 'global_license',
        value: [
          {
            id: 'categoriesData.global_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_license.json',
            name: t('categoriesData.global_license_active_repos'),
          },
          {
            id: 'categoriesData.us_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_美利坚合众国_license.json',
            name: t('categoriesData.us_license_active_repos'),
          },
          {
            id: 'categoriesData.eu_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_欧盟_license.json',
            name: t('categoriesData.eu_license_active_repos'),
          },
          {
            id: 'categoriesData.china_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_中国_license.json',
            name: t('categoriesData.china_license_active_repos'),
          },
          {
            id: 'categoriesData.india_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_印度_license.json',
            name: t('categoriesData.india_license_active_repos'),
          },
          {
            id: 'categoriesData.uk_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_英国_license.json',
            name: t('categoriesData.uk_license_active_repos'),
          },
          {
            id: 'categoriesData.japan_license_active_repos',
            value: '/test/repo_model/line_QS-JAN_日本_license.json',
            name: t('categoriesData.japan_license_active_repos'),
          },
        ],
      },
    ],
  };
};
