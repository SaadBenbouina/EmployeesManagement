import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoutePaths from "./RouthPaths";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";


interface ModuleCardSmProps {

  moduleType: "Person" | "Absence" | "Adress" | "BusnessTrip";
}

const CardViewHomePage: React.FC<ModuleCardSmProps> = ({  moduleType }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  let linkPath = "";
  let IconComponent: React.ReactNode = null;

  switch (moduleType) {
    case "Person":
      linkPath = RoutePaths.HomePagePerson;
      IconComponent = <FaUser />;
      break;
    case "Absence":
      linkPath = RoutePaths.HomePageAbsence;
      IconComponent = <FaCalendarAlt />;
      break;
    case "Adress":
      linkPath = RoutePaths.HomePageAdress;
      IconComponent = <FaMapMarkerAlt />;
      break;
    case "BusnessTrip":
      linkPath = RoutePaths.HomePageBusnessTrip;
      IconComponent = <FaBriefcase />;
      break;
    default:
      break;
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Link to={linkPath} style={linkStyle}>
          <div className="d-flex justify-content-center mb-3">
            {IconComponent}
          </div>
          <h6 className="d-flex justify-content-center">{moduleType}</h6>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardViewHomePage;
