import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BannerService} from '../../shared/services/banner.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {

  public addBannerForm: FormGroup;

  photoFile: File;
  photo: string | ArrayBuffer;

  loading = false;
  newBanner = false;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.addBannerForm = fb.group({
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

  createBanner() {
    const formData = new FormData();
    formData.append('image', this.photoFile, this.photoFile.name);
    formData.append('name', this.addBannerForm.value.name);
    this.bannerService.createBanner(formData)
      .then(banner => {
        this.newBanner = true;
        this.resetForm();
      });
  }

  resetForm() {
    this.addBannerForm.reset();
    this.photoFile = null;
    this.photo = './assets/images/noImageAvailable.png';
  }
}
