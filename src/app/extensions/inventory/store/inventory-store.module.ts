import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { pick } from 'lodash-es';

import { InventoryState } from './inventory-store';
import { WarehousesEffects } from './warehouses/warehouses.effects';
import { warehousesReducer } from './warehouses/warehouses.reducer';

const inventoryReducers: ActionReducerMap<InventoryState> = { warehouses: warehousesReducer };

const inventoryEffects = [WarehousesEffects];

// not-dead-code
@NgModule({
  imports: [EffectsModule.forFeature(inventoryEffects), StoreModule.forFeature('inventory', inventoryReducers)],
})
export class InventoryStoreModule {
  static forTesting(...reducers: (keyof ActionReducerMap<InventoryState>)[]) {
    return StoreModule.forFeature('inventory', pick(inventoryReducers, reducers));
  }
}
