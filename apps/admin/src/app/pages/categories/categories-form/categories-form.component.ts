import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ColorPickerModule } from 'primeng/colorpicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService, Category } from '@angular-monorepo/products';
import { timer } from 'rxjs';

const UI_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ColorPickerModule,
];

@Component({
  selector: 'admin-categories-form',
  standalone: true,
  imports: [
    CommonModule,
    ...UI_MODULES,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css',
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this._checkEditMode();
  }

  onCancle() {
    this.location.back();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

    console.log(this.categoryForm['name'].value);
    console.log(this.categoryForm['icon'].value);
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params['id']) {
        this.currentCategoryId = params['id'];
        console.log(params['id'], '+++______++++_____');
        this.editMode = true;
        this.categoriesService
          .getCategoryById(params['id'])
          .subscribe((category: any) => {
            this.categoryForm['name'].setValue(category.data.name);
            this.categoryForm['icon'].setValue(category.data.icon);
            this.categoryForm['color'].setValue(category.data.color);
          });
      }
    });
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(this.currentCategoryId, category)
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            timer(2000)
              .toPromise()
              .then(() => {
                this.location.back();
              });
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        }
      );
  }
}
