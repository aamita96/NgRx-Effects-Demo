import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Observable, map, mergeMap, of, tap } from 'rxjs';
import { Product } from '../models/products.interface';
import { LoaderService } from '../services/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCardDialogComponent } from '../edit-card-dialog/edit-card-dialog.component';
import { Store, select } from '@ngrx/store';
import { ProductsState } from '../reducers';
import { deleteProduct, loadAllProducts } from '../state/product.actions';
import { selectAllProducts, selectProductsState } from '../state/products.selector';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // products: Product[] = [];
  products$: Observable<Product[]>;
  filterProducts$: Observable<Product[]>;

  constructor(private productService: ProductsService, private loaderService: LoaderService,
    private modal: NgbModal, private store: Store<ProductsState>, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //  Http Service call Way

    /* this.loaderService.startLoading();
    this.productService.getAllProducts().subscribe(response => {
      this.products = response;
      this.loaderService.stopLoading();
    }); */

    // NgRx Effects Way
    this.store.dispatch(loadAllProducts());

    this.products$ = this.store.pipe(select(selectAllProducts));
    this.filterProducts$ = this.activatedRoute.queryParams.pipe(
      mergeMap(({ category }) => this.filterByCategory(category != 'All' ? category : ''))
    );
  }

  filterByCategory(category: any) {
    return category ? this.products$.pipe(map(products => products.filter(product => product.category.toUpperCase() === category.toUpperCase()))) : this.products$;
  }

  createProduct() {
    const modalRef = this.modal.open(EditCardDialogComponent);
    modalRef.componentInstance.mode = 'create';
    modalRef.result.then(product => {
      // this.products.push(product);
    })
  }

  editProduct(product: Product) {
    console.log(product)
    const modalRef = this.modal.open(EditCardDialogComponent);
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.mode = 'update';

    // Http Service Way
    /* modalRef.result.then((updateProduct: Product) => {
      this.products = this.products.map(product => {
        if (product.id === updateProduct.id) {
          product = updateProduct;
        }
        return product;
      });
    }) */
  }

  deleteProduct(product: Product) {

    // NgRx Effect Way
    this.store.dispatch(deleteProduct({ productId: product.id }));

    // Http Service Way
    /* this.productService.deleteProduct(product.id).subscribe(res => {
      // this.products = this.products.filter(prod => prod.id !== product.id);
    }) */
  }
}
