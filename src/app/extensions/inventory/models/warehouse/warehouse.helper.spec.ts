import { WarehouseHelper } from './warehouse.helper';
import { Warehouse } from './warehouse.model';

describe('Warehouse Helper', () => {
  describe('equal', () => {
    it.each([
      [false, undefined, undefined],
      [false, { id: 'test' } as Warehouse, undefined],
      [false, undefined, { id: 'test' } as Warehouse],
      [false, { id: 'test' } as Warehouse, { id: 'other' } as Warehouse],
      [true, { id: 'test' } as Warehouse, { id: 'test' } as Warehouse],
    ])(`should return %s when comparing %j and %j`, (expected, o1, o2) => {
      expect(WarehouseHelper.equal(o1, o2)).toEqual(expected);
    });
  });
});
