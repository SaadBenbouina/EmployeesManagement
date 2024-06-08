using System;
namespace StudentPlanManager.Model
{
	public class Absence:BaseEntity
	{
        public required string Reason { get; set; }

		public required DateTime From { get; set; }

        public required DateTime To { get; set; }

        public required int AbsenceId { get; set; }

        public  required bool Approved { get; set; }

    }
}

