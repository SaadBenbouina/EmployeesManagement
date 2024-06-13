import React, { useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import Sidebar from "../Component/SidebarComponent";
import StatusChart from "../Component/StatusChart"; // Adjust the path as needed
import { Status, ApiClient, Person } from "../generatedCode/src/generatedCode/generated";
import TitleComponent from "../Component/TitleComponent";
import { FaUsersCog } from "react-icons/fa";
import CountPerDepartmentBarChart from "../Component/CountPerResponsible"; // Adjust the path as needed
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";

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
        <Col >
          <TitleComponent title="HomePage Person" icon={FaUsersCog} iconColor="white" />
          <Link to={RoutePaths.IndexPagePerson} className="d-block mb-3">All Personnel</Link>
          <Row fluid>
            <Col md={12}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>Status</h5>
                  <StatusChart data={statusData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row fluid>
            <Col md={12}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>Department</h5>
                  <CountPerDepartmentBarChart data={serverData} />
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
