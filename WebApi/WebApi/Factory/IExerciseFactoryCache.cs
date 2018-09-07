namespace WebApi.Factory
{
    public interface IExerciseFactoryCache
    {
        string Get(string key);
        bool Add(string key, string value);
    }
}