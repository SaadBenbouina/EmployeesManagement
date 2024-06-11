import React, { useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import Sidebar from "../Component/SidebarComponent";
import StatusChart from "../Component/StatusChart"; // Adjust the path as needed
import { Status, ApiClient, Person } from "../generatedCode/src/generatedCode/generated"; 
import TitleComponent from "../Component/TitleComponent";
import { FaUsersCog } from "react-icons/fa";

const client = new ApiClient("https://localhost:7088"); 

const fetchPersons = async () => {
  try {
    const persons = await client.personsAll();
    return persons;
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  }
};

const HomePagePerson: React.FC = () => {
  const { data: serverData, error } = useSWR("persons", fetchPersons);

  const statusData = useMemo(() => {
    if (serverData) {
      return serverData.map((person: Person) => person.status);
    }
    return [];
  }, [serverData]);

  if (error) return <div>Failed to load data</div>;
  if (!serverData) return <div>Loading...</div>;

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar />
        </Col>
        <Col xs={10} className="p-0">
        <TitleComponent title="Dashboard" icon={FaUsersCog} iconColor="white" />
          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>Status</h5>
                  <StatusChart data={statusData} /> 
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  {/* Another chart or component */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePagePerson;
