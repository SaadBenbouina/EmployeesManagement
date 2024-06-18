import { Container, Card, Col, Row } from 'react-bootstrap';
import { Adress, ApiClient, BusnessTrip, IBusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { FaLaptopHouse } from 'react-icons/fa';
import Sidebar from '../Component/SidebarComponent';
import TitleComponent from '../Component/TitleComponent';
import { useEffect, useState } from 'react';
import { CreateBusnessTripComponent } from '../Component/CreateBusnessComponent';

export function CreatePageBusnessTrip() {
    const client = new ApiClient("https://localhost:7088");
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<Adress[]>([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const result = await client.adressAll();
                setAddresses(result);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        fetchAddresses();
    }, []);

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
                                        onSubmit={async (data) => {
                                            try {
                                                console.log("Submitting data:", data);

                                                // Fetch the address object using the selected address ID
                                                const selectedAddress = await client.adressGET(data.adressId);
                                                if (!selectedAddress) throw new Error('Selected address not found');

                                                // Create a new BusnessTrip object
                                                const businessTripData: IBusnessTrip = {
                                                    ...data,
                                                    adress: selectedAddress, // Ensure this is an Adress object
                                                    id: 0
                                                };

                                                console.log("Final businessTripData:", businessTripData);

                                                await client.busnessTripPOST(new BusnessTrip(businessTripData));
                                            } catch (error) {
                                                console.error("Error submitting business trip:", error);
                                                throw error;
                                            }
                                        }}
                                        onSuccess={() => navigate(RoutePaths.IndexPageBusnessTrip)}
                                        addresses={addresses}
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
