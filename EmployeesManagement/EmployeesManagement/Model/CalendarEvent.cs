
using System;
namespace StudentPlanManager.Model
{
    public class CalendarEvent
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string? Description { get; set; }

        public int PersonId { get; set; } 
    }
}

