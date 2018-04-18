import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { CategoryData } from '../../../models/category/category.interface';
import { CategoryMapper } from '../../../models/category/category.mapper';
import { Category, CategoryHelper } from '../../../models/category/category.model';

/**
 * The Categories Service handles the interaction with the 'categories' REST API.
 */
@Injectable()
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  /**
   * Get the full Category data for the given unique category ID.
   * @param categoryUniqueId  The unique category id for the category of interest (encodes the category path).
   * @returns                 The Category information.
   */
  getCategory(categoryUniqueId: string): Observable<Category> {
    if (!categoryUniqueId) {
      return ErrorObservable.create('getCategory() called without categoryUniqueId');
    }

    return this.apiService
      .get<CategoryData>(`categories/${CategoryHelper.getCategoryPath(categoryUniqueId)}`, null, null, false)
      .pipe(map(categoryData => CategoryMapper.fromData(categoryData, categoryUniqueId)));
  }

  /**
   * Get the sorted top level categories (e.g. for main navigation creation) with sorted sub categories up to the given depth.
   * @param limit  The number of levels to be returned (depth) in hierarchical view.
   * @returns      A Sorted list of top level categories with sub categories.
   */
  getTopLevelCategories(limit: number): Observable<Category[]> {
    let params = new HttpParams().set('imageView', 'NO-IMAGE');
    if (limit > 0) {
      params = params.set('view', 'tree').set('limit', limit.toString());
    }

    return this.apiService
      .get<CategoryData[]>('categories', params, null, true)
      .pipe(
        map(categoriesData =>
          categoriesData.map(categoryData => CategoryMapper.fromData(categoryData, categoryData.id))
        )
      );
  }
}
