namespace StudentPlanManager.Model
{
    public class Adress : BaseEntity
    {
        public required string Street { get; set; }

        public required string City { get; set; }

        public string? Raum { get; set; }

        public string? State { get; set; }

        public required string PostalCode { get; set; }

        public required string Country { get; set; }
    }
}

