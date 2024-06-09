import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import CardViewHomePage from './CardViewHomepage';

function HomePage() {
  return (
    <>
      <Container>
        <h1 className="my-4 text-center">Employee Management</h1>
        <Row>
          <Col xs={12} md={6}>
            <CardViewHomePage moduleType="Person" />
          </Col>
          <Col xs={12} md={6}>
            <CardViewHomePage moduleType="Absence" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <CardViewHomePage moduleType="Adress" />
          </Col>
          <Col xs={12} md={6}>
            <CardViewHomePage moduleType="BusnessTrip" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
