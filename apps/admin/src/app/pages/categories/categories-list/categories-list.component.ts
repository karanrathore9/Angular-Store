import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService, Category } from '@angular-monorepo/products';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

const UI_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ToastModule,
  CategoriesFormComponent,
  ConfirmDialogModule,
];
@Component({
  selector: 'admin-categories-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...UI_MODULES],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (res: any) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });

              this._getCategories();
            }
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
      },
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`/categories/form/${categoryId}`);

  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(
      (res: any) => {
        console.log('Categories fetched:', res);
        // Using any type to handle unknown response structure
        if (res && res.data.data) {
          this.categories = res.data.data; // Accessing the `data` property
        } else {
          console.error('Unexpected API response format:', res);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
