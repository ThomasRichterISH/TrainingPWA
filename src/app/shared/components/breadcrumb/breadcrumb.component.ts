import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../models/category/category.model';
import { Product } from '../../../models/product/product.model';

@Component({
  selector: 'ish-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() separator = '/';
  @Input() showHome = true;
  @Input() category: Category; // TODO: the category is not used for now, but should be used instead of the categoryPath once it includes the category path itself
  @Input() categoryPath: Category[]; // TODO: only category should be needed as input once the REST call returns the categoryPath as part of the category
  @Input() product: Product;
  @Input() searchTerm: string;
  @Input() account: boolean;
  @Input() trailText: string;
}
