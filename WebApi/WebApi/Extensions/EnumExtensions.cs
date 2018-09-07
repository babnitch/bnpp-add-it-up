using System;
using System.Linq;
using WebApi.Model;

namespace WebApi.Extensions
{
    public static class EnumExtensions
    {
        public static T Next<T>(this T src) where T : struct
        {
            if (!typeof(T).IsEnum) throw new ArgumentException($"Argumnent {typeof(T).FullName} is not an Enum");

            var arr = (T[]) Enum.GetValues(src.GetType());
            var j = Array.IndexOf(arr, src) + 1;
            return arr.Length == j ? arr.LastOrDefault() : arr[j];
        }

        public static T ToEnum<T>(this string value)
        {
            return (T) Enum.Parse(typeof(T), value, true);
        }
    }
}