import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'http://localhost:8080/api/v1/users/get-all-users'
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      `http://localhost:8080/api/v1/users/user/${userId}`
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8080/api/v1/users/add-user',
      user
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `http://localhost:8080/api/v1/users/update-user/${user.id}`,
      user
    );
  }

  deleteUser(userId: string): Observable<any> {
    
    return this.http.delete<any>(
      `http://localhost:8080/api/v1/users/delete-user/${userId}`
    );
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8080/api/v1/users/users-count`)
      // .pipe(map((objectValue: any) => objectValue.userCount.data));
  }
}
