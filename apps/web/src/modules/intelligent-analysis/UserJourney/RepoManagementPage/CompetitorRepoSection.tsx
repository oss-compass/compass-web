import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  deleteCompetitorRepo,
  fetchCompetitorRepos,
  rerunAllCompetitorRepos,
  rerunCompetitorRepo,
  upsertCompetitorRepo,
} from '../rawData/apiClient';
import type {
  CompetitorRepoItem,
  CompetitorRerunAllResult,
} from '../rawData/apiClient';

type EditorValues = {
  repo_url: string;
  default_branch: string;
  hardware_env: string;
  remark: string;
};

type Props = {
  isAdmin: boolean;
  authChecking: boolean;
};

const statusMeta: Record<string, { text: string; color: string }> = {
  queued: { text: '排队中', color: 'processing' },
  pending: { text: '等待中', color: 'processing' },
  running: { text: '运行中', color: 'blue' },
  completed: { text: '已完成', color: 'success' },
  failed: { text: '失败', color: 'error' },
  cancelled: { text: '已取消', color: 'default' },
  timeout: { text: '超时', color: 'warning' },
};

const CompetitorRepoSection: React.FC<Props> = ({ isAdmin, authChecking }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CompetitorRepoItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [rerunning, setRerunning] = useState(false);
  const [rerunningRepoId, setRerunningRepoId] = useState('');
  const [rerunResult, setRerunResult] =
    useState<CompetitorRerunAllResult | null>(null);
  const [form] = Form.useForm<EditorValues>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['competitor-repo-list', keyword, page, pageSize],
    queryFn: () =>
      fetchCompetitorRepos({
        keyword: keyword || undefined,
        page,
        size: pageSize,
      }),
  });

  const openCreate = () => {
    setEditing(null);
    form.setFieldsValue({
      repo_url: '',
      default_branch: 'master',
      hardware_env: 'ascend-910c',
      remark: '',
    });
    setEditorOpen(true);
  };

  const openEdit = useCallback(
    (record: CompetitorRepoItem) => {
      setEditing(record);
      form.setFieldsValue({
        repo_url: record.repo_url,
        default_branch: record.default_branch || 'master',
        hardware_env: record.hardware_env || 'ascend-910c',
        remark: record.remark || '',
      });
      setEditorOpen(true);
    },
    [form]
  );

  const saveRepo = async (values: EditorValues) => {
    setSaving(true);
    try {
      const result = await upsertCompetitorRepo(values);
      messageApi.success(result.message || '竞品仓库已保存');
      setEditorOpen(false);
      setEditing(null);
      await queryClient.invalidateQueries({
        queryKey: ['competitor-repo-list'],
      });
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const runAll = async () => {
    setRerunning(true);
    try {
      const result = await rerunAllCompetitorRepos();
      setRerunResult(result.data);
      await refetch();
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : '全部重跑失败');
    } finally {
      setRerunning(false);
    }
  };

  const columns = useMemo<ColumnsType<CompetitorRepoItem>>(
    () => [
      {
        title: '竞品仓库',
        dataIndex: 'repo_full_name',
        width: 220,
        render: (value: string, record) => (
          <a href={record.repo_url} target="_blank" rel="noreferrer">
            {value}
          </a>
        ),
      },
      {
        title: '默认分支',
        dataIndex: 'default_branch',
        width: 120,
      },
      {
        title: '硬件环境',
        dataIndex: 'hardware_env',
        width: 140,
        render: (value: string) => <Tag color="processing">{value}</Tag>,
      },
      {
        title: '对标 CANN 仓库',
        dataIndex: 'benchmark_cann_repos',
        width: 240,
        render: (values: string[]) =>
          values?.length ? (
            <Space size={[4, 4]} wrap>
              {values.map((value) => (
                <Tag key={value} color="geekblue">
                  {value}
                </Tag>
              ))}
            </Space>
          ) : (
            <span className="text-slate-300">--</span>
          ),
      },
      {
        title: '最近重跑',
        key: 'latest_rerun_job',
        width: 130,
        render: (_value, record) => {
          const status = record.latest_rerun_job?.status;
          if (!status) return <span className="text-slate-300">--</span>;
          const meta = statusMeta[status] || { text: status, color: 'default' };
          return <Tag color={meta.color}>{meta.text}</Tag>;
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
        render: (value: string) => value || '-',
      },
      {
        title: '操作',
        width: 190,
        fixed: 'right',
        render: (_value, record) =>
          isAdmin ? (
            <Space size={4}>
              <Popconfirm
                title={`确认重跑 ${record.repo_full_name} 吗？`}
                description="已有运行中任务时不会重复提交。"
                okText="确认重跑"
                cancelText="取消"
                onConfirm={async () => {
                  setRerunningRepoId(record.repo_id);
                  try {
                    const result = await rerunCompetitorRepo(record.repo_id);
                    messageApi.success(result.message || '已触发重跑');
                    await refetch();
                  } catch (error) {
                    messageApi.error(
                      error instanceof Error ? error.message : '重跑失败'
                    );
                  } finally {
                    setRerunningRepoId('');
                  }
                }}
              >
                <Button
                  type="link"
                  size="small"
                  loading={rerunningRepoId === record.repo_id}
                >
                  重跑
                </Button>
              </Popconfirm>
              <Button type="link" size="small" onClick={() => openEdit(record)}>
                编辑
              </Button>
              <Popconfirm
                title="确认删除该竞品仓库吗？"
                onConfirm={async () => {
                  try {
                    const result = await deleteCompetitorRepo(record.repo_id);
                    messageApi.success(result.message || '已删除');
                    await queryClient.invalidateQueries({
                      queryKey: ['competitor-repo-list'],
                    });
                  } catch (error) {
                    messageApi.error(
                      error instanceof Error ? error.message : '删除失败'
                    );
                  }
                }}
              >
                <Button
                  type="link"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                >
                  删除
                </Button>
              </Popconfirm>
            </Space>
          ) : (
            <span className="text-slate-400">仅管理员可操作</span>
          ),
      },
    ],
    [isAdmin, messageApi, openEdit, queryClient, refetch, rerunningRepoId]
  );

  return (
    <div>
      {contextHolder}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Input.Search
          allowClear
          placeholder="搜索仓库、链接或备注"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setPage(1);
          }}
          style={{ width: 320 }}
        />
        <Space wrap className="ml-auto">
          <Button icon={<ReloadOutlined />} onClick={() => void refetch()}>
            刷新
          </Button>
          <Tooltip title={isAdmin ? '' : '需要管理员权限'}>
            <Popconfirm
              title="确认重跑全部有对标关系的竞品仓库吗？"
              description="没有对标 CANN 仓库的竞品不会提交，已有运行中任务将自动跳过。"
              okText="确认重跑"
              cancelText="取消"
              disabled={!isAdmin || rerunning}
              onConfirm={() => void runAll()}
            >
              <Button disabled={!isAdmin} loading={rerunning}>
                全部重跑
              </Button>
            </Popconfirm>
          </Tooltip>
          {isAdmin ? (
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
              新增竞品仓库
            </Button>
          ) : null}
        </Space>
      </div>

      <Table<CompetitorRepoItem>
        rowKey="repo_id"
        loading={isLoading || authChecking}
        columns={columns}
        dataSource={data?.items || []}
        scroll={{ x: 980 }}
        pagination={{
          current: page,
          pageSize,
          total: data?.total || 0,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (nextPage, nextPageSize) => {
            setPage(nextPageSize === pageSize ? nextPage : 1);
            setPageSize(nextPageSize);
          },
        }}
        locale={{ emptyText: '暂无竞品仓库，请先新增仓库链接' }}
      />

      <Modal
        open={editorOpen}
        title={editing ? '编辑竞品仓库' : '新增竞品仓库'}
        okText="保存"
        cancelText="取消"
        confirmLoading={saving}
        onOk={() => void form.submit()}
        onCancel={() => setEditorOpen(false)}
        destroyOnHidden
      >
        <Form<EditorValues> form={form} layout="vertical" onFinish={saveRepo}>
          <Form.Item
            label="仓库链接"
            name="repo_url"
            rules={[
              { required: true, message: '请输入仓库链接' },
              { type: 'url', message: '请输入合法的 HTTPS 仓库链接' },
            ]}
          >
            <Input
              placeholder="https://gitcode.com/org/repo"
              disabled={!!editing}
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="默认分支"
              name="default_branch"
              rules={[{ required: true }]}
            >
              <Input placeholder="master" />
            </Form.Item>
            <Form.Item
              label="硬件环境"
              name="hardware_env"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 'ascend-910c', label: 'ascend-910c' },
                  { value: 'ascend-950', label: 'ascend-950' },
                  { value: 'nvidia-l20', label: 'nvidia-l20' },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={!!rerunResult}
        title="竞品仓库全部重跑结果"
        footer={<Button onClick={() => setRerunResult(null)}>关闭</Button>}
        onCancel={() => setRerunResult(null)}
        width={720}
      >
        {rerunResult ? (
          <>
            <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              共 {rerunResult.summary.total} 个，已提交{' '}
              {rerunResult.summary.submitted} 个， 跳过{' '}
              {rerunResult.summary.skipped} 个，失败{' '}
              {rerunResult.summary.failed} 个。
            </div>
            <Table
              rowKey="repo_id"
              size="small"
              pagination={false}
              dataSource={rerunResult.items}
              columns={[
                { title: '仓库', dataIndex: 'repo_full_name' },
                {
                  title: '结果',
                  dataIndex: 'status',
                  width: 90,
                  render: (value: string) => (
                    <Tag
                      color={
                        value === 'submitted'
                          ? 'success'
                          : value === 'failed'
                          ? 'error'
                          : 'warning'
                      }
                    >
                      {value === 'submitted'
                        ? '已提交'
                        : value === 'failed'
                        ? '失败'
                        : '已跳过'}
                    </Tag>
                  ),
                },
                { title: '说明', dataIndex: 'message' },
              ]}
            />
          </>
        ) : null}
      </Modal>
    </div>
  );
};

export default CompetitorRepoSection;
