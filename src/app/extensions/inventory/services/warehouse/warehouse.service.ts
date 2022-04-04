import { Injectable } from '@angular/core';

import { ApiService, unpackEnvelope } from 'ish-core/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WarehouseData } from '../../models/warehouse/warehouse.interface';
import { WarehouseMapper } from '../../models/warehouse/warehouse.mapper';
import { Warehouse } from '../../models/warehouse/warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  constructor(private apiService: ApiService, private warehouseMapper: WarehouseMapper) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.apiService.get('warehouses').pipe(
      unpackEnvelope(),
      this.apiService.resolveLinks<WarehouseData>(),
      map(warehouseElements => warehouseElements.map(warehouseElement => this.warehouseMapper.fromData(warehouseElement)))
    );
  }
}
