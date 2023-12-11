import React from 'react';
import { useTranslation } from 'next-i18next';

const useOptions = () => {
  const { t } = useTranslation();

  const dimension = [
    t('analyze:topic:productivity'),
    t('analyze:topic:productivity'),
    t('analyze:topic:productivity'),
    t('analyze:topic:robustness'),
    t('analyze:topic:robustness'),
    t('analyze:topic:robustness'),
    t('analyze:topic:niche_creation'),
    t('analyze:topic:niche_creation'),
    t('analyze:topic:niche_creation'),
  ];
  const type = [
    t('analyze:collaboration'),
    t('analyze:collaboration'),
    t('analyze:collaboration'),
    t('analyze:contributor'),
    t('analyze:contributor'),
    t('analyze:contributor'),
    t('analyze:software'),
    t('analyze:software'),
    t('analyze:software'),
  ];
  const color = ['#93AAFC', '#87D8F8', '#B193FC'];
  const models = [
    {
      name: t('analyze:all_model:collaboration_development_index'),
      key: 'collab_dev_index',
      value: [0, 1, 30],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:community_service_and_support'),
      key: 'community',
      value: [2, 1, 30],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:community_activity'),
      key: 'activity',
      value: [4, 1, 20],
      itemStyle: { color: color[1] },
      disable: false,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:organization_activity'),
      key: 'organizations_activity',
      value: [7, 1, 30],
      itemStyle: { color: color[2] },
      disable: false,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:contributors_domain_persona'),
      key: 'domain_persona',
      value: [0, 4, 30],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:contributors_role_persona'),
      key: 'role_persona',
      value: [1, 4, 30],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:contributors_milestone_persona'),
      key: 'milestone_persona',
      value: [2, 4, 30],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:contributor_route'),
      key: 'contributor_route',
      value: [4, 4, 30],
      itemStyle: { color: color[1] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:contributor_reputation'),
      key: 'contributor_reputation',
      value: [6, 4, 30],
      itemStyle: { color: color[2] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:user_reputation'),
      key: 'user_reputation',
      value: [8, 4, 40],
      itemStyle: { color: color[2] },
      disable: false,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:software_quality'),
      key: 'software_quality',
      value: [0, 7, 50],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:software_usage_quality'),
      key: 'software_usage_quality',
      value: [1, 7, 40],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:document_quality'),
      key: 'document_quality',
      value: [2, 7, 60],
      itemStyle: { color: color[0] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:northbound_adoption'),
      key: 'northbound_adoption',
      value: [3, 7, 30],
      itemStyle: { color: color[1] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:south_fit'),
      key: 'south_fit',
      value: [5, 7, 30],
      itemStyle: { color: color[1] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:security'),
      key: 'security',
      value: [6, 7, 60],
      itemStyle: { color: color[2] },
      disable: false,
      scope: 'software',
    },
    {
      name: t('analyze:all_model:compliance'),
      key: 'compliance',
      value: [8, 7, 40],
      itemStyle: { color: color[2] },
      disable: false,
      scope: 'software',
    },
  ];
  const areaColor = [
    'rgba(255,247,207,0.5)',
    'rgba(255,231,231,0.5)',
    'rgba(226,226,226,0.5)',
  ];
  const echartsOpts = {
    tooltip: {
      textStyle: {
        fontWeight: 'bolder',
      },
      formatter: (params) => {
        if (params.data.disable) {
          return params.name;
        } else {
          return params.name;
        }
      },
    },
    xAxis3D: {
      name: ' ',
      type: 'category',
      data: dimension,
      axisLine: {
        lineStyle: { width: 1 },
      },
      axisLabel: {
        interval: 2,
        textStyle: {
          fontSize: 12,
          color: '#aaa',
        },
        formatter: (index) => {
          return '              ' + index;
        },
      },
      splitLine: {
        show: true,
        interval: 2,
      },
      axisTick: {
        interval: 2,
        length: 1,
      },
    },
    zAxis3D: {
      name: ' ',
      type: 'value',
      splitNumber: 4,
      max: 80,
      axisLine: {
        lineStyle: { width: 0.1, opacity: 0.5 },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#ffffff', '#ffffff', '#ffffff'],
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis3D: {
      name: ' ',
      type: 'category',
      data: type,
      axisLine: {
        lineStyle: { width: 1 },
      },
      axisTick: {
        interval: 2,
        length: 1,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: areaColor,
        },
      },
      axisLabel: {
        interval: 2,
        textStyle: {
          fontSize: 12,
          color: '#aaa',
        },
      },
    },
    series: [
      {
        type: 'bar3D',
        data: models,
        shading: 'realistic',
        //金属质感，配合 ambientCubemap 使用
        // realisticMaterial: {
        //     roughness: 0.2,
        //     metalness: 1
        // },
        bevelSize: 0.1,
        bevelSmoothness: 2,
        barSize: 13,
        label: {
          show: false,
          fontSize: 12,
          fontWeight: 500,
          borderWidth: 1,
          color: '#333',
          distance: -20,
          // formatter: function (params) {
          //   var value = params.name;
          //   // 将超过指定字数的标签用 \n 换行
          //   var maxLength = 2; // 指定字数
          //   var rows = Math.ceil(value.length / maxLength); // 计算需要换几行
          //   var result = '\n';
          //   for (var i = 0; i < rows; i++) {
          //     var start = i * maxLength;
          //     var end = start + maxLength;
          //     result += value.substring(start, end) + '\n';
          //   }
          //   return result;
          // },
        },
        itemStyle: {
          opacity: 0.95,
        },
        //柱子高亮状态
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: '#FFB800',
            opacity: 0.7,
          },
        },
      },
    ],
    grid3D: {
      environment: '#f0f2f2',
      axisLine: {
        interval: 1,
      },
      //参考线
      axisPointer: {
        //show: false,
        lineStyle: { opacity: 0.2 },
        label: { show: false },
      },
      splitLine: { interval: 2 },
      //初始化摄像机视角
      viewControl: {
        //透视与正交切换 perspective / orthographic
        projection: 'perspective',
        //自动旋转
        // autoRotate: true,
        // autoRotateSpeed: 1,
        //禁用缩放
        zoomSensitivity: 0,
        rotateSensitivity: [2, 0],
        distance: 250,
        alpha: 20,
        beta: 0,
      },
      boxWidth: 200,
      light: {
        //主光源
        main: {
          intensity: 0.8,
          alpha: 50,
        },
        //环境光源
        ambient: {
          intensity: 0.5,
        },
        // ambientCubemap: {
        //   texture: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr',
        //   exposure: 0.6,
        //   diffuseIntensity: 0.5,
        //   specularIntensity: 1
        // }
      },
    },
  };
  return {
    dimension,
    type,
    models,
    echartsOpts,
  };
};

export default useOptions;
