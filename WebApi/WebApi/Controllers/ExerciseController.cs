using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApi.Extensions;
using WebApi.Factory;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ExerciseController : Controller
    {
        private readonly IExerciseFactory _exerciseFactory;

        public ExerciseController(IExerciseFactory exerciseFactory)
        {
            _exerciseFactory = exerciseFactory;
        }

        // GET api/exercise
        [HttpGet]
        public Exercise GetExercise()
        {
            return _exerciseFactory.CreateInitialExercise();       
        }

        // POST api/exercise
        [HttpPost]
        public Exercise PostAnswer([FromBody]Answer answer)
        {
            try
            {
                return _exerciseFactory.CreateNextExercise(answer);
            }
            catch (Exception e)
            {
                return _exerciseFactory.CreateExerciseWithErrorStatus(e.Message);
            }
        }
    }
}
