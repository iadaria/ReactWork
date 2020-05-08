using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public partial class Edit
    {
        public class Command: IRequest
        {
             public Guid Id { get; set; }
            public string Title {get; set;}
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if(activity == null)                    
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found"});
                activity.Title = request.Title ?? activity.Title; //in other words it hasn't changed
                activity.Description = request.Description ?? activity.Description; //in other words it hasn't changed
                activity.Category = request.Category ?? activity.Category; //in other words it hasn't changed
                activity.Date = request.Date ?? activity.Date; //in other words it hasn't changed
                activity.City = request.City ?? activity.City; //in other words it hasn't changed
                activity.Venue = request.Venue ?? activity.Venue; //in other words it hasn't changed

                
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}