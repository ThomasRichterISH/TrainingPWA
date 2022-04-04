import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { getInventoryState } from '../store/inventory-store';

// tslint:disable:member-ordering
@Injectable({ providedIn: 'root' })
export class InventoryFacade {
  constructor(private store: Store) {}

  /**
   * example for debugging
   */
  inventoryState$ = this.store.pipe(select(getInventoryState));
}
