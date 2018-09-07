import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItUpComponent } from './add-it-up.component';
import { CustomMaterialModule } from '../custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question.component';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { IExercise, IAnswer } from '../models/exercise.mode';
import { Observable, of } from 'rxjs';

class MockDataService {
  public initialExercise: IExercise = {
    questionToAsk: {
      equationWithoutAnswer: '4 + -10 = ?',
      rank: 'Beginner',
      rankQuestionNumber: 1,
      timeToAnswer: 30
    },
    currentStatus: {
      isCompleted: false,
      isErrored: false,
      message: null
    }
  };

  public nextExercise: IExercise = {
    questionToAsk: {
      equationWithoutAnswer: '66 + -10 = ?',
      rank: 'Beginner',
      rankQuestionNumber: 1,
      timeToAnswer: 30
    },
    currentStatus: {
      isCompleted: false,
      isErrored: false,
      message: null
    }
  };

  getInitialExercise(): Observable<IExercise> {
    return of(this.initialExercise);
  }

  getNextExercise(answer: IAnswer): Observable<IExercise> {
   return of(this.nextExercise);
  }
}

describe('AddItUpComponent', () => {
  let component: AddItUpComponent;
  let fixture: ComponentFixture<AddItUpComponent>;
  const mockDataService = new MockDataService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: DataService, useValue: mockDataService}
      ],
      declarations: [QuestionComponent, AddItUpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when we start a new game, number of questions should be 1', () => {
    component.startNewGame();
    expect(component.questionsWithAnswers.length).toBe(1);
  });

  it('when we start a new game and the move to next question, number of questions should be 1', () => {
    component.startNewGame();
    expect(component.questionsWithAnswers.length).toBe(1);

    // next question
    const questionItem = TestBed.createComponent(QuestionComponent);
    const questionComponent = questionItem.componentInstance;
    component.moveToNextQuestion(questionComponent);
    expect(component.questionsWithAnswers.length).toBe(2);
  });

  it('when we start a new game and then move to next question with incorrect answer, number of questions should be 1', () => {
    component.startNewGame();
    expect(component.questionsWithAnswers.length).toBe(1);

    // make previous answer as incorrect
    mockDataService.nextExercise = {
      questionToAsk: {
        equationWithoutAnswer: '66 + -10 = ?',
        rank: 'Beginner',
        rankQuestionNumber: 1,
        timeToAnswer: 30
      },
      currentStatus: {
        isCompleted: false,
        isErrored: true,
        message: 'answer given is incorrect'
      }
    };

    // next question
    const questionItem = TestBed.createComponent(QuestionComponent);
    const questionComponent = questionItem.componentInstance;
    component.moveToNextQuestion(questionComponent);
    expect(component.questionsWithAnswers.length).toBe(1);
  });
});
