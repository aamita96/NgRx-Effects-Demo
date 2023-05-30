import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../services/products.service";
import { ProductActions } from "./actions-types";
import { catchError, concatMap, map, of } from "rxjs";
import { Product } from "../models/products.interface";
import { CreateProductsActions } from "./product.actions";


@Injectable()
export class ProductsEffects {
    constructor(private action$: Actions, private productsService: ProductsService) { }

    loadProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.loadAllProducts),
            concatMap(action => this.productsService.getAllProducts()),
            map(products => ProductActions.allProductsLoaded({ products }))
        )
    );

    updateProduct$ = createEffect(
        () => this.action$.pipe(
            ofType(ProductActions.updateProduct),
            concatMap(action => this.productsService.updateProduct(action.update.id, action.update.changes))
        ), {
        dispatch: false
    });

    deleteProduct$ = createEffect(
        () => this.action$.pipe(
            ofType(ProductActions.deleteProduct),
            concatMap(action => this.productsService.deleteProduct(action.productId))
        ), {
        dispatch: false
    });

    saveProduct$ = createEffect(
        () => this.action$.pipe(
            ofType(CreateProductsActions.createProduct),
            concatMap(action => this.productsService.addNewProduct(action.product)),
            map((product: Product) => CreateProductsActions.addNewProductSuccess({ product })),
            // map((product: Product) => ProductActions.addNewProductSuccess({ product })),
            catchError(error => of(CreateProductsActions.addNewProductError({ error })))
        )
    );
}