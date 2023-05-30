import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { Product } from '../models/products.interface';
import { ProductActions } from '../state/actions-types';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CreateProductsActions } from '../state/product.actions';

export interface ProductsState extends EntityState<Product> {
}

export const adapter = createEntityAdapter<Product>({})

export const initialProductsState = adapter.getInitialState({});

// export const reducers: ActionReducerMap<AppState> = {
// };

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductActions.allProductsLoaded, (state, action) => adapter.addMany(action.products, state)),
  on(ProductActions.updateProduct, (state, action) => adapter.updateOne(action.update, state)),
  on(ProductActions.deleteProduct, (state, action) => adapter.removeOne(action.productId, state)),
  on(CreateProductsActions.addNewProductSuccess, (state, action) => {
    console.log(action)
    return adapter.addOne(action.product, state)
  })
)

export const { selectAll } = adapter.getSelectors();