using Newtonsoft.Json;

namespace WebApi.Extensions
{
    public static class StringExtensions
    {
        public static T ToJson<T>(this string src) where T : new()
        {
            return JsonConvert.DeserializeObject<T>(src);
        }

        public static string Display<T>(this T src) where T : new()
        {
            return JsonConvert.SerializeObject(src);
        }
    }
}