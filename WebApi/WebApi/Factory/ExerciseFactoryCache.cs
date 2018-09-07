using System.Collections.Concurrent;

namespace WebApi.Factory
{
    public class ExerciseFactoryCache: IExerciseFactoryCache
    {
        private readonly ConcurrentDictionary<string, string> _cache =
            new ConcurrentDictionary<string, string>();

        public string Get(string key)
        {
            string value = null;
            if (!string.IsNullOrWhiteSpace(key)) _cache.TryGetValue(key, out value);
            return value;
        }

        public bool Add(string key, string value)
        {
            return _cache.TryAdd(key, value);
        }
    }
}