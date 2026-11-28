import { constructUrl } from './ParamsTableWithForm';

describe('constructUrl', () => {
  it('preserves false and zero path parameter values', () => {
    expect(constructUrl('/items/{enabled}/{offset}', { enabled: false, offset: 0 })).toBe(
      '/items/false/0'
    );
  });

  it('keeps the placeholder for missing values', () => {
    expect(constructUrl('/items/{id}', {})).toBe('/items/:id');
  });
});
