import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesPageComponent } from './warehouses-page.component';

describe('Warehouses Page Component', () => {
  let component: WarehousesPageComponent;
  let fixture: ComponentFixture<WarehousesPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehousesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
