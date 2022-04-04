import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryModule } from '../../inventory.module';

import { WarehousesPageComponent } from './warehouses-page.component';

const warehousesPageRoutes: Routes = [{ path: '', component: WarehousesPageComponent }];

@NgModule({
  imports: [InventoryModule, RouterModule.forChild(warehousesPageRoutes)],
  declarations: [WarehousesPageComponent],
})
export class WarehousesPageModule {}
