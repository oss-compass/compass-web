import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';

describe('utils number ', () => {
  it('transMarkingSystem', () => {
    expect(transMarkingSystem(0.1)).toBe(60);
    expect(transMarkingSystem(1)).toBe(100);
    expect(transMarkingSystem(0.05)).toBe(30);
    expect(transMarkingSystem(0)).toBe(0);
    expect(transMarkingSystem(0.5)).toBe(80);
    expect(transMarkingSystem(0.7)).toBe(90);
    // expect(transMarkingSystem(null)).toBeNull();
  });
});
