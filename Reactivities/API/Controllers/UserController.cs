using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query) =>
            await Mediator.Send(query);
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command) =>
            await Mediator.Send(command);

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser() =>
            await Mediator.Send(new CurrentUser.Query());

        [AllowAnonymous]
        [HttpPost("facebook")]
        public async Task<ActionResult<User>> FacebookLogin(ExternalLogin.Query query) =>
            await Mediator.Send(query);
    }
}