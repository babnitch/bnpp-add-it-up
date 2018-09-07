namespace WebApi.Factory
{
    public interface IRandomNumberGenerator
    {
        int GetNumber(int minValue, int maxValue);
    }
}