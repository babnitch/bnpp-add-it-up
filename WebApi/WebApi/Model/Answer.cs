namespace WebApi.Model
{
    public class Answer
    {
        public Exercise AssociatedExercise { get; set; }

        // holds a + b = N
        public string EquationWithAnswer { get; set; }
    }
}