import {
  buildContributorDetailVariables,
  createVirtualAnchor,
  getContributorDetailFromResult,
  getContributorName,
  getPointerPosition,
  isContributorSlice,
  isDetailOfContributor,
} from './contributorPersona';

const contributorSliceParams = {
  name: 'octocat',
  data: { name: 'octocat', parentName: 'Individual' },
  event: { event: { clientX: 120, clientY: 240 } },
};

describe('contributorPersona', () => {
  describe('isContributorSlice', () => {
    it('accepts the outer ring that carries the ecological parent name', () => {
      expect(isContributorSlice(contributorSliceParams)).toBe(true);
    });

    it('ignores the inner ecological ring', () => {
      expect(
        isContributorSlice({ name: 'Individual', data: { name: 'Individual' } })
      ).toBe(false);
    });

    it('ignores empty payloads', () => {
      expect(isContributorSlice(undefined)).toBe(false);
      expect(isContributorSlice(null)).toBe(false);
      expect(isContributorSlice({})).toBe(false);
    });
  });

  describe('getContributorName', () => {
    it('prefers the slice data name over the echarts display name', () => {
      expect(getContributorName(contributorSliceParams)).toBe('octocat');
    });

    it('falls back to the display name and then to an empty string', () => {
      expect(getContributorName({ name: 'fallback', data: null })).toBe(
        'fallback'
      );
      expect(getContributorName(undefined)).toBe('');
    });
  });

  describe('getPointerPosition', () => {
    it('reads the native pointer coordinates', () => {
      expect(getPointerPosition(contributorSliceParams)).toEqual({
        x: 120,
        y: 240,
      });
    });

    it('falls back to the canvas relative offsets', () => {
      expect(
        getPointerPosition({ event: { offsetX: 8, offsetY: 9 } })
      ).toEqual({ x: 8, y: 9 });
    });

    it('defaults to the origin when there is no pointer information', () => {
      expect(getPointerPosition(undefined)).toEqual({ x: 0, y: 0 });
      expect(getPointerPosition({ event: { event: null } })).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe('createVirtualAnchor', () => {
    it('anchors the popper on a zero sized rect at the pointer', () => {
      const rect = createVirtualAnchor(12, 34).getBoundingClientRect();
      expect(rect.left).toBe(12);
      expect(rect.top).toBe(34);
      expect(rect.right).toBe(12);
      expect(rect.bottom).toBe(34);
      expect(rect.width).toBe(0);
      expect(rect.height).toBe(0);
    });
  });

  describe('buildContributorDetailVariables', () => {
    const context = {
      label: 'cann',
      level: 'repo',
      beginDate: new Date('2024-01-01T00:00:00.000Z'),
      endDate: new Date('2024-06-01T00:00:00.000Z'),
    };

    it('looks up a single contributor with the contributor filter', () => {
      const variables = buildContributorDetailVariables(context, 'octocat');
      expect(variables.label).toBe('cann');
      expect(variables.level).toBe('repo');
      expect(variables.page).toBe(1);
      expect(variables.per).toBe(1);
      expect(variables.filterOpts).toEqual([
        { type: 'contributor', values: ['octocat'] },
      ]);
    });

    it('keeps the time range so the persona matches the chart range', () => {
      const variables = buildContributorDetailVariables(context, 'octocat');
      expect(variables.beginDate).toBe(context.beginDate);
      expect(variables.endDate).toBe(context.endDate);
    });
  });

  describe('getContributorDetailFromResult', () => {
    const detail = {
      contributor: 'octocat',
      contribution: 10,
      contributionTypeList: [{ contribution: 10, contributionType: 'Code' }],
    };

    it('returns the first item together with the git platform', () => {
      expect(
        getContributorDetailFromResult({
          contributorsDetailList: { items: [detail], origin: 'github' },
        })
      ).toEqual({ detail, origin: 'github' });
    });

    it('returns an empty result while the response is missing', () => {
      expect(getContributorDetailFromResult(undefined)).toEqual({
        detail: null,
        origin: '',
      });
      expect(
        getContributorDetailFromResult({ contributorsDetailList: null })
      ).toEqual({ detail: null, origin: '' });
      expect(
        getContributorDetailFromResult({ contributorsDetailList: { items: [] } })
      ).toEqual({ detail: null, origin: '' });
    });
  });

  describe('isDetailOfContributor', () => {
    it('accepts the detail of the hovered contributor regardless of case', () => {
      expect(isDetailOfContributor({ contributor: 'Octocat' }, 'octocat')).toBe(
        true
      );
    });

    it('rejects the detail of another contributor', () => {
      expect(isDetailOfContributor({ contributor: 'hubot' }, 'octocat')).toBe(
        false
      );
      expect(isDetailOfContributor(null, 'octocat')).toBe(false);
    });

    it('accepts a detail without contributor name', () => {
      expect(isDetailOfContributor({ contribution: 3 }, 'octocat')).toBe(true);
    });
  });
});
