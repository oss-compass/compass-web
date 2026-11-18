import { render, cleanup } from '@testing-library/react';
import Pie from '@modules/developer/DataView/OverviewSummary/DeveloperDashboard/Pie';

// ECharts binds one instance per DOM node and init() throws when the node still
// carries an instance, so the card must dispose on unmount or a remount crashes
// with "there is a chart instance already initialized on the dom" (issue #563).
jest.mock('echarts', () => {
  const instances = new Map();
  return {
    init: jest.fn((dom) => {
      if (instances.has(dom)) {
        throw new Error('there is a chart instance already initialized on the dom');
      }
      const chart = {
        setOption: jest.fn(),
        dispose: jest.fn(() => instances.delete(dom)),
      };
      instances.set(dom, chart);
      return chart;
    }),
    getInstanceByDom: jest.fn((dom) => instances.get(dom)),
  };
});

describe('Pie', () => {
  afterEach(cleanup);

  it('disposes its chart instance on unmount so a remount can initialize again', () => {
    const { unmount } = render(<Pie score="A" rank="60%" />);

    expect(() => unmount()).not.toThrow();

    // The second mount must not hit an instance that the first mount leaked.
    expect(() => render(<Pie score="A" rank="60%" />)).not.toThrow();
  });
});
