import { Warehouse } from './warehouse.model';

export class WarehouseHelper {
  static equal(warehouse1: Warehouse, warehouse2: Warehouse): boolean {
    return !!warehouse1 && !!warehouse2 && warehouse1.warehouseId === warehouse2.warehouseId;
  }
}
