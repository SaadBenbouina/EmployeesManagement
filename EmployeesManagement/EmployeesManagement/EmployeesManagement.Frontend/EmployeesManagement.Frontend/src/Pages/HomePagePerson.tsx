import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../SidebarComponent";

function HomePagePerson() {
    return (
      <Container fluid>
        <Row >
          <Col xs={2} className="p-0">
            <Sidebar />
          </Col>
          <Col xs={10} className="p-0">
            <Container fluid >
              
              
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default HomePagePerson;
  