import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;

  photo: string | ArrayBuffer;

  loading = false;
  newProduct = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.addProductForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  readUrl(event: any) {
    this.loading = true;
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.photo = (event2.target as FileReader).result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.loading = false;
    }, 500);
  }

  createProduct() {
    const name = this.addProductForm.value.name;
    const imageUrl = this.photo.toString();
    const newProduct = new Product(name, imageUrl);
    this.productService.createProduct(newProduct)
      .then(() => {
        this.newProduct = true;
        this.resetForm();
      });
  }

  resetForm() {
    (document.getElementById('form') as HTMLFormElement).reset();
    this.photo = null;
  }
}
