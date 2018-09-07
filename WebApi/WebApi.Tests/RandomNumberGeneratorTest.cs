using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Factory;

namespace WebApi.Tests
{
    [TestClass]
    public class RandomNumberGeneratorTest
    {
        [TestMethod]
        public void EnsureWeCanGenerateRandomNumbersInRange()
        {
            var randomNumberGenerator = new RandomNumberGenerator();
            for (int i = 0; i < 1000; i++)
            {
                var result = randomNumberGenerator.GetNumber(0, 10);
                Assert.IsTrue(result >= 0 && result <= 10);
            }

            for (int i = 0; i < 1000; i++)
            {
                var result = randomNumberGenerator.GetNumber(9, 12);
                Assert.IsTrue(result >= 9 && result <= 12);
            }
        }
    }
}
