using System.Collections.Generic;
using WebApi.Extensions;
using WebApi.Model;

namespace WebApi.Factory
{
    public class ExerciseFactory: IExerciseFactory
    {
        private const int InitialTimerValue = 30;
        private readonly IExerciseFactoryCache _cache;
        private readonly IRandomNumberGenerator _randomNumberGenerator;

        public ExerciseFactory(
            IRandomNumberGenerator randomNumberGenerator,
            IExerciseFactoryCache cache)
        {
            _randomNumberGenerator = randomNumberGenerator;
            _cache = cache;
        }

        public string GetAnswer(Question question)
        {
            return _cache.Get(question?.EquationWithoutAnswer ?? string.Empty);
        }

        public Exercise CreateInitialExercise()
        {
            var rankToUse = Rank.Beginner;
            var question = GenerateUniqueQuestionAndAnswer(rankToUse);
            return new Exercise
            {
                QuestionToAsk = new Question
                {
                    EquationWithoutAnswer = question.Key,
                    Rank = rankToUse,
                    QuestionNumberWithinCurrentRank =  1,
                    TimeToAnswer = InitialTimerValue
                }
            };
        }

        public Exercise CreateExerciseWithErrorStatus(string eMessage)
        {
            return new Exercise
            {               
                CurrentStatus = new Status()
                {
                    IsErrored = true,
                    Message = eMessage
                }
            };
        }

        // returns exercise in error if current answer is not correct
        public Exercise CreateNextExercise(Answer currentAnswer)
        {
            var actualAnswer = GetAnswer(currentAnswer.AssociatedExercise.QuestionToAsk);
            if (Equals(actualAnswer, currentAnswer.EquationWithAnswer))
            {
                // question answered correctly, create new Question
                var rankToUse = currentAnswer.AssociatedExercise.QuestionToAsk.Rank;
                var timeToAnwser = currentAnswer.AssociatedExercise.QuestionToAsk.TimeToAnswer;
                var nextRankQuestionNumber =
                    currentAnswer.AssociatedExercise.QuestionToAsk.QuestionNumberWithinCurrentRank + 1;

                if (nextRankQuestionNumber > 3)
                {
                    // will return the next rank unless at expert (if so will keep returning this)
                    rankToUse = rankToUse.Next();
                    if (Equals(rankToUse, Rank.Completed))
                        return new Exercise
                        {
                            QuestionToAsk = null,
                            CurrentStatus = new Status
                            {
                                IsCompleted = true,
                                Message = "All questions answered"
                            }
                        };

                    nextRankQuestionNumber = 1;
                    timeToAnwser = timeToAnwser - 1;
                }

                var question = GenerateUniqueQuestionAndAnswer(rankToUse);
                return new Exercise
                {
                    QuestionToAsk = new Question
                    {
                        EquationWithoutAnswer = question.Key,
                        Rank = rankToUse,
                        QuestionNumberWithinCurrentRank = nextRankQuestionNumber,
                        TimeToAnswer = timeToAnwser
                    }
                };
            }

            return new Exercise
            {
                QuestionToAsk = null,
                CurrentStatus = new Status
                {
                    IsErrored = true,
                    Message = "Question was incorrectly answered"
                }
            };
        }

        public KeyValuePair<string, string> GenerateUniqueQuestionAndAnswer(Rank rankToUse)
        {
            var newQuestionAnswer = GenerateQuestionAndAnswer(_randomNumberGenerator, rankToUse);
            while (!_cache.Add(newQuestionAnswer.Key, newQuestionAnswer.Value))
                newQuestionAnswer = GenerateQuestionAndAnswer(_randomNumberGenerator, rankToUse);

            return newQuestionAnswer;
        }


        public static int GetNumberRange(Rank rankToUse)
        {
            switch (rankToUse)
            {
                case Rank.Intermmediate:
                    return 20;
                case Rank.Advance:
                    return 50;
                case Rank.Expert:
                    return 100;
                default:
                    return 20;
            }
        }

        public static KeyValuePair<string, string> GenerateQuestionAndAnswer(
            IRandomNumberGenerator randomNumberGenerator, Rank rankToUse)
        {
            var numberRange = GetNumberRange(rankToUse);
            var minValue = -numberRange;
            var maxValue = numberRange + 1;
            var firstItem = randomNumberGenerator.GetNumber(minValue, maxValue);
            var secondItem = randomNumberGenerator.GetNumber(minValue, maxValue);
            var answerItem = firstItem + secondItem;

            var equationWithoutAnswer = $"{firstItem} + {secondItem} = ?";
            var equationWithAnswer = $"{firstItem} + {secondItem} = {answerItem}";
            return new KeyValuePair<string, string>(equationWithoutAnswer, equationWithAnswer);
        }
    }
}