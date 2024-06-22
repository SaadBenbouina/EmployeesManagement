import React, { useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSWR from "swr";
import Sidebar from "../Component/SidebarComponent";
import { ApiClient, Person, Status, WorkStatus } from "../generatedCode/src/generatedCode/generated";
import TitleComponent from "../Component/TitleComponent";
import { FaUsersCog } from "react-icons/fa";
import { useAdjustHeight } from "../AdjustHeight";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import StatusChart from "../Component/StatusChart";
import CountPerDepartmentBarChart from "../Component/CountPerResponsible";

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

const getQueryString = (params: { [key: string]: any }, encode: boolean = true) => {
  const queryString = Object.keys(params)
    .map(key => `${encode ? encodeURIComponent(key) : key}=${encode ? encodeURIComponent(params[key]) : params[key]}`)
    .join("&");
  return queryString;
};

const HomePagePerson: React.FC = () => {
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

  const navigate = useNavigate();

  const getGoToSelection = (status: Status | WorkStatus) => {
    const query = { status: status };
    const queryString = getQueryString(query, true);
    navigate(`${RoutePaths.IndexPagePerson}?${queryString}`);
  };

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
