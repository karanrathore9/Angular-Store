import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      'http://localhost:8080/api/v1/orders/get-all-orders'
    );
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(
      `http://localhost:8080/api/v1/orders/get-order/${orderId}`
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      'http://localhost:8080/api/v1/orders/create-order',
      order
    );
  }

  updateOrder(
    orderStaus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(
      `http://localhost:8080/api/v1/orders/update-order/${orderId}`,
      orderStaus
    );
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/api/v1/orders/delete-order/${orderId}`
    );
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8080/api/v1/orders/order-count`)
      .pipe(map((objectValue: any) => objectValue.data.totalOrders));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8080/api/v1/orders/total-sales`)
      // .pipe(map((objectValue: any) => objectValue.totalsales.data.totalSales));
  }
}
