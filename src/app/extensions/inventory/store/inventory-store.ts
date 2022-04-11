import { createFeatureSelector } from '@ngrx/store';

import { WarehousesState } from './warehouses/warehouses.reducer';

export interface InventoryState {
  warehouses: WarehousesState;
}

export const getInventoryState = createFeatureSelector<InventoryState>('inventory');
