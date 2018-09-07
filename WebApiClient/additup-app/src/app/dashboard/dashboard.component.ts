import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IGame } from '../models/game.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() showGameItem: EventEmitter<IGame> = new EventEmitter<IGame>();

  public games: IGame [] = [{
    Title: 'Add It Up',
    UniqueName: 'add_it_up',
    Icon: 'add_circle_outline',
    IsEnabled: true,
    Component: 'AddItUpComponent'
  },
  {
    Title: 'Multiple Madness',
    UniqueName: 'multiple_madness',
    Icon: 'blur_circular',
    IsEnabled: false
  }];
  constructor() { }

  ngOnInit() {
  }

  runGame(selectedGame: IGame) {
    console.log('Run the game = ' + selectedGame.Title);
    this.showGameItem.emit(selectedGame);
  }
}
