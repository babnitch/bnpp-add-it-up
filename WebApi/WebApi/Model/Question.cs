namespace WebApi.Model
{
    public class Question
    {
        // holds a + b = ?
        public string EquationWithoutAnswer { get; set; }

        public Rank Rank { get; set; }

        //range 1 to 3
        public int QuestionNumberWithinCurrentRank { get; set; }

        public int TimeToAnswer { get; set; }
    }
}