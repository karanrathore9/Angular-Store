import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

    constructor(
        private http: HttpClient
    ) {}
  setToken(data:any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
