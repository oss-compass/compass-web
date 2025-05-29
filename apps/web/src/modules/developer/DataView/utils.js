import { isArray, sortBy, min, max } from 'lodash'; // 引入 min 和 max

const color = [
  '#9467bd', // 紫色
  '#fc8452',
  '#e377c2', // 粉红色
  '#3ba272',
  '#19c7b9',
  '#1e91d8',
  '#17becf', // 青色
  '#b6d551',
  '#c79f19', // 棕色
  '#bcbd22', // 黄绿色
  '#7f7f7f', // 灰色
].reverse();

const colorMap = {
  AlexV525: '#5470c6',
  Hixie: '#91cc75',
  zmtzawqlp: '#fac858',
  CarGuo: '#ee6666',
};

// 工具函数
const calculateValues = (count, max, min, valueMax, valueMin) => {
  let diff = max - min;
  let ratio = count / diff;
  let valueRange = valueMax - valueMin;
  let value = valueMin + valueRange * ratio;
  return value;
};

const getMaxMin = (arr) => {
  let counts = arr.map((obj) => obj.contributor_count);
  let min = Math.min(...counts);
  let max = Math.max(...counts) + 1;
  let sum = counts.reduce((acc, val) => acc + val, 0);
  let average = sum / counts.length;
  return { min, max, average };
};

// 数据处理函数
const getNodesLinks = (data, user, contribution) => {
  let links = [];
  let nodes = [];
  let nodeName = [];

  let total = data;
  const linksRaw = Object.keys(total);
  const contributor_count = linksRaw.reduce(
    (a, b) => a + total[b].total_contribution,
    0
  );
  const userNodes = {
    name: user,
    id: user,
    type: 'contributor',
    contributor_count,
  };
  nodeName.push(user);
  nodes.push(userNodes);

  linksRaw.forEach((item) => {
    let repo_contributor_count = total[item].total_contribution;
    if (repo_contributor_count >= contribution) {
      if (!nodes.find((n) => n.id === item)) {
        nodes.push({
          id: item,
          name: item,
          contributor_count: repo_contributor_count,
          type: 'repo',
        });
        nodeName.push(item);
      }
      links.push({
        source_repo: user,
        target_repo: item,
        value: repo_contributor_count,
        contributor_count: repo_contributor_count,
      });
    }
  });

  return { links, nodes, nodeName };
};

const createQuantileScaleWithLodash = (values, colors) => {
  console.log(values, colors);

  // 检查 values 是否为非空数组
  if (
    !isArray(values) ||
    values.length === 0 ||
    !isArray(colors) ||
    colors.length === 0
  ) {
    console.warn('Invalid input for createQuantileScaleWithLodash');
    return () => colors[0] || undefined; // 返回一个默认函数或 undefined
  }

  const minValue = min(values);
  const maxValue = max(values);

  // 如果所有值都相同，则返回第一个颜色
  if (minValue === maxValue) {
    return () => colors[0];
  }

  const range = maxValue - minValue;
  const intervalSize = range / colors.length;

  // 生成区间的阈值
  const thresholds = [];
  for (let i = 0; i <= colors.length; i++) {
    thresholds.push(minValue + i * intervalSize);
  }

  // 返回一个函数，根据数值返回对应的颜色
  return (value) => {
    // 处理超出范围的最小值
    if (value < thresholds[0]) {
      return colors[0];
    }
    // 处理超出范围的最大值
    if (value >= thresholds[thresholds.length - 1]) {
      return colors[colors.length - 1];
    }

    // 查找数值所在的区间
    for (let i = 0; i < thresholds.length - 1; i++) {
      // 注意：这里使用 >= 和 < 来定义区间，最后一个区间包含最大值
      if (value >= thresholds[i] && value < thresholds[i + 1]) {
        return colors[i];
      }
    }
    // 如果由于浮点数精度等问题未能匹配到，返回最后一个颜色
    return colors[colors.length - 1];
  };
};
const formatData = (array, key) => {
  const result = {};
  array.forEach((item) => {
    if (key === 'repo') {
      // 确保 item[key] 存在且是字符串，避免 TypeError
      if (item && typeof item[key] === 'string') {
        const repoName = item[key].split('/').slice(3).join('/'); // 获取 repo 名称
        result[repoName] = item; // 将项添加到结果对象中
      } else {
        console.warn(
          `Skipping item due to invalid or missing '${key}' property:`,
          item
        );
      }
    } else {
      result[item[key]] = item; // 将项添加到结果对象中
    }
  });
  return result;
};
export const calcData = (rowdData, user, contributionLimit, key) => {
  const data = rowdData.length > 350 ? rowdData.slice(0, 350) : rowdData;
  let { links, nodes } = getNodesLinks(
    formatData(data, key),
    user,
    contributionLimit,
    key
  );
  const repoNodes = nodes.filter((item) => item.type === 'repo');
  const nodeLimit = getMaxMin(repoNodes);
  const linkLimit = getMaxMin(links);
  console.log(nodeLimit, linkLimit);
  // const c = d3.scaleQuantile().domain(d3.range(nodeLimit.min, nodeLimit.max)).range(color);
  const repoValues = repoNodes.map((node) => node.contributor_count);
  const c = createQuantileScaleWithLodash(repoValues, color);
  let newNodes = [];
  let nodeName = [];

  nodes.forEach((item, index) => {
    if (item.name === user) {
      nodeName.push(item.name);
      newNodes.push({
        symbol: item.type === 'contributor' ? 'circle' : 'diamond',
        symbolSize: 100,
        count: item.contributor_count,
        itemStyle: {
          color: '#ee6666',
        },
        ...item,
      });
    } else {
      nodeName.push(item.name);
      newNodes.push({
        symbol: item.type === 'contributor' ? 'circle' : 'roundRect',
        symbolSize: calculateValues(
          item.contributor_count,
          nodeLimit.max,
          nodeLimit.min,
          70,
          1
        ),
        count: item.contributor_count,
        itemStyle: {
          color: c(item.contributor_count),
        },
        ...item,
      });
    }
  });

  links = links.map((item) => {
    return {
      source: item.source_repo,
      target: item.target_repo,
      value: item.contributor_count,
      lineStyle: {
        opacity: calculateValues(
          item.contributor_count,
          linkLimit.max,
          linkLimit.min,
          0.99,
          0.01
        ),
        width: '1.5',
        color: c(item.contributor_count),
      },
      ...item,
    };
  });

  return {
    nodes: newNodes,
    links,
    nodeName,
  };
};
