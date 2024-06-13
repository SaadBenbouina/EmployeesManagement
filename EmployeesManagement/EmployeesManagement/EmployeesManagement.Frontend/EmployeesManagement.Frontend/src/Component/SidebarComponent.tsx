import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaTicketAlt, FaUsersCog } from 'react-icons/fa';
import RoutePaths from '../RouthPaths';

const Sidebar: React.FC = () => {
  return (
    <Nav className="flex-column" style={{ width: '250px',  background: 'linear-gradient(to bottom, #90EE90, #008000)', height: '100vh', padding: '30px' }}>
      <Link to={RoutePaths.HomePage} className="text-dark mb-4 text-center d-flex flex-column align-items-center">
        <FaUsersCog size={48} color="black" style={{ marginBottom: '10px' }} />
        <h5 className="text-dark" style={{ textDecoration: 'underline' }}>PERSONAL MANAGEMENT</h5>
      </Link>
      <Link to={RoutePaths.HomePagePerson} className="text-dark mb-2 d-flex align-items-center">
        <FaUser className="me-2" /> Personal
      </Link>
      <Link to={RoutePaths.HomePageAbsence} className="text-dark mb-2 d-flex align-items-center">
        <FaCalendarAlt className="me-2" /> Absences
      </Link>
      <Link to={RoutePaths.HomePageAdress} className="text-dark mb-2 d-flex align-items-center">
        <FaMapMarkerAlt className="me-2" /> Addresses
      </Link>
      <Link to={RoutePaths.HomePageBusnessTrip} className="text-dark mb-2 d-flex align-items-center">
        <FaBriefcase className="me-2" /> Business Trips
      </Link>
      <Link to={RoutePaths.HomePageTicket} className="text-dark mb-2 d-flex align-items-center">
        <FaTicketAlt className="me-2" /> Tickets
      </Link>
    </Nav>
  );
};

export default Sidebar;
