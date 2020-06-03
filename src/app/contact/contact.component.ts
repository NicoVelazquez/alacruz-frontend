import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Notification} from '../shared/notification';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.contactForm = fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  sendMail() {
    const name = this.contactForm.value.name;
    const email = this.contactForm.value.email;
    const message = this.contactForm.value.message;
    this.authService.sendMail({name, email, message}).then(() => {
      Notification.notify('Email sent successfully', 'success');
      this.contactForm.reset();
    }).catch(err => {
      Notification.notify('Email could not be sent', 'danger');
      this.contactForm.reset();
    });
  }
}
