import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { UsersService, ProductsService, OrdersService } from '@angular-monorepo/products';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalOrders =0;
  totalSales =0;
  totalUsers =0;
  totalProducts =0;
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    // Fetch and assign the data from services
    this.ordersService.getOrdersCount().subscribe(
      (value: number) => (this.totalOrders = value), // Assuming the service returns a number
      (error) => console.error('Error fetching Orders Count:', error)
    );

    this.productService.getProductsCount().subscribe(
      (value: any) => (this.totalProducts = value.data), // Adjust according to the actual data structure
      (error) => console.error('Error fetching Products Count:', error)
    );

    this.userService.getUsersCount().subscribe(
      (value: any) => (this.totalUsers = value.data), // Adjust according to the actual data structure
      (error) => console.error('Error fetching Users Count:', error)
    );

    this.ordersService.getTotalSales().subscribe(
      (value: any) => (this.totalSales = value.data.totalSales), // Adjust according to the actual data structure
      (error) => console.error('Error fetching Total Sales:', error)
    );
  }
}
