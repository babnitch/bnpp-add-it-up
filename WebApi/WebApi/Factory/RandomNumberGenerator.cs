using System;

namespace WebApi.Factory
{
    public class RandomNumberGenerator : IRandomNumberGenerator
    {
        private readonly Random _randomNumberGenerator;

        public RandomNumberGenerator()
        {
            _randomNumberGenerator = new Random(DateTime.Now.Millisecond);
        }

        public int GetNumber(int minValue, int maxValue)
        {
            return _randomNumberGenerator.Next(minValue, maxValue);
        }
    }
}