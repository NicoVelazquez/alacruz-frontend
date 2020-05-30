import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {environment} from '../../../environments/environment';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public editProductForm: FormGroup;

  products = [];
  selectedProduct: Product;

  photoFile: File;
  photo: string | ArrayBuffer;
  photoName = 'Select File';

  loading = false;
  editedProduct = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.editProductForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.photo = './assets/images/noImageAvailable.png';
    this.productService.getAllProducts().then(products => this.products = products);

    this.editProductForm.disable();
  }

  selectProduct(product: any) {
    console.log(product);
    this.selectedProduct = product;
    this.editProductForm.patchValue({name: product.name});
    this.photo = environment.apiUrl + product.imageUrl;
    console.log(this.photo);
    this.photoName = product.imageUrl.split('@')[1];
    this.editProductForm.enable();
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

  editProduct() {
    const formData = new FormData();
    if (this.photoFile) {
      formData.append('image', this.photoFile, this.photoFile.name);
    }
    formData.append('id', this.selectedProduct._id);
    formData.append('name', this.editProductForm.value.name);
    this.productService.editProduct(formData)
      .then(() => {
        this.editedProduct = true;
      });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.selectedProduct._id)
      .then(removedProductId => {
        this.products = this.products.filter(e => e._id !== removedProductId);
        this.resetForm();
      });
  }

  resetForm() {
    this.selectedProduct = undefined;
    this.editProductForm.reset();
    this.photoFile = null;
    this.photo = './assets/images/noImageAvailable.png';
    this.photoName = 'Select File';
  }

}

