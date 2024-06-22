import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaTicketAlt, FaUsersCog } from 'react-icons/fa';
import RoutePaths from '../RouthPaths';

export function Sidebar() {
  return (
    <Nav className="flex-column sidebar">
      <Link to={RoutePaths.HomePage} className="text-dark mb-1 text-center d-flex flex-column align-items-center">
        <FaUsersCog size={48} color="black" style={{ marginBottom: '10px' }} />
        <h5 className="text-dark" style={{ textDecoration: 'underline' }}>PERSONAL MANAGEMENT</h5>
      </Link>

      <div className="my-3">
        <Link to={RoutePaths.HomePagePerson} className="text-dark mb-2 d-flex align-items-center">
          <FaUser className="me-3" /> Personal
        </Link>
        <Link to={RoutePaths.IndexPagePerson} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          All Personal
        </Link>
        <Link to={RoutePaths.CreatePagePerson} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          Add New Personal 
        </Link>
      </div>

      <div className="my-3">
        <Link to={RoutePaths.HomePageAbsence} className="text-dark mb-2 d-flex align-items-center">
          <FaCalendarAlt className="me-2" /> Absences
        </Link>
        <Link to={RoutePaths.CreatePageAbsence} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          Add New Absence
        </Link>
      </div>

      <div className="my-3">
        <Link to={RoutePaths.HomePageAdress} className="text-dark mb-2 d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" /> Addresses
        </Link>
        <Link to={RoutePaths.CreatePageAdress} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          Add New Address
        </Link>
      </div>

      <div className="my-3">
        <Link to={RoutePaths.HomePageBusnessTrip} className="text-dark mb-2 d-flex align-items-center">
          <FaBriefcase className="me-2" /> Business Trips
        </Link>
        <Link to={RoutePaths.CreatePageBusnessTrip} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          Add New BusinessTrip
        </Link>
      </div>

      <div className="my-3">
        <Link to={RoutePaths.HomePageTicket} className="text-dark mb-2 d-flex align-items-center">
          <FaTicketAlt className="me-2" /> Tickets
        </Link>
        <Link to={RoutePaths.CreatePageTickets} className="text-dark mb-2 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
          New Add Ticket
        </Link>
      </div>
    </Nav>
  );
};

