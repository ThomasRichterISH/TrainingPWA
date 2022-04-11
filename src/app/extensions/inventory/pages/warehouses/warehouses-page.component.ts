import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WarehousesFacade } from '../../facades/warehouses.facade';
import { Warehouse } from '../../models/warehouse/warehouse.model';

@Component({
  selector: 'ish-warehouses-page',
  templateUrl: './warehouses-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehousesPageComponent implements OnInit{
warehouses$: Observable<Warehouse[]>;
constructor(private warehousesFacade: WarehousesFacade){}

ngOnInit() {
  this.warehouses$ = this.warehousesFacade.warehouses$();

}

}
