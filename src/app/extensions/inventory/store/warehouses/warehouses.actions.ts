import { createAction } from '@ngrx/store';

import { httpError, payload } from 'ish-core/utils/ngrx-creators';

import { Warehouse } from '../../models/warehouse/warehouse.model';

export const loadWarehouses = createAction('[Warehouses] Load Warehouses');

export const loadWarehousesFail = createAction('[Warehouses API] Load Warehouses Fail', httpError());

export const loadWarehousesSuccess = createAction(
  '[Warehouses API] Load Warehouses Success',
  payload<{ warehouses: Warehouse[] }>()
);
