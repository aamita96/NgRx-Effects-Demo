import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/products.interface';
import { ProductsService } from '../services/products.service';
import { Update } from "@ngrx/entity";
import { ProductsState } from '../reducers';
import { Store } from '@ngrx/store';
import { CreateProductsActions, updateProduct } from '../state/product.actions';

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.css']
})
export class EditCardDialogComponent {
  appMode: 'update' | 'create';

  @Input() product: Product;

  @Input()
  public set mode(val: 'update' | 'create') {
    this.appMode = val;
    if (val === 'update') {
      this.productForm.patchValue({ ...this.product })
    }
  };

  productForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private productService: ProductsService,
    private store: Store<ProductsState>) {
    const formControls = {
      title: [''],
      price: [''],
      description: [''],
      image: [''],
      category: ['']
    };

    this.productForm = this.fb.group(formControls);
  }

  onSave() {
    const product = {
      ...this.productForm.value
    }

    if (this.appMode === 'create') {
      // NgRx way
      this.store.dispatch(CreateProductsActions.createProduct({ product }));

      //  Http service way

      // this.productService.addNewProduct().subscribe((response) => {
      //   console.log(response)
      // });
      this.activeModal.close();
    } else {
      // NgRx Effect Way
      const update: Update<Product> = {
        id: this.product.id,
        changes: product
      }
      this.store.dispatch(updateProduct({ update }));
      this.activeModal.close();

      // Http Service Way
      // this.productService.updateProduct(udpatedProduct).subscribe((response) => {
      // });

    }

  }
}
