import { Container, Card, Col, Row } from 'react-bootstrap';
import { ApiClient, BusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaLaptopHouse } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { CreateBusnessTripComponent } from '../Component/CreateBusnessComponent';

export function CreatePageBusnessTrip() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col>
                    <TitleComponent title="New Business Trip" icon={FaLaptopHouse} iconColor="white" />
                    <Row className="justify-content-center mt-4">
                        <Col md={9}>
                            <Card className="New">
                                <Card.Body>
                                    <CreateBusnessTripComponent
                                        onSubmit={(data) => client.busnessTripPOST(new BusnessTrip(data))}
                                        onSuccess={() => navigate(RoutePaths.IndexPageBusnessTrip)}                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
