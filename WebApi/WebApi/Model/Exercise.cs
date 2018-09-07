using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Exercise
    {
        public Question QuestionToAsk { get; set; }
        public Status CurrentStatus { get; set; }

        // Method to create an exercise of type a + b = ?
        public static Exercise CreateExercise()
        {
            return new Exercise();
        }
    }
}
