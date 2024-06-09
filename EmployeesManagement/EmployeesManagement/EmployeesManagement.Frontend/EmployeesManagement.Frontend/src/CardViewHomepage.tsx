import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoutePaths from "./RouthPaths";


const ModuleCardSm = ({ app, moduleType }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  let linkPath = "";

  switch (moduleType) {
    case "Person":
      linkPath = RoutePaths.HomePagePerson;
      break;
    case "Absence":
      linkPath = RoutePaths.HomePageAbsence;
      break;
    case "Adress":
      linkPath = RoutePaths.HomePageAdress;
      break;
    case "BusnessTrip":
      linkPath = RoutePaths.HomePageBusnessTrip;
      break;
    default:
      break;
  }

  return (
    <Card>
      <Card.Body>
        <Link to={linkPath} style={linkStyle}>
          <div className="d-flex justify-content-center mb-3">
            {/* Replace this with your actual icon component */}
            <span className="icon-placeholder">{moduleType}</span>
          </div>
          <h6 className="d-flex justify-content-center">{app.displayName || app.name}</h6>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ModuleCardSm;
