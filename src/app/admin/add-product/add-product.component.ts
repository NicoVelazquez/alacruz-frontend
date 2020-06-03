import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {Notification} from '../../shared/notification';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;
  photo: string | ArrayBuffer;
  loading = false;
  creating = false;
  isFeatured = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.addProductForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  checkboxChanged() {
    this.isFeatured = !this.isFeatured;
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

  async createProduct() {
    this.creating = true;
    const name = this.addProductForm.value.name;
    const imageUrl = this.photo.toString();
    const featured = this.isFeatured;
    const newProduct = new Product(name, imageUrl, featured);
    await this.productService.createProduct(newProduct)
      .then(() => {
        Notification.notify('<span uk-icon="icon: check"></span> Product created successfully', 'success');
        this.resetForm();

      })
      .catch(err => {
        console.log(err);
        Notification.notify('<span uk-icon="icon: warning"></span> Product could not be created', 'danger');
      });
    this.creating = false;
  }

  resetForm() {
    (document.getElementById('form') as HTMLFormElement).reset();
    this.photo = null;
    this.isFeatured = false;
  }
}
