import { isArray, sortBy } from 'lodash';

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
  // 如果传入的是数组值，计算分位数
  const sortedValues = isArray(values) ? sortBy(values) : null;

  if (sortedValues) {
    const quantiles = [];
    for (let i = 0; i <= colors.length; i++) {
      const quantile = i / colors.length;
      const index = Math.floor(quantile * (sortedValues.length - 1));
      quantiles.push(sortedValues[index]);
    }

    return (value) => {
      for (let i = 0; i < quantiles.length - 1; i++) {
        if (value >= quantiles[i] && value < quantiles[i + 1]) {
          return colors[i];
        }
      }
      return colors[colors.length - 1];
    };
  }

  // 如果是 min/max 值
  return createQuantileColorScale(values.min, values.max, colors);
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
export const calcData = (data, user, contributionLimit, key) => {
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
