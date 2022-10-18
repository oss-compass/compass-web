import { colorGenerator } from './color';

describe('color', () => {
  it('colorGenerator', function () {
    const gen = colorGenerator();
    expect(gen('AAA')).toBe('#5470c6');
    expect(gen('AAA')).toBe('#3854A9');
    expect(gen('AAA')).toBe('#2A3F7F');
    expect(gen('BBB')).toBe('#91cc75');
    expect(gen('BBB')).toBe('#6CBB46');
  });
});
