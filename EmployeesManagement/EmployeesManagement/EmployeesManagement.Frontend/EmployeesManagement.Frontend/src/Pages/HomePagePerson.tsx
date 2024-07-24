import  { useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import { ApiClient, Person} from "../generatedCode/src/generatedCode/generated";
import { FaUsersCog } from "react-icons/fa";
import { useAdjustHeight } from "../AdjustHeight";
import StatusChart from "../Component/StatusChart";
import CountPerDepartmentBarChart from "../Component/CountPerResponsible";
import { Sidebar } from "../Component/SidebarComponent";
import { TitleComponent } from "../Component/TitleComponent";

const client = new ApiClient("https://localhost:7088");

const fetchPersons = async () => {
    const persons = await client.personsAll();
    return persons;
};

function HomePagePerson ()  {
  const { data: serverData, error } = useSWR("persons", fetchPersons);

  const statusData = useMemo(() => {
    if (serverData) {
      return serverData.map((person: Person) => person.status);
    }
    return [];
  }, [serverData]);

  const workstatusData = useMemo(() => {
    if (serverData) {
      return serverData.map((person: Person) => person.workStatus);
    }
    return [];
  }, [serverData]);

  useAdjustHeight('.sidebar', '.content');

  if (error) return <div>Failed to load data</div>;
  if (!serverData) return <div>Loading...</div>;

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0 sidebar">
          <Sidebar />
        </Col>
        <Col className="content">
          <TitleComponent title="HomePage Person" icon={FaUsersCog} iconColor="white" />
          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>Status</h5>
                  <StatusChart data={statusData}  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>WorkStatus</h5>
                  <StatusChart data={workstatusData}  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
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
