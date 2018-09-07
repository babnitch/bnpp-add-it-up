using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Extensions;
using WebApi.Factory;
using WebApi.Model;

namespace WebApi.Tests
{
    [TestClass]
    public class ExerciseFactoryTests
    {
        public class MockRandomNumberGenerator : IRandomNumberGenerator
        {
            private readonly int[] _valueToReturn;
            private int _index;

            public MockRandomNumberGenerator(int[] valueToReturn)
            {
                _valueToReturn = valueToReturn;
            }

            public int GetNumber(int minValue, int maxValue)
            {
                return _valueToReturn[_index++];
            }
        }

        [TestMethod]
        public void WhenWeCreateInitialExerciseWeShouldGetAValidExercise()
        {
            var cache= new ExerciseFactoryCache();
            var factory = new ExerciseFactory(new MockRandomNumberGenerator(new int[] { 1, 2 }), cache);
            var exercise = factory.CreateInitialExercise();

            Assert.IsNotNull(exercise);
            Assert.IsNotNull(exercise.QuestionToAsk);
            Assert.AreEqual("1 + 2 = ?", exercise.QuestionToAsk.EquationWithoutAnswer);
            Assert.AreEqual("1 + 2 = 3", factory.GetAnswer(exercise.QuestionToAsk));
            Assert.IsTrue(exercise.QuestionToAsk.TimeToAnswer > 0);
            Assert.AreEqual(Rank.Beginner, exercise.QuestionToAsk.Rank);
        }

        [TestMethod]
        public void WhenWeCreateNextAnExerciseWithValidAnswerWeGetAValidNewExercise()
        {
            var cache = new ExerciseFactoryCache();
            var factory = new ExerciseFactory(new MockRandomNumberGenerator(new int[]
            {
                9, -3,
                2 , 3
            }), cache);

            var initialExercise = factory.CreateInitialExercise();
            var answer = new Answer()
            {
                AssociatedExercise = initialExercise,
                EquationWithAnswer = "9 + -3 = 6",
            };

            var exercise = factory.CreateNextExercise(answer);
            Assert.IsNotNull(exercise);
            Assert.IsNotNull(exercise.QuestionToAsk);
            Assert.AreEqual("2 + 3 = ?", exercise.QuestionToAsk.EquationWithoutAnswer);
            Assert.AreEqual("2 + 3 = 5", factory.GetAnswer(exercise.QuestionToAsk));

            // second question for current rank
            Assert.AreEqual(2, exercise.QuestionToAsk.QuestionNumberWithinCurrentRank);
            Assert.IsTrue(exercise.QuestionToAsk.TimeToAnswer > 0);
            Assert.AreEqual(Rank.Beginner, exercise.QuestionToAsk.Rank);

            Console.WriteLine(answer.Display());

            // {"AssociatedExercise":{"QuestionToAsk":{"EquationWithoutAnswer":"9 + -3 = ?","Rank":0,"QuestionNumberWithinCurrentRank":1,"TimeToAnswer":30},"CurrentStatus":null},"EquationWithAnswer":"9 + -3 = 6"}
        }

        [TestMethod]
        public void WhenWeCallCreateNextExerciseWithInvalidAnswerWeGetAInvalidNewExercise()
        {
            var cache = new ExerciseFactoryCache();
            var factory = new ExerciseFactory(new MockRandomNumberGenerator(new int[]
            {
                9, -3,
                2 , 3
            }), cache);

            var initialExercise = factory.CreateInitialExercise();
            var answer = new Answer()
            {
                AssociatedExercise = initialExercise,
                EquationWithAnswer = "9 + -3 = 99",
            };

            var exercise = factory.CreateNextExercise(answer);
            Assert.IsNotNull(exercise);

            // we dont have a question
            Assert.IsNull(exercise.QuestionToAsk);

            // status is in error state
            Assert.IsTrue(exercise.CurrentStatus.IsErrored);
            Assert.IsFalse(exercise.CurrentStatus.IsCompleted);

            // we have message
            Assert.IsNotNull(exercise.CurrentStatus.Message);
        }

        [TestMethod]
        public void WhenWeCallCreateNextExerciseWithMultipleTimesWithTheCorrectAnswerWeChangeRank()
        {
            var cache = new ExerciseFactoryCache();
            var factory = new ExerciseFactory(new MockRandomNumberGenerator(new int[]
            {
                9, -3,
                2 , 3,
                3 , 3,
                4 , 4
            }), cache);

            var initialExercise = factory.CreateInitialExercise();
            var secondExercise = factory.CreateNextExercise(new Answer()
            {
                AssociatedExercise = initialExercise,
                EquationWithAnswer = "9 + -3 = 6",
            });

            var thirdExercise = factory.CreateNextExercise(new Answer()
            {
                AssociatedExercise = secondExercise,
                EquationWithAnswer = "2 + 3 = 5",
            });

            var forthExercise = factory.CreateNextExercise(new Answer()
            {
                AssociatedExercise = thirdExercise,
                EquationWithAnswer = "3 + 3 = 6",
            });

            // should be 4 + 4
            Assert.IsNotNull(forthExercise);
            Assert.AreEqual("4 + 4 = ?", forthExercise.QuestionToAsk.EquationWithoutAnswer);
            Assert.AreEqual("4 + 4 = 8", factory.GetAnswer(forthExercise.QuestionToAsk));

            Assert.AreEqual(Rank.Intermmediate, forthExercise.QuestionToAsk.Rank);
            Assert.AreEqual(1, forthExercise.QuestionToAsk.QuestionNumberWithinCurrentRank);
        }


        [TestMethod]
        public void WhenWeAskFinalQuestionAtExpertLevelThenExerciseHasTheStatusCompleted()
        {
            var cache = new ExerciseFactoryCache();
            var factory = new ExerciseFactory(new MockRandomNumberGenerator(new int[]
            {
                9, -3
            }), cache);

            var lastExercise = factory.CreateInitialExercise();
            lastExercise.QuestionToAsk.QuestionNumberWithinCurrentRank = 3;
            lastExercise.QuestionToAsk.Rank = Rank.Expert;


            var answer = new Answer()
            {
                AssociatedExercise = lastExercise,
                EquationWithAnswer = "9 + -3 = 6",
            };

            var exercise = factory.CreateNextExercise(answer);
            Assert.IsNotNull(exercise);

            // status is in error state
            Assert.IsTrue(exercise.CurrentStatus.IsCompleted);

            // we have message
            Assert.IsNotNull(exercise.CurrentStatus.Message);
        }
    }
}
