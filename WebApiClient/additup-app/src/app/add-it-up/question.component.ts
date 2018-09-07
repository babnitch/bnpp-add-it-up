import { Component, Input, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import {Helper} from 'additup-common';
import {IAnswer} from '../models/exercise.mode';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit, OnDestroy {
  public isEnabled: boolean;
  public initialTimerValue: number;
  public currentTimerValue: number;
  public currentQuestion: string;
  public answer: string;

  public isAnsweredCorrectly: boolean;
  public isAnsweredWrong: boolean;

  private _questionAnswer: IAnswer;
  private _countDownTimer: Observable<number>;
  private _countDownTimerSubscription: Subscription;

  public isTimedOut: boolean;

  @Input() set questionAnswer(value: IAnswer) {
    this._questionAnswer = value;
    this.isEnabled = true;
    this.currentQuestion = value.associatedExercise.questionToAsk.equationWithoutAnswer;
    this.answer = '';
    this.initialTimerValue = value.associatedExercise.questionToAsk.timeToAnswer;
    this.currentTimerValue = this.initialTimerValue;
  }
  get questionAnswer(): IAnswer {
    return this._questionAnswer;
  }

  @Output() moveToNextQuestion: EventEmitter<QuestionComponent> = new EventEmitter<QuestionComponent>();
  @Output() timeOut: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answerFormGroup = new FormGroup({
    answer: new FormControl('', Validators.required)
  });

  constructor() {}

  onTimeOut() {
    console.log('onTimeOut with');
    this.answer = this.answerFormGroup.value.answer;
    this.isEnabled = false;
    this.isTimedOut = true;
    this.timeOut.emit(this.questionAnswer);
  }

  onSubmit(value: any) {
    console.log('onSubmit with = ' + value.answer);

    const helper = new Helper();
    if (helper.IsNumber(value.answer)) {
      this.answer = value.answer;
    } else {
       // flag the error
       console.log('failed is number ' + value.answer);
       return;
    }

    this.answer = value.answer;
    this.isEnabled = false;
    this._questionAnswer.equationWithAnswer =
      this._questionAnswer.associatedExercise.questionToAsk.equationWithoutAnswer.replace('?', this.answer);

    // get the next question
    this.moveToNextQuestion.emit(this);
  }

  ngAfterViewInit(): void {
    // start the timer check we have a valid question property
    if (this._questionAnswer.associatedExercise) {
      console.log('We have a valid question =' + this._questionAnswer.associatedExercise.questionToAsk.equationWithoutAnswer);
    }

    // tick every second
    this._countDownTimer = interval(1000);

    // get values until count down is zero or control is not enabled (we gave an answer)
    // on counter being zero, then signal timeout using side affect
    this._countDownTimerSubscription = this._countDownTimer
      .pipe(
        takeWhile(x => this.isEnabled && this.currentTimerValue >= 0),
        tap(x => {if (this.currentTimerValue === 0) {this.onTimeOut(); }}))
      .subscribe(x => {
        this.currentTimerValue = this.currentTimerValue - 1;
    });
  }

  ngOnDestroy() {
    if (this._countDownTimerSubscription) {
      this._countDownTimerSubscription.unsubscribe();
    }
  }
}
