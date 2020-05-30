import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;

  photoFile: File;
  photo: string | ArrayBuffer;

  loading = false;
  newProduct = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.addProductForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.photo = './assets/images/noImageAvailable.png';
  }

  readUrl(event: any) {
    this.loading = true;
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.photoFile = event.target.files[0];
          this.photo = (event2.target as FileReader).result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.loading = false;
    }, 1000);
  }

  createProduct() {
    const formData = new FormData();
    formData.append('image', this.photoFile, this.photoFile.name);
    formData.append('name', this.addProductForm.value.name);
    this.productService.createProduct(formData)
      .then(product => {
        this.newProduct = true;
        this.resetForm();
      });
  }

  resetForm() {
    this.addProductForm.reset();
    this.photoFile = null;
    this.photo = './assets/images/noImageAvailable.png';
  }
}
