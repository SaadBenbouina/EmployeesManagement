import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import { FaUsersCog } from 'react-icons/fa';
import CardViewHomePage from '../CardViewHomepage';
import Sidebar from '../SidebarComponent';
import TitleComponent from '../TitleComponent';

function HomePage() {
  return (
    <Container fluid>
      <Row >
        <Col xs={2} className="p-0">
          <Sidebar />
        </Col>
        <Col xs={10} className="p-0">
          <Container fluid >
            <TitleComponent title="Dashboard" icon={FaUsersCog} iconColor="white" />
            <Row className="mt-4">
              <Col xs={12} md={4}>
                <CardViewHomePage moduleType="Personal" />
              </Col>
              <Col xs={12} md={4}>
                <CardViewHomePage moduleType="Absences" />
              </Col>
              <Col xs={12} md={4}>
                <CardViewHomePage moduleType="BusnessTrips" />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={12} md={4}>
                <CardViewHomePage moduleType="Addresses" />
              </Col>
              <Col xs={12} md={4}>
                <CardViewHomePage moduleType="Tickets" />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
