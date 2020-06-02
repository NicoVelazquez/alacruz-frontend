import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BannerService} from '../../shared/services/banner.service';
import {Banner} from '../../shared/models/banner';
import {Notification} from '../../shared/notification';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {

  public addBannerForm: FormGroup;
  photo: string | ArrayBuffer;
  loading = false;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.addBannerForm = fb.group({
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

  createBanner() {
    const name = this.addBannerForm.value.name;
    const imageUrl = this.photo.toString();
    const newBanner = new Banner(name, imageUrl);
    this.bannerService.createBanner(newBanner)
      .then(() => {
        Notification.notify('<span uk-icon="icon: check"></span> Banner created successfully', 'success');
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
        Notification.notify('<span uk-icon="icon: check"></span> Banner could not be created', 'danger');
      });
  }

  resetForm() {
    (document.getElementById('form') as HTMLFormElement).reset();
    this.photo = null;
  }
}
