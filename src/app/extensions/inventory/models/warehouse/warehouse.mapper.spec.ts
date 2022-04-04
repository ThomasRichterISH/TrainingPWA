import { TestBed } from '@angular/core/testing';

import { WarehouseData } from './warehouse.interface';
import { WarehouseMapper } from './warehouse.mapper';

describe('Warehouse Mapper', () => {
  let warehouseMapper: WarehouseMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    warehouseMapper = TestBed.inject(WarehouseMapper);
  });

  describe('fromData', () => {
    it('should throw when input is falsy', () => {
      expect(() => warehouseMapper.fromData(undefined)).toThrow();
    });

    it('should map incoming data to model data', () => {
      const data: WarehouseData = {
        incomingField: 'test',
        otherField: false,
      };
      const mapped = warehouseMapper.fromData(data);
      expect(mapped).toHaveProperty('id', 'test');
      expect(mapped).not.toHaveProperty('otherField');
    });
  });
});
