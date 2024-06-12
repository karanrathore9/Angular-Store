import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService, ProductsService } from '@angular-monorepo/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

const UI_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
];
@Component({
  selector: 'admin-products-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...UI_MODULES],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  catagories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  onCancle() {
    this.location.back();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
      console.log(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.productForm['image'].setValue(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories: any) => {
      console.log('Categories fetched:', categories.data.data);
      this.catagories = categories.data.data;
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService
          .getProductById(params['id'])
          .subscribe((product: any) => {
            const productData = product.data;

            // Set form values from the fetched product
            this.productForm['name'].setValue(productData.name);
            this.productForm['category'].setValue(productData.category._id);
            this.productForm['brand'].setValue(productData.brand);
            this.productForm['price'].setValue(productData.price);
            this.productForm['countInStock'].setValue(productData.countInStock);
            this.productForm['isFeatured'].setValue(productData.isFeatured); // Correct typo here
            this.productForm['description'].setValue(productData.description);
            this.productForm['richDescription'].setValue(
              productData.richDescription
            );

            // Assign the image URL to imageDisplay
            this.imageDisplay = productData.image; // Ensure this is a valid URL

            // Handle image form control specifically for edit mode
            // If image is already present, it shouldn't be required
            this.productForm['image'].setValidators([]);
            this.productForm['image'].updateValueAndValidity();
          });
      }
    });
  }
  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
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

  private _updateProduct(productFormData: FormData) {
    console.log(productFormData);
    this.productsService
      .updateProduct(this.currentProductId, productFormData)
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
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        }
      );
  }
}
