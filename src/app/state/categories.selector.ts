import { createSelector } from "@ngrx/store";
import { selectAllProducts } from "./products.selector";

export const selectAllCategories = createSelector(
    selectAllProducts,
    products => products.reduce((result: string[], product) => {
        if (result.indexOf(product.category) < 0)
            result.push(product.category)
        return result;
    }, [])
);