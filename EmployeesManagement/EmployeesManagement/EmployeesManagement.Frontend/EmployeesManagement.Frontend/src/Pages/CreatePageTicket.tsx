import { Container, Card, Col, Row } from 'react-bootstrap';
import { ApiClient, Ticket } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaLaptopHouse, FaTicketAlt } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { CreateTicketComponent } from '../Component/CreateTicketComponent';
import { useAdjustHeight } from '../AdjustHeight';

export function CreatePageTicket() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    const handleOnSubmit = async (data) => {
        try {
            console.log("Submitting data to API:", data);
            const response = await client.ticketsContollerPOST(new Ticket(data));
            console.log("API response:", response);
            return response;
        } catch (error) {
            console.error("Error submitting Ticket to API:", error);
            throw error;
        }
    };
    useAdjustHeight('.sidebar', '.content');

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col className="content">
                    <TitleComponent title="New Ticket" icon={FaTicketAlt} iconColor="white" />
                    <Row className="justify-content-center mt-4">
                        <Col md={9}>
                            <Card className="New">
                                <Card.Body>
                                    <CreateTicketComponent
                                        onSubmit={handleOnSubmit}
                                        onSuccess={() => navigate(RoutePaths.HomePageTicket)}
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
