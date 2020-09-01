using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace billted
{
    public static class Connect
    {
        [FunctionName("negotiate")]
        public static async Task<SignalRConnectionInfo> GetSignalRInfo2(
             [HttpTrigger(AuthorizationLevel.Anonymous, "post", "get")] HttpRequest req,
             IBinder binder, ILogger log)
        {

            string hub = "billtedRoom";
            string userId = req.Query["user"];

            SignalRConnectionInfoAttribute attribute = new SignalRConnectionInfoAttribute
            {
                HubName = hub,
                UserId = userId
            };

            // This style is an example of imperative attribute binding; the mechanism for declarative binding described below does not work
            // UserId = "{headers.x-my-custom-header}" https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-concept-serverless-development-config
            SignalRConnectionInfo connection = await binder.BindAsync<SignalRConnectionInfo>(attribute);

            return connection;
        }

        [FunctionName("SignIn")]
        public static async Task SignIn(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req,
              [SignalR(HubName = "billtedRoom")] IAsyncCollector<SignalRMessage> signalRMessages,
             IBinder binder, ILogger log)
        {


            string userId = req.Query["user"];
            string teamId = req.Query["team"];

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = "signedIn",
                Arguments = new object[] { userId, teamId }
            });
        }

        [FunctionName("TeamComplete")]
        public static async Task TeamComplete(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req,
              [SignalR(HubName = "billtedRoom")] IAsyncCollector<SignalRMessage> signalRMessages,
             IBinder binder, ILogger log)
        {
            string teamId = req.Query["team"];
            var parts = teamId.Split(new string[] { "-" }, System.StringSplitOptions.RemoveEmptyEntries);

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = "getTeamComplete",
                Arguments = new object[] { parts }
            });
        }

        [FunctionName("NextQuestion")]
        public static async Task NextQuestion(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req,
              [SignalR(HubName = "billtedRoom")] IAsyncCollector<SignalRMessage> signalRMessages,
             IBinder binder, ILogger log)
        {
            string QuestionId = req.Query["Question"];

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = "getNextQuestion",
                Arguments = new object[] { QuestionId }
            });
        }

        [FunctionName("SendMessage")]
        public static async Task SendMessage(
             [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req,
              [SignalR(HubName = "billtedRoom")] IAsyncCollector<SignalRMessage> signalRMessages,
             IBinder binder, ILogger log)
        {
            string teamId = req.Query["team"];
            string message = req.Query["message"];

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = "message",
                Arguments = new object[] { teamId, message }
            });
        }

        [FunctionName("ChoseAnswer")]
        public static async Task ChoseAnswer(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req,
             [SignalR(HubName = "billtedRoom")] IAsyncCollector<SignalRMessage> signalRMessages,
            IBinder binder, ILogger log)
        {
            string teamId = req.Query["team"];
            string message = req.Query["choice"];

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = "choice",
                Arguments = new object[] { teamId, message }
            });
        }
    }
}
