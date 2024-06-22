import { Container, Card, Col, Row } from 'react-bootstrap';
import { ApiClient, BusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { CreateBusnessTripComponent } from '../Component/CreateBusnessComponent';
import { MdBusinessCenter } from 'react-icons/md';
import { Sidebar } from '../Component/SidebarComponent';
import { TitleComponent } from '../Component/TitleComponent';

export function CreatePageBusnessTrip() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    const handleOnSubmit = async (data) => {
        try {
            console.log("Submitting data to API:", data);
            const response = await client.busnessTripPOST(new BusnessTrip(data));
            console.log("API response:", response);
            return response;
        } catch (error) {
            console.error("Error submitting business trip to API:", error);
            throw error;
        }
    };

    return (
        <Container fluid>
            <Row>
            <Col xs={2} className="p-0 sidebar">
                    <Sidebar />
                </Col>
                <Col>
                    <TitleComponent title="New Business Trip" icon={MdBusinessCenter} iconColor="white" />
                    <Row className="justify-content-center mt-4">
                        <Col md={9}>
                            <Card className="New">
                                <Card.Body>
                                    <CreateBusnessTripComponent
                                        onSubmit={handleOnSubmit}
                                        onSuccess={() => navigate(RoutePaths.HomePageBusnessTrip)}
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
