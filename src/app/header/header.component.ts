import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../state/categories.selector';
import { loadAllProducts } from '../state/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories$: Observable<string[]>;
  // categories: string[];
  constructor(private categoriesService: CategoriesService, private router: Router, private store: Store) { }

  ngOnInit() {
    // Http Service Call Way

    // this.categories$ = this.categoriesService.getCategories();
    // this.categoriesService.getCategories().subscribe(categories => {
    //   this.categories = categories;
    //   this.loaderService.stopLoading();
    // });

    // NgRx Effects Way
    this.categories$ = this.store.select(selectAllCategories);
  }

  selectCategory(category: string) {
    // Angular Way
    this.router.navigate([''], { queryParams: { category } })

    // Http service way

    /* this.loaderService.startLoading();
    if (category === 'All') {
      this.ngOnInit();
    } else {
      this.categoriesService.getProductsByCategory(category).subscribe(() => {
        this.loaderService.stopLoading();
      });
    } */
  }
}
