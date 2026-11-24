import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RepoRerunModal } from './RepoRerunComponents';

const summary = {
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  na: 0,
  closeRate: 0,
};

it('defaults to Ubuntu and allows selecting the historical report OS', async () => {
  const onConfirmRerun = jest.fn();
  render(
    <RepoRerunModal
      open
      repo={{
        id: 'repo',
        name: 'cann/repo',
        team: 'CANN',
        hardwareEnv: 'ascend-910c',
        operatingSystem: 'debian-13',
        score: null,
        successRate: null,
        executionTime: null,
        scoreHistory: [],
        overall: summary,
        key: summary,
        issues: [],
      }}
      hardware="ascend-910c"
      operatorUser={{
        user_id: 'maintainer',
        username: 'maintainer',
        display_name: 'Maintainer',
        role: 'admin',
        enabled: true,
        repo_keys: [],
        repo_names: [],
      }}
      canCurrentUserOperate
      rerunRecords={[]}
      rerunRecordsLoading={false}
      rerunRecordsError=""
      cancelingJobId=""
      shouldShowRerunRecordsTable={false}
      rerunning={false}
      onCancel={jest.fn()}
      onSwitchAccount={jest.fn()}
      onConfirmRerun={onConfirmRerun}
      onCancelRecord={jest.fn()}
      canCancelRecord={() => false}
      nodeStatuses={[
        { node_id: 'node', os_tags: ['debian-13', 'ubuntu-24.04'] },
      ]}
      selectedNodeKey="node"
      rerunRecordsExpanded={false}
      onToggleRerunRecords={jest.fn()}
    />
  );

  expect(
    screen.getByText(
      '默认选择 ubuntu-24.04，如需复现历史报告中的痛点，请和历史报告操作系统保持一致。'
    )
  ).toBeInTheDocument();
  const confirmButton = screen.getByRole('button', { name: '确认重跑' });
  fireEvent.click(confirmButton);
  expect(onConfirmRerun).toHaveBeenLastCalledWith('ubuntu-24.04');

  fireEvent.mouseDown(screen.getByRole('combobox'));
  fireEvent.click(
    await screen.findByText('debian-13', {
      selector: '.ant-select-item-option-content',
    })
  );
  fireEvent.click(confirmButton);
  expect(onConfirmRerun).toHaveBeenLastCalledWith('debian-13');
});
