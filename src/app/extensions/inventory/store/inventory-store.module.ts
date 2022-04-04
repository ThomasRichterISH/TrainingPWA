import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { pick } from 'lodash-es';

import { InventoryState } from './inventory-store';

const inventoryReducers: ActionReducerMap<InventoryState> = {};

const inventoryEffects = [];

// not-dead-code
@NgModule({
  imports: [EffectsModule.forFeature(inventoryEffects), StoreModule.forFeature('inventory', inventoryReducers)],
})
export class InventoryStoreModule {
  static forTesting(...reducers: (keyof ActionReducerMap<InventoryState>)[]) {
    return StoreModule.forFeature('inventory', pick(inventoryReducers, reducers));
  }
}
