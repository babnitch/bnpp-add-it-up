import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { QuestionComponent } from './question.component';
import {IAnswer, IExercise} from '../models/exercise.mode';

@Component({
  selector: 'app-add-it-up',
  templateUrl: './add-it-up.component.html',
  styleUrls: ['./add-it-up.component.css']
})
export class AddItUpComponent {
  public playingGame = false;
  public restartGame = false;
  public currentQuestionAnswer: IAnswer;
  public questionsWithAnswers: IAnswer[] = [];

  constructor(private dataService: DataService) {}

  restartNewGame(): void {
    console.log('restart the next question');
    this.restartGame = false;
    this.playingGame = true;
    this.questionsWithAnswers = [];

    // if the user has selected to restart the game
    this.startNewGame();
  }

  startNewGame(): void {
    this.playingGame = true;

    // get initial question from service (Angular service so will clean up subscription)
    const initialExerciseStream: Observable<IExercise> = this.dataService.getInitialExercise();
    initialExerciseStream.subscribe(
      x => {
        this.showQuestionComponent(x);
      },
      err => {
        // display error getting exercise on screen; allow retry or restart option
      }
    );
  }

  moveToNextQuestion($event: QuestionComponent) {
    console.log('getting the next question');

    const answerToQuestion = $event.questionAnswer;

    // post the current answer this.currentQuestionAnswer to service
    const nextExerciseStream: Observable<IExercise> = this.dataService.getNextExercise(answerToQuestion);
    nextExerciseStream.subscribe(
      x => {
        if (x.currentStatus != null && x.currentStatus.isErrored) {
          $event.isAnsweredWrong = true;
          this.endOfCurrentGame();
        } else {
          $event.isAnsweredCorrectly = true;
          this.showQuestionComponent(x);
        }
      },
      err => {
        // error calling the service
      }
    );
  }

  timeOut($event: IAnswer) {
    this.endOfCurrentGame();
  }

  endOfCurrentGame() {
    this.restartGame = true;
  }

  showQuestionComponent(initialExercise: IExercise) {
    const answer: IAnswer = {
      associatedExercise: initialExercise,
      equationWithAnswer: ''
    };

    this.questionsWithAnswers.push(answer);
  }
}
