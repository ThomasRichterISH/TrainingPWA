import { createSelector } from '@ngrx/store';

import { getInventoryState } from '../inventory-store';

import { initialState, warehousesAdapter } from './warehouses.reducer';

const getWarehousesState = createSelector(getInventoryState, state => (state ? state.warehouses : initialState));

export const getWarehousesLoading = createSelector(getWarehousesState, state => state.loading);

export const getWarehousesError = createSelector(getWarehousesState, state => state.error);

export const {
  selectEntities: getWarehousesEntities,
  selectAll: getWarehouses,
  selectTotal: getNumberOfWarehouses,
} = warehousesAdapter.getSelectors(getWarehousesState);
