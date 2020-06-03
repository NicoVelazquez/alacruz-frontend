import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
    this.closeSidenav();
  }

  closeSidenav() {
    UIkit.offcanvas('#offcanvas-usage').hide();
  }
}
