namespace WebApi.Model
{
    public class Status
    {
        public bool IsCompleted { get; set; }
        public bool IsErrored { get; set; }
        public string Message { get; set; }
    }
}