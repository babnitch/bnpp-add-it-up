import { DataService } from './data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { IExercise, IAnswer } from '../models/exercise.mode';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('DataService', () => {
  let httpClientSpy: { get: jasmine.Spy;  post: jasmine.Spy; };
  let dataService: DataService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    dataService = new DataService(<any> httpClientSpy);
  });


  it('should return expected initial exercise (HttpClient called once)', () => {
    const expectedInitialExercise: IExercise = {
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

    httpClientSpy.get.and.returnValue(asyncData(expectedInitialExercise));
    dataService.getInitialExercise().subscribe(
      x => expect(x).toEqual(expectedInitialExercise, 'expected initial exercise'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


  it('should return expected next exercise (HttpClient called once)', () => {

    const initialExercise: IExercise = {
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

    const nextExercise: IExercise = {
      questionToAsk: {
        equationWithoutAnswer: '2 + 2 = ?',
        rank: 'Beginner',
        rankQuestionNumber: 2,
        timeToAnswer: 30
      },
      currentStatus: {
        isCompleted: false,
        isErrored: false,
        message: null
      }
    };

    const answer: IAnswer = {
      associatedExercise: initialExercise,
      equationWithAnswer: '4 + -10 = -6',
    };

    httpClientSpy.post.and.returnValue(asyncData(nextExercise));
    dataService.getNextExercise(answer).subscribe(
      x => expect(x).toEqual(nextExercise, 'expected next exercise'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
