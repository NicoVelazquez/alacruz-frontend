import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {Notification} from '../../shared/notification';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public editProductForm: FormGroup;
  products = [];
  selectedProduct: Product;
  photo: string | ArrayBuffer;
  loading = false;
  updating = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.editProductForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then(products => this.products = products);
    this.editProductForm.disable();
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.editProductForm.patchValue({name: product.name});
    this.photo = product.imageUrl;
    this.editProductForm.enable();
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

  async editProduct() {
    this.updating = true;
    this.selectedProduct.name = this.editProductForm.value.name;
    if (this.selectedProduct.imageUrl !== this.photo) {
      this.selectedProduct.imageUrl = this.photo.toString();
    }
    await this.productService.editProduct(this.selectedProduct)
      .then(() => {
        this.resetForm();
        Notification.notify('<span uk-icon="icon: check"></span> Product edited successfully', 'success');
      })
      .catch(err => {
        console.log(err);
        Notification.notify(`<span uk-icon="icon: warning"></span> ${err.message}`, 'danger');
      });
    this.updating = false;
  }

  async deleteProduct() {
    this.updating = true;
    await this.productService.deleteProduct(this.selectedProduct._id)
      .then(removedProductId => {
        Notification.notify('<span uk-icon="icon: check"></span> Product deleted successfully', 'success');
        this.products = this.products.filter(e => e._id !== removedProductId);
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
        Notification.notify(`<span uk-icon="icon: warning"></span> ${err.message}`, 'danger');
      });
    this.updating = false;
  }

  resetForm() {
    (document.getElementById('form') as HTMLFormElement).reset();
    this.selectedProduct = undefined;
    this.photo = null;
    this.editProductForm.disable();
  }

  checkboxChanged() {
    this.selectedProduct.featured = !this.selectedProduct.featured;
  }
}

