import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';

import { loadWarehouses } from './warehouses.actions';
import { WarehousesEffects } from './warehouses.effects';

describe('Warehouses Effects', () => {
  let actions$: Observable<Action>;
  let effects: WarehousesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehousesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(WarehousesEffects);
  });

  describe('loadWarehouses$', () => {
    it('should not dispatch actions when encountering loadWarehouses', () => {
      const action = loadWarehouses();
      actions$ = hot('-a-a-a', { a: action });
      const expected$ = cold('------');

      expect(effects.loadWarehouses$).toBeObservable(expected$);
    });
  });
});
