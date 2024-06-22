import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaTicketAlt } from "react-icons/fa";

interface ModuleCardSmProps {
  moduleType: "Personal" | "Absences" | "Addresses" | "BusnessTrips" | "Tickets";
}

export function CardViewHomePage(props: ModuleCardSmProps) {
  const { moduleType } = props;

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  let linkPath = "";
  let IconComponent: React.ReactNode = null;
  const borderColor = "grey";
  let textColor = "";

  switch (moduleType) {
    case "Personal":
      linkPath = RoutePaths.HomePagePerson;
      IconComponent = <FaUser size={55} color="blue" />;
      break;
    case "Absences":
      linkPath = RoutePaths.HomePageAbsence;
      IconComponent = <FaCalendarAlt size={55} color="green" />;
      break;
    case "Tickets":
      linkPath = RoutePaths.HomePageTicket;
      IconComponent = <FaTicketAlt size={55} color="orange" />;
      break;
    case "Addresses":
      linkPath = RoutePaths.HomePageAdress;
      IconComponent = <FaMapMarkerAlt size={55} color="purple" />;
      break;
    case "BusnessTrips":
      linkPath = RoutePaths.HomePageBusnessTrip;
      IconComponent = <FaBriefcase size={55} color="red" />;
      break;
    default:
      break;
  }

  return (
    <Card className="h-100" style={{ borderColor, borderWidth: "3px", borderStyle: "solid" }}>
      <Card.Body>
        <Link to={linkPath} style={linkStyle}>
          <div className="d-flex justify-content-center mb-3">
            {IconComponent}
          </div>
          <h6 className="d-flex justify-content-center" style={{ color: textColor }}>
            {moduleType}
          </h6>
        </Link>
      </Card.Body>
    </Card>
  );
}
