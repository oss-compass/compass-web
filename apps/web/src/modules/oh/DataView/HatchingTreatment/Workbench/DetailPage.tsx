import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

import NotFoundOh from '@modules/oh/components/NotFoundOh';

const DetailPage = () => {
  const url = new URL(window.location.href.replace('#', ''));
  const projectId = url.searchParams.get('projectId');
  let items = [
    {
      id: 's21t926o',
      name: 'jasonsantos/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '49.25',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 32,
        },
        {
          name: '生命周期',
          score: 33,
        },
        {
          name: '网络安全',
          score: 52,
        },
      ],
    },
    {
      id: 'sazgg2nh',
      name: 'gudzpoz/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '86',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 84,
        },
        {
          name: '生命周期',
          score: 100,
        },
        {
          name: '网络安全',
          score: 80,
        },
      ],
    },
    {
      name: 'vue',
      description:
        'Vue.js 是构建 Web 界面的 JavaScript 库，提供数据驱动的组件，还有简单灵活的 API，使得 MVVM 更简单。',
      reportVersion: 'v2',
      updated: '2024-06-01',
      score: '88',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 73,
        },
        {
          name: '技术生态',
          score: 65,
        },
        {
          name: '生命周期',
          score: 77,
        },
        {
          name: '网络安全',
          score: 44,
        },
      ],
    },
    {
      name: 'angular',
      description:
        'Angular 是一个基于 TypeScript 的 Web 应用程序框架。它提供了完整的解决方案，涵盖了路由、表单管理、状态管理等常见需求，是企业级 Web 应用的理想选择。',
      reportVersion: 'v1',
      updated: '2024-07-01',
      score: '86',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 78,
        },
        {
          name: '技术生态',
          score: 72,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 64,
        },
      ],
    },
    {
      name: 'node.js',
      description:
        'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它使用事件驱动、非阻塞 I/O 模型，非常适合构建高性能、实时的网络应用。',
      reportVersion: 'v2',
      updated: '2024-04-20',
      score: '91',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 82,
        },
        {
          name: '技术生态',
          score: 88,
        },
        {
          name: '生命周期',
          score: 79,
        },
        {
          name: '网络安全',
          score: 72,
        },
      ],
    },
    {
      name: 'django',
      description:
        'Django 是一个基于 Python 的 Web 框架，它强调快速开发、安全性和灵活性。它提供了很多开箱即用的功能，如 ORM、Admin 后台、模板引擎等。',
      reportVersion: 'v1',
      updated: '2024-08-01',
      score: '87',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 75,
        },
        {
          name: '技术生态',
          score: 81,
        },
        {
          name: '生命周期',
          score: 73,
        },
        {
          name: '网络安全',
          score: 69,
        },
      ],
    },
    {
      name: 'flask',
      description:
        'Flask 是一个轻量级的 Python Web 框架，它专注于构建 API 和微服务。它具有简单、优雅、灵活的特点，非常适合快速开发小型到中型的 Web 应用。',
      reportVersion: 'v2',
      updated: '2024-03-01',
      score: '84',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 71,
        },
        {
          name: '技术生态',
          score: 75,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 62,
        },
      ],
    },
  ];
  let actItem = null;
  if (projectId) {
    actItem = items.find((item) => item.id === projectId);
  }
  const [activeItem, setActiveItem] = useState(actItem);
  if (!activeItem) {
    return <NotFoundOh />;
  }
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'TPC 软件报告详情'}
          <div>
            <Input prefix={<SearchOutlined rev={undefined} />} />
          </div>
        </div>
        <div className="relative mb-6 flex h-[calc(100%-60px)] justify-center overflow-auto p-5">
          <EvaluationDetail name={activeItem.name} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
