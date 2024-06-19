export default class RoutePaths {
    public static HomePage = "/";
    
    public static HomePagePerson = "/Persons";
    public static CreatePagePerson = "/Persons/Create";
    public static IndexPagePerson = "/Persons/Index";
    public static DetailsPagePerson = "/Persons/Details/:id";
    public static EditPagePerson = (dto: { id?: number }) =>
    this.DetailsPagePerson.replace(":id", dto.id?.toString() ?? "unknown");
    
    public static DetailsPageAbsence =
      "/Absence/Edit/:id";
    public static IndexPageAbsence =
      "/Absence/IndexAbsence";
    public static CreatePageAbsence =
      "/Absence/Create";
    public static HomePageAbsence = "/Absence";
    public static EditPageAbsence = (dto: { id?: number }) =>
    this.DetailsPageAbsence.replace(":id", dto.id?.toString() ?? "unknown");

    public static DetailsPageAdress =
      "/Adresses/Edit/:id";
    public static IndexPageAdress =
      "/Adresses/IndexAdress";
    public static CreatePageAdress =
      "/Adresses/Create";
    public static HomePageAdress = "/Adresses";
    public static EditPageAdress = (dto: { id?: number }) =>
    this.DetailsPageAdress.replace(":id", dto.id?.toString() ?? "unknown");

    public static DetailsPageBusnessTrip =
      "/BusnessTrips/Edit/:id";
    public static IndexPageBusnessTrip =
      "/BusnessTrips/IndexBusnessTrip";
    public static CreatePageBusnessTrip =
      "/BusnessTrips/Create";
    public static HomePageBusnessTrip = "/BusnessTrips";
    public static EditPageBusnessTrip = (dto: { id?: number }) =>
    this.DetailsPageBusnessTrip.replace(":id", dto.id?.toString() ?? "unknown");

    public static HomePageTicket = "/Tickets";
    public static CreatePageTickets = "/Tickets/Create";
    public static IndexPageTickets = "/Tickets/Index";
    public static DetailsPageTickets = "/Tickets/Edit/:id";
    public static EditPageTickets = (dto: { id?: number }) =>
    this.DetailsPageTickets.replace(":id", dto.id?.toString() ?? "unknown");

    
  }
  