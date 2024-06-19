import { Container, Card, Col, Row } from 'react-bootstrap';
import { Adress, ApiClient, BusnessTrip, IBusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaLaptopHouse } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { CreateBusnessTripComponent } from '../Component/CreateBusnessComponent';

export function CreatePageBusnessTrip() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();

    const handleOnSubmit = async (data: Omit<IBusnessTrip, 'id'>) => {
        try {
            console.log("Submitting data to API:", data);
            const address: Adress = await client.adressGET(data.adressId);
            console.log("Fetched address:", address);
            
            const busnessTripData: IBusnessTrip = {
                ...data,
                id: 0, 
                adress: address,
            };

            const response = await client.busnessTripPOST(new BusnessTrip(busnessTripData));
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
