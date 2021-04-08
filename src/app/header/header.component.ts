import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public scrollActivated: boolean;

  @HostListener('window: scroll')
  onScroll() {
    const top: number = document.documentElement.scrollTop;
    if (top === 0) {
      return this.scrollActivated = false;
    }
    if (top > 100) {
      return this.scrollActivated = true;
    }
  }

  constructor(public authService: AuthService) {
    this.scrollActivated = false;
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
