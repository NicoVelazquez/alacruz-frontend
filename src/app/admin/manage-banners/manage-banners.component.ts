import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Banner} from '../../shared/models/banner';
import {BannerService} from '../../shared/services/banner.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {

  public editBannerForm: FormGroup;

  banners = [];
  selectedBanner: Banner;

  photoFile: File;
  photo: string | ArrayBuffer;
  photoName = 'Select File';

  loading = false;
  editedBanner = false;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.editBannerForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.photo = './assets/images/noImageAvailable.png';
    this.bannerService.getAllBanners().then(banners => this.banners = banners);

    this.editBannerForm.disable();
  }

  selectBanner(banner: any) {
    this.selectedBanner = banner;
    this.editBannerForm.patchValue({name: banner.name});
    this.photo = environment.apiUrl + banner.imageUrl;
    this.photoName = banner.imageUrl.split('@')[1];
    this.editBannerForm.enable();
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

  editBanner() {
    const formData = new FormData();
    if (this.photoFile) {
      formData.append('image', this.photoFile, this.photoFile.name);
    }
    formData.append('id', this.selectedBanner._id);
    formData.append('name', this.editBannerForm.value.name);
    this.bannerService.editBanner(formData)
      .then(() => {
        this.editedBanner = true;
      });
  }

  deleteBanner() {
    this.bannerService.deleteBanner(this.selectedBanner._id)
      .then(removedBannerId => {
        this.banners = this.banners.filter(e => e._id !== removedBannerId);
        this.resetForm();
      });
  }

  resetForm() {
    this.selectedBanner = undefined;
    this.editBannerForm.reset();
    this.photoFile = null;
    this.photo = './assets/images/noImageAvailable.png';
    this.photoName = 'Select File';
  }

}
