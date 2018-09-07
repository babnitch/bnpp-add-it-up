import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
