import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExercise, IAnswer } from '../models/exercise.mode';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }


  getInitialExercise(): Observable<IExercise> {
    /*
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
    */

    return this.http.get<IExercise>('http://localhost:56000/api/exercise');
  }

  getNextExercise(answer: IAnswer): Observable<IExercise> {
    /*
    const nextExercise: IExercise = {
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
    */
   return this.http.post<IExercise>('http://localhost:56000/api/exercise', answer);
  }
}
