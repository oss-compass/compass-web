import type { CiProblem } from '../../types';
import { ACTIONS, trackingProblemKey, uniqueProblems } from './model';

const problem = {
  dimkey: 'stability',
  kb: '执行机失败',
  title: '影响两次执行',
  seg: '编译',
} as CiProblem;

describe('CI pain identity and action availability', () => {
  it('shares one record across journey stages and does not merge distinct problems', () => {
    const anotherStage = { ...problem, seg: '单元测试' };
    const anotherDimension = { ...problem, dimkey: 'efficiency' as const };
    const anotherTitle = { ...problem, title: '另一个失败现象' };
    expect(trackingProblemKey(problem)).toBe(trackingProblemKey(anotherStage));
    expect(
      uniqueProblems([problem, anotherStage, anotherDimension, anotherTitle])
    ).toHaveLength(3);
  });

  it('permits validity corrections while repair status is computed by observation', () => {
    expect(ACTIONS.confirmed).toEqual(['mark_invalid', 'reset']);
    expect(ACTIONS.fixed).toEqual(['mark_invalid', 'reset']);
    expect(Object.values(ACTIONS).flat()).not.toContain('mark_fixed');
    expect(Object.values(ACTIONS).flat()).not.toContain('rerun');
  });
});
