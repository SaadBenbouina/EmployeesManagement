import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Component/SidebarComponent";
import StatusChart from "src/Component/StatusChart";


const mockData = [
  0, 1, 0, 1, 0, 0, 1 // Beispielhafte Daten für den Status
];

function HomePagePerson() {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar />
        </Col>
        <Col xs={10} className="p-0">
          <Container fluid>
            <Row>
              <Col>
                <h2>Status Chart</h2>
                <StatusChart data={mockData} /> 
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePagePerson;
