import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import {
  CategoriesService,
  OrdersService,
  ProductsService,
  UsersService,
} from '@angular-monorepo/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    RouterModule,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CardModule,
    CategoriesFormComponent,
    HttpClientModule,
    ToastModule,
  ],
  // animations: [BrowserAnimationsModule, NoopAnimationsModule],

  providers: [
    CategoriesService,
    ProductsService,
    MessageService,
    ConfirmationService,
    UsersService,
    OrdersService,
  ],
  selector: 'admin-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'admin';
}
