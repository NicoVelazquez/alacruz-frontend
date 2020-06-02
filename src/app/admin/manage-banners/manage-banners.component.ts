import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Banner} from '../../shared/models/banner';
import {BannerService} from '../../shared/services/banner.service';
import {Notification} from '../../shared/notification';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {

  public editBannerForm: FormGroup;
  banners = [];
  selectedBanner: Banner;
  photo: string | ArrayBuffer;
  loading = false;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.editBannerForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.bannerService.getAllBanners().then(banners => this.banners = banners);
    this.editBannerForm.disable();
  }

  selectBanner(banner: any) {
    this.resetForm();
    this.selectedBanner = banner;
    this.editBannerForm.patchValue({name: banner.name});
    this.photo = banner.imageUrl;
    this.editBannerForm.enable();
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

  editBanner() {
    this.selectedBanner.name = this.editBannerForm.value.name;
    if (this.selectedBanner.imageUrl !== this.photo) {
      this.selectedBanner.imageUrl = this.photo.toString();
    }
    this.bannerService.editBanner(this.selectedBanner)
      .then(() => {
        Notification.notify('<span uk-icon="icon: check"></span> Banner edited successfully', 'success');
      })
      .catch(err => {
        console.log(err);
        Notification.notify('<span uk-icon="icon: warning"></span> Banner could not be edited', 'danger');
      });
  }

  deleteBanner() {
    this.bannerService.deleteBanner(this.selectedBanner._id)
      .then(removedBannerId => {
        Notification.notify('<span uk-icon="icon: check"></span> Banner deleted successfully', 'success');
        this.banners = this.banners.filter(e => e._id !== removedBannerId);
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
        Notification.notify('<span uk-icon="icon: warning"></span> Banner could not be deleted', 'danger');
      });
  }

  resetForm() {
    (document.getElementById('form') as HTMLFormElement).reset();
    this.selectedBanner = undefined;
    this.photo = null;
  }

}
