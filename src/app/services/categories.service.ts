import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.interface';

const URL = 'https://fakestoreapi.com/products/';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(URL + 'categories');
  }

  getProductsByCategory(selectedCategroy: string): Observable<Product[]> {
    return this.http.get<Product[]>(URL + 'category/' + selectedCategroy);
  }
}
