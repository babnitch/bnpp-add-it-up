import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { CustomMaterialModule } from '../custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IExercise } from '../models/exercise.mode';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [ QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    const initialExercise: IExercise = {
      questionToAsk: {
        equationWithoutAnswer: '4 + -10 = ?',
        rank: '0',
        rankQuestionNumber: 1,
        timeToAnswer: 30
      },
      currentStatus: {
        isCompleted: false,
        isErrored: false,
        message: null
      }
    };
    component.questionAnswer = {
      associatedExercise: initialExercise,
      equationWithAnswer: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be showing a question', () => {
    expect(component.currentQuestion).toBeDefined();
    const holdingQuestion: any =  fixture.nativeElement.querySelector('.equationWithoutAnswer');
    expect(holdingQuestion.innerHTML).toBe('4 + -10 = ?');
  });

  it('should be showing a rank of beginner', () => {
    expect(component.currentQuestion).toBeDefined();
    const holdingQuestion: any =  fixture.nativeElement.querySelector('.rankView');
    expect(holdingQuestion.innerHTML).toContain('Rank:[0]');
  });

  it('should allow on sumbit to move to next question', () => {
    expect(component.currentQuestion).toBeDefined();

    component.answerFormGroup.controls['answer'].setValue('-6');
    expect(component.answerFormGroup.valid).toBeTruthy();

    let nextQuestion = false;
    component.moveToNextQuestion.subscribe(x => {
      nextQuestion = true;
    });

    component.onSubmit(component.answerFormGroup.value);
    expect(nextQuestion).toBeTruthy('onsubmit not called');
  });

  it('should on timeout emit timeOut event', () => {
    let timeOutEvent = false;
    component.timeOut.subscribe(x => {
      timeOutEvent = true;
    });

    component.onTimeOut();
    expect(timeOutEvent).toBeTruthy('timeout not called');
  });
});

