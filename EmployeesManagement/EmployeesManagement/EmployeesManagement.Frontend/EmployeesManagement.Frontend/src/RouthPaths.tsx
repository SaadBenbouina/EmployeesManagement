export default class RoutePaths {
    public static HomePage = "/";
    
    public static HomePagePerson = "/Persons";
    public static CreatePagePerson = "/Persons/Create";
    public static IndexPagePerson = "/Persons/Index";
    public static DetailsPagePerson = "/Persons/Details/:id";
    public static EditPagePerson = "/Persons/Edit/:id";

    public static DetailsPageAbsence =
      "/Absence/DetailsAbsence/:id";
    public static IndexPageAbsence =
      "/Absence/IndexAbsence";
    public static CreatePageAbsence =
      "/Absence/CreateAbsence";
    public static HomePageAbsence = "/Absence";

    public static DetailsPageAdress =
      "/Absence/DetailsAdress/:id";
    public static IndexPageAdress =
      "/Absence/IndexAdress";
    public static CreatePageAdress =
      "/Absence/CreateAdress";
    public static HomePageAdress = "/Adress";

    public static DetailsPageBusnessTrip =
      "/Absence/DetailsBusnessTrip/:id";
    public static IndexPageBusnessTrip =
      "/Absence/IndexBusnessTrip";
    public static CreatePageBusnessTrip =
      "/Absence/CreateBusnessTrip";
    public static HomePageBusnessTrip = "/BusnessTrip";

    public static HomePageTicket = "/Tickets";
    public static CreatePageTickets = "/Tickets/Create";
    public static IndexPageTickets = "/Tickets/Index";
    public static DetailsPageTickets = "/Tickets/Details/:id";
    public static EditPageTickets = "/Tickets/Edit/:id";
  }
  