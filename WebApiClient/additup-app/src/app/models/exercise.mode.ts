export interface IStatus {
  isCompleted: boolean;
  isErrored: boolean;
  message: string;
}

export interface IQuestion {
  equationWithoutAnswer: string;
  rank: string;
  rankQuestionNumber: number;
  timeToAnswer: number;
}

export interface IExercise {
  questionToAsk?: IQuestion;
  currentStatus?: IStatus;
}

export interface IAnswer {
  associatedExercise: IExercise;
  equationWithAnswer: string;
}
