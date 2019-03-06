import { CategoryTree } from '../category-tree/category-tree.model';
import { CategoryView, createCategoryView } from '../category-view/category-view.model';
import { VariationProductMaster } from '../product/product-variation-master.model';
import { VariationProduct } from '../product/product-variation.model';
import { Product } from '../product/product.model';

/**
 * View on a {@link Product} with additional methods for default category
 */
export interface ProductView extends Product {
  defaultCategory(): CategoryView;
}

export interface VariationProductView extends VariationProduct {
  defaultCategory(): CategoryView;
}

export interface VariationProductMasterView extends VariationProductMaster {
  defaultCategory(): CategoryView;
}

export function createProductView(
  product: Product,
  tree: CategoryTree
): ProductView | VariationProductView | VariationProductMasterView {
  if (!tree || !product) {
    return;
  }

  return {
    ...product,
    defaultCategory: () =>
      tree.nodes[product.defaultCategoryId] ? createCategoryView(tree, product.defaultCategoryId) : undefined,
  };
}
