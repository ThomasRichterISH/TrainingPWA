import { Injectable } from '@angular/core';

import { WarehouseData } from './warehouse.interface';
import { Warehouse } from './warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseMapper {
  fromData(warehouseData: WarehouseData): Warehouse {
    if (warehouseData) {
      return {
        warehouseId: warehouseData.name,
        warehouseLocation: warehouseData.location,
        warehouseDescription: warehouseData.description,
        warehouseCapacity: warehouseData.capacity,
      };
    } else {
      throw new Error(`warehouseData is required`);
    }
  }
}
