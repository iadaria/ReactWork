using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    //method all we're going to do is say return awaits mediator!
    [Route ("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase {
        private readonly IMediator _mediator;
        public ActivitiesController (IMediator mediator) {
            _mediator = mediator;
        }
        // is an absolute minimum and they're only lierally got one task
        // which is to receive requests and response

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() =>
            await _mediator.Send(new List.Query());

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) =>
            await _mediator.Send(new Details.Query{Id = id});
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) =>
            await _mediator.Send(command);

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command) {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{ Id = id});
        }

    }
}