import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ data: any }> {
    return this.http.get<any>('http://localhost:8080/api/v1/products').pipe(
      map((products) => ({ data: products })) // Wrapping the array in an object with a `data` property
    );
  }
  getProductById(productId: string): Observable<Product> {
    console.log(productId);
    return this.http.get<Product>(
      `http://localhost:8080/api/v1/products/product/${productId}`
    );
  }

  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/v1/products/add-product',
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/api/v1/products/delete-product/${productId}`
    );
  }

  updateProduct(productId: string, product: any): Observable<Product> {
    console.log(product);
    return this.http.put<Product>(
      `http://localhost:8080/api/v1/products/update-product/${productId}`,
      product
    );
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8080/api/v1/products/count`)
      // .pipe(map((objectValue: any) => objectValue.productCount.data));
  }
}
