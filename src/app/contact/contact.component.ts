import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  sendMail() {

  }
}
