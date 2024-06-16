export default class RoutePaths {
    public static HomePage = "/";
    
    public static HomePagePerson = "/Persons";
    public static CreatePagePerson = "/Persons/Create";
    public static IndexPagePerson = "/Persons/Index";
    public static DetailsPagePerson = "/Persons/Details/:id";
    public static EditPagePerson = (dto: { id?: number }) =>
    this.DetailsPagePerson.replace(":id", dto.id?.toString() ?? "unknown");
    
    public static DetailsPageAbsence =
      "/Absence/DetailsAbsence/:id";
    public static IndexPageAbsence =
      "/Absence/IndexAbsence";
    public static CreatePageAbsence =
      "/Absence/CreateAbsence";
    public static HomePageAbsence = "/Absence";

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
      "/BusnessTrips/DetailsBusnessTrip/:id";
    public static IndexPageBusnessTrip =
      "/BusnessTrips/IndexBusnessTrip";
    public static CreatePageBusnessTrip =
      "/BusnessTrips/CreateBusnessTrip";
    public static HomePageBusnessTrip = "/BusnessTrips";

    public static HomePageTicket = "/Tickets";
    public static CreatePageTickets = "/Tickets/Create";
    public static IndexPageTickets = "/Tickets/Index";
    public static DetailsPageTickets = "/Tickets/Details/:id";
    public static EditPageTickets = "/Tickets/Edit/:id";

    
  }
  