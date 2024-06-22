import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap'; 
import { ApiClient, Person } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import { CreatePersonComponent } from "../Component/CreatePersonComponent";
import RoutePaths from "../RouthPaths";
import { FaUsersCog } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { useAdjustHeight } from '../AdjustHeight';

export function CreatePagePerson() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();
    useAdjustHeight('.sidebar', '.content');

    return (
      <Container fluid>
          <Row>
          <Col xs={2} className="p-0 sidebar">
                  <Sidebar />
              </Col>
              <Col className="content">
                  <TitleComponent title="New Personal" icon={FaUsersCog} iconColor="white" />
                  <Row className="justify-content-center mt-4">
                      <Col md={9}>
                          <Card className="New">
                              <Card.Body>
                                  <CreatePersonComponent
                                      onSubmit={(data) => client.personsPOST(new Person(data))}
                                      onSuccess={() => navigate(RoutePaths.IndexPagePerson)}
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