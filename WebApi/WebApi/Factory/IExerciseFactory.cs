using WebApi.Model;

namespace WebApi.Factory
{
    public interface IExerciseFactory
    {
        Exercise CreateNextExercise(Answer currentAnswer);
        Exercise CreateInitialExercise();
        Exercise CreateExerciseWithErrorStatus(string eMessage);
    }
}