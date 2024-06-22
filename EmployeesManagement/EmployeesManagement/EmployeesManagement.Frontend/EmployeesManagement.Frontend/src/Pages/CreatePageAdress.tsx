import { Container, Card, Col, Row } from 'react-bootstrap'; 
import { Adress, ApiClient } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CreateAdressComponent } from '../Component/CreateAdressComponent';
import { Sidebar } from '../Component/SidebarComponent';
import { TitleComponent } from '../Component/TitleComponent';

export function CreatePageAdress() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    return (
      <Container fluid>
          <Row>
          <Col xs={2} className="p-0 sidebar">
                  <Sidebar />
              </Col>
              <Col>
                  <TitleComponent title="New Adress" icon={FaMapMarkerAlt} iconColor="white" />
                  <Row className="justify-content-center mt-4">
                      <Col md={9}>
                          <Card className="New">
                              <Card.Body>
                                  <CreateAdressComponent
                                      onSubmit={(data) => client.adressPOST(new Adress(data))}
                                      onSuccess={() => navigate(RoutePaths.HomePageAdress)}
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