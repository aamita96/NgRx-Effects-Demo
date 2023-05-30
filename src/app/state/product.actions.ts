import { createAction, createActionGroup, props } from "@ngrx/store";
import { Product } from "../models/products.interface";
import { Update } from "@ngrx/entity";

export const loadAllProducts = createAction(
    '[Products Page] Load All Products'
);

export const allProductsLoaded = createAction(
    '[Load Products Effect] All Products Loaded',
    props<{ products: Product[] }>()
);

export const updateProduct = createAction(
    '[Edit Card Dialog] Product Updated',
    props<{ update: Update<Product> }>()
);

export const deleteProduct = createAction(
    '[Products Page ] Delete Product',
    props<{ productId: number }>()
);

export const CreateProductsActions = createActionGroup({
    source: 'Edit Card Dialog',
    events: {
        'Create Product': props<{ product: Product }>(),
        'Add New Product Success': props<{ product: Product }>(),
        'Add New Product Error': props<{ error: any }>(),
    }
});

// ------------------- OR -------------------------------
// export const createProduct = createAction(
//     '[Edit Card Dialog] Create Product',
//     props<{ product: Product }>()
// );
// export const addNewProductSuccess = createAction(
//     '[Edit Card Dialog] Add New Product Success',
//     props<{ product: Product }>()
// );
// export const addNewProductError = createAction(
//     '[Edit Card Dialog] Add New Product Error',
//     props<{ error: any }>()
// );