import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mapErrorToAction } from 'ish-core/utils/operators';
import { EMPTY, Observable } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { WarehouseService } from '../../services/warehouse/warehouse.service';

import { loadWarehouses, loadWarehousesFail, loadWarehousesSuccess } from './warehouses.actions';

@Injectable()
export class WarehousesEffects {
  constructor(private actions$: Actions, private warehouseService: WarehouseService) {}

  loadWarehouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWarehouses),
      mergeMap(() =>  this.warehouseService.getWarehouses().pipe(
      map(warehouses => loadWarehousesSuccess({warehouses })),
      mapErrorToAction(loadWarehousesFail)))
    )
  );
}
