import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WarehouseService } from '../services/warehouse/warehouse.service';
import { loadWarehouses } from '../store/warehouses/warehouses.actions';
import { getWarehouses } from '../store/warehouses/warehouses.selectors';
@Injectable({ providedIn: 'root' })
export class WarehousesFacade {
constructor(private store: Store) {}
warehouses$() {
  this.loadWarehouses();
  return this.store.pipe(select(getWarehouses));
  }
  private loadWarehouses() {
  this.store.dispatch(loadWarehouses());
  }}
