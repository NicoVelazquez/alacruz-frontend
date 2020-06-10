import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup;
  public showPass: boolean;
  invalidEmailOrPassword = false;
  invalidToken = false;
  returnUrl: string;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, route: ActivatedRoute) {
    this.signInForm = fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    const params = route.snapshot.queryParams;
    if (params.returnUrl) {
      this.invalidToken = true;
      this.returnUrl = params.returnUrl;
    }
  }

  ngOnInit(): void {
    this.showPass = false;

    this.signInForm.get('email').valueChanges.subscribe(() => {
      this.invalidEmailOrPassword = false;
    });

    this.signInForm.get('password').valueChanges.subscribe(() => {
      this.invalidEmailOrPassword = false;
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  signIn() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).then(() => {
      this.signInForm.reset();
      if (this.invalidToken) {
        return this.router.navigate([this.returnUrl]);
      }
      this.router.navigate(['']);
    }).catch(err => {
      if (err === 'invalid credentials') {
        this.invalidEmailOrPassword = true;
      } else {
        console.log(err);
      }
    });
  }
}
