import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { VariationProductMasterView } from 'ish-core/models/product-view/product-view.model';
import { ProductListContainerComponent } from '../../../../shared/product/containers/product-list/product-list.container';

import { ProductMasterVariationsComponent } from './product-master-variations.component';

describe('Product Master Variations Component', () => {
  let component: ProductMasterVariationsComponent;
  let fixture: ComponentFixture<ProductMasterVariationsComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent(ProductListContainerComponent), ProductMasterVariationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterVariationsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.product = { sku: '123456789' } as VariationProductMasterView;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(element).toMatchInlineSnapshot(`
      <a id="variation-list-top"></a
      ><ish-product-list-container
        mode="paging"
        ng-reflect-mode="paging"
        ng-reflect-fragment-on-routing="variation-list-top"
      ></ish-product-list-container>
    `);
  });

  it('should set the correct id for the underlying product list', () => {
    fixture.detectChanges();
    const productList = fixture.debugElement.query(By.css('ish-product-list-container'))
      .componentInstance as ProductListContainerComponent;

    expect(productList.id).toMatchInlineSnapshot(`
      Object {
        "type": "master",
        "value": "123456789",
      }
    `);
  });
});
