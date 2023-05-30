import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState, selectAll } from "../reducers";

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
    selectProductsState,
    selectAll
)