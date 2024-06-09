import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import CardViewHomePage from './CardViewHomepage';
import TitleComponent from './TitleComponent';
import { FaUserTie } from 'react-icons/fa';

function HomePage() {
  return (
    
      <Container>
        <TitleComponent title="Personal Management" icon={FaUserTie} iconColor="white" />
        <Row className="mb-4">
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
        <Row>
          <Col xs={12} md={4}>
            <CardViewHomePage moduleType="Adresses" />
          </Col>
          <Col xs={12} md={4}>
            <CardViewHomePage moduleType="Tickets" />
          </Col>
        </Row>
      </Container>
  );
}

export default HomePage;
