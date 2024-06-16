import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Row, Col, Card, Container } from "react-bootstrap";
import useSWR from "swr";
import { FaLaptopHouse, FaPlus, FaUsersCog } from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { IndexTableAdressComponent } from "../Component/IndexTableAdressComponent";


export function IndexPageAdress() {
    const client = new ApiClient("https://localhost:7088");
    const { data, error, isLoading } = useSWR("/api/adresses", () =>
    client.adressAll()
  );
  return (
    <Container fluid>
        <Row>
            <Col xs={2} className="p-0">
                <Sidebar />
            </Col>
            <Col>
                <TitleComponent title="List Of All Adresses" icon={FaLaptopHouse} iconColor="white" />
                <Row fluid>
                    <Col md={12}>
                      <Col md={1}>
                        <Link to={RoutePaths.CreatePageAdress} className="btn btn-primary new-button d-flex align-items-center mb-3">
                            <FaPlus className="me-2" />
                            New
                        </Link>
                      </Col>
                        <Card className="mb-3">
                            <Card.Body>
                                <IndexTableAdressComponent tableRows={data} isLoading={isLoading} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
);
}