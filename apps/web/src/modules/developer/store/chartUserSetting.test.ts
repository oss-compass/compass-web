describe('chart user setting storage', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
  });

  it('keeps analyze and developer settings in separate storage entries', () => {
    localStorage.setItem(
      'analyze.setting.chart',
      JSON.stringify({ showAvg: true })
    );
    localStorage.setItem(
      'developer.setting.chart',
      JSON.stringify({ showAvg: false })
    );

    jest.isolateModules(() => {
      const analyze = require('@modules/analyze/store/chartUserSetting');
      const developer = require('@modules/developer/store/chartUserSetting');

      expect(analyze.chartUserSettingState.showAvg).toBe(true);
      expect(developer.chartUserSettingState.showAvg).toBe(false);
    });
  });
});
