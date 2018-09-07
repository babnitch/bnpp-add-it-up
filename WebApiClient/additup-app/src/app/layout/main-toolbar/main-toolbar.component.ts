import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent {
  public title = 'BNP Add It Up Demo';
  public mainIcon = 'menu';

  @Input() sidenav: MatSidenav;
  @Output() showSideNavControl: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  public showSideNav() {
    console.log('showing side nave from toolbar');
    this.sidenav.toggle();
    this.showSideNavControl.emit();
  }
}
