import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { HttpError } from 'ish-core/models/http-error/http-error.model';
import { setErrorOn, setLoadingOn, unsetLoadingAndErrorOn } from 'ish-core/utils/ngrx-creators';

import { Warehouse } from '../../models/warehouse/warehouse.model';

import { loadWarehouses, loadWarehousesFail, loadWarehousesSuccess } from './warehouses.actions';

export const warehousesAdapter = createEntityAdapter<Warehouse>({ selectId: warehouse => warehouse.warehouseId });

export interface WarehousesState extends EntityState<Warehouse> {
  loading: boolean;
  error: HttpError;
}

export const initialState: WarehousesState = warehousesAdapter.getInitialState({
  loading: false,
  error: undefined,
});

export const warehousesReducer = createReducer(
  initialState,
  setLoadingOn(loadWarehouses),
  setErrorOn(loadWarehousesFail),
  unsetLoadingAndErrorOn(loadWarehousesSuccess),
  on(loadWarehousesSuccess, (state: WarehousesState,action) => {
    const { warehouses } = action.payload;
    return warehousesAdapter.upsertMany(warehouses, state);})
);
