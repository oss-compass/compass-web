import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';

describe('utils number ', () => {
  it('transHundredMarkSystem', () => {
    expect(transHundredMarkSystem(0.1)).toBe(60);
    expect(transHundredMarkSystem(1)).toBe(100);
    expect(transHundredMarkSystem(0.05)).toBe(30);
    expect(transHundredMarkSystem(0)).toBe(0);
    expect(transHundredMarkSystem(0.5)).toBe(80);
    expect(transHundredMarkSystem(0.7)).toBe(90);
    // expect(transHundredMarkSystem(null)).toBeNull();
  });
});
