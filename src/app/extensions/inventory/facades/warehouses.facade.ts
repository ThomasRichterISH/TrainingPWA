import { Injectable } from '@angular/core';
import { WarehouseService } from '../services/warehouse/warehouse.service';
@Injectable({ providedIn: 'root' })
export class WarehousesFacade {
constructor(private warehouseService: WarehouseService) {}
getWarehouses$ = this.warehouseService.getWarehouses();}
