import { parsePage, parsePageSize } from './pagination';

describe('parsePage', () => {
  it('defaults to the first page for missing or non-numeric values', () => {
    expect(parsePage(undefined)).toBe(1);
    expect(parsePage('')).toBe(1);
    expect(parsePage('abc')).toBe(1);
    expect(parsePage(NaN)).toBe(1);
    expect(parsePage(['2', '3'])).toBe(1);
  });

  it('treats zero and negative values as the first page', () => {
    expect(parsePage('0')).toBe(1);
    expect(parsePage('-4')).toBe(1);
  });

  it('floors a fractional page', () => {
    expect(parsePage('2.7')).toBe(2);
    expect(parsePage('3')).toBe(3);
  });
});

describe('parsePageSize', () => {
  it('defaults for missing or non-numeric values', () => {
    expect(parsePageSize(undefined)).toBe(10);
    expect(parsePageSize('abc')).toBe(10);
    expect(parsePageSize('0')).toBe(10);
    expect(parsePageSize('-1')).toBe(10);
  });

  it('caps the page size and floors fractions', () => {
    expect(parsePageSize('250')).toBe(100);
    expect(parsePageSize('25.9')).toBe(25);
    expect(parsePageSize('7')).toBe(7);
  });
});
