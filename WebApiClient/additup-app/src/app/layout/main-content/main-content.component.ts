import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ComponentHelper } from '../../helpers/components.helper';
import { AddItUpComponent } from '../../add-it-up/add-it-up.component';
import { IGame } from '../../models/game.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  public showAddItUp = false;
  @ViewChild('tabGroup')
  tabGroup: MatTabGroup;
  @ViewChild('gameItemsContainer', { read: ViewContainerRef })
  container;
  public currentGameItem: IGame;
  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  showGameItem($event: IGame) {
    console.log('From dashboard run' + $event.Title);
    ComponentHelper.createComponent(
      AddItUpComponent,
      this.resolver,
      this.container
    );

    setTimeout(() => {
      this.currentGameItem = $event;
      this.tabGroup.selectedIndex = 1;
    }, 100);
  }
}
