import { TestBed } from '@angular/core/testing';

import { CoreStoreModule } from 'ish-core/store/core/core-store.module';
import { makeHttpError } from 'ish-core/utils/dev/api-service-utils';
import { StoreWithSnapshots, provideStoreSnapshots } from 'ish-core/utils/dev/ngrx-testing';

import { Warehouse } from '../../models/warehouse/warehouse.model';
import { InventoryStoreModule } from '../inventory-store.module';

import { loadWarehouses, loadWarehousesFail, loadWarehousesSuccess } from './warehouses.actions';
import {
  getNumberOfWarehouses,
  getWarehouses,
  getWarehousesEntities,
  getWarehousesError,
  getWarehousesLoading,
} from './warehouses.selectors';

describe('Warehouses Selectors', () => {
  let store$: StoreWithSnapshots;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreStoreModule.forTesting(), InventoryStoreModule.forTesting('warehouses')],
      providers: [provideStoreSnapshots()],
    });

    store$ = TestBed.inject(StoreWithSnapshots);
  });

  describe('initial state', () => {
    it('should not be loading when in initial state', () => {
      expect(getWarehousesLoading(store$.state)).toBeFalse();
    });

    it('should not have an error when in initial state', () => {
      expect(getWarehousesError(store$.state)).toBeUndefined();
    });

    it('should not have entities when in initial state', () => {
      expect(getWarehousesEntities(store$.state)).toBeEmpty();
      expect(getWarehouses(store$.state)).toBeEmpty();
      expect(getNumberOfWarehouses(store$.state)).toBe(0);
    });
  });

  describe('loadWarehouses', () => {
    const action = loadWarehouses();

    beforeEach(() => {
      store$.dispatch(action);
    });

    it('should set loading to true', () => {
      expect(getWarehousesLoading(store$.state)).toBeTrue();
    });

    describe('loadWarehousesSuccess', () => {
      const warehouses = [{ id: '1' }, { id: '2' }] as Warehouse[];
      const successAction = loadWarehousesSuccess({ warehouses });

      beforeEach(() => {
        store$.dispatch(successAction);
      });

      it('should set loading to false', () => {
        expect(getWarehousesLoading(store$.state)).toBeFalse();
      });

      it('should not have an error when successfully loaded entities', () => {
        expect(getWarehousesError(store$.state)).toBeUndefined();
      });

      it('should have entities when successfully loading', () => {
        expect(getWarehousesEntities(store$.state)).not.toBeEmpty();
        expect(getWarehouses(store$.state)).not.toBeEmpty();
        expect(getNumberOfWarehouses(store$.state)).toBe(2);
      });
    });

    describe('loadWarehousesFail', () => {
      const error = makeHttpError({ message: 'ERROR' });
      const failAction = loadWarehousesFail({ error });

      beforeEach(() => {
        store$.dispatch(failAction);
      });

      it('should set loading to false', () => {
        expect(getWarehousesLoading(store$.state)).toBeFalse();
      });

      it('should have an error when reducing', () => {
        expect(getWarehousesError(store$.state)).toBeTruthy();
      });

      it('should not have entities when reducing error', () => {
        expect(getWarehousesEntities(store$.state)).toBeEmpty();
        expect(getWarehouses(store$.state)).toBeEmpty();
        expect(getNumberOfWarehouses(store$.state)).toBe(0);
      });
    });
  });
});
