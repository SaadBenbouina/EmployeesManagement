import { Container, Card, Col, Row } from 'react-bootstrap'; 
import { Absence, Adress, ApiClient } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import {  FaRegCalendarAlt } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { CreateAbsenceComponent } from '../Component/CreateAbsenceComponent';

export function CreatePageAbsence() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    return (
      <Container fluid>
          <Row>
          <Col xs={2} className="p-0 sidebar">
                  <Sidebar />
              </Col>
              <Col>
                  <TitleComponent title="New Absence" icon={FaRegCalendarAlt} iconColor="white" />
                  <Row className="justify-content-center mt-4">
                      <Col md={9}>
                          <Card className="New">
                              <Card.Body>
                                  <CreateAbsenceComponent
                                      onSubmit={(data) => client.absencesPOST(new Absence(data))}
                                      onSuccess={() => navigate(RoutePaths.HomePageAbsence)}
                                  />
                              </Card.Body>
                          </Card>
                      </Col>
                  </Row>
              </Col>
          </Row>
      </Container>
  );
}