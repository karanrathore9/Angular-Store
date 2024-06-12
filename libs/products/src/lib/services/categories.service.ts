import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiURLUsers = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ data: Category[] }> {
    return this.http
      .get<Category[]>(`${this.apiURLUsers}`)
      .pipe(
        map((categories) => ({ data: categories })) // Wrapping the array in an object with a `data` property
      );
  }
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `http://localhost:8080/api/v1/categories/category/${categoryId}`
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://localhost:8080/api/v1/categories/add-category',
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    console.log(categoryId);
    return this.http.delete<any>(
      `http://localhost:8080/api/v1/categories/delete-category/${categoryId}`
    );
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `http://localhost:8080/api/v1/categories/update-catagory/${categoryId}`,
      category
    );
  }
}
