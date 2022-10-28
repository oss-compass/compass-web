import { colorGenerator } from './color';

describe('color', () => {
  it('colorGenerator', function () {
    const gen = colorGenerator();
    expect(gen('AAA')).toBe('#B8E1FF');
    expect(gen('AAA')).toBe('#3D76DD');
    expect(gen('AAA')).toBe('#085EC0');
    expect(gen('BBB')).toBe('#008A5D');
    expect(gen('BBB')).toBe('#9DF5CA');
  });
});
