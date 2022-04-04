import { createFeatureSelector } from '@ngrx/store';

export interface InventoryState {}

export const getInventoryState = createFeatureSelector<InventoryState>('inventory');
