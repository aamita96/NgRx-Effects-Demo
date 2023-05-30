import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.interface';


const URL = 'https://fakestoreapi.com/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  addNewProduct(newProudctInfo: Product): Observable<Product> {
    return this.http.post<Product>(URL, newProudctInfo);
  }

  updateProduct(id: number | string, product: Partial<Product>){
    return this.http.put<Product>(URL + id, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(URL + productId);
  }

}
