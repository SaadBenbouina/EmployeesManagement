import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiClient, IPerson, Person } from "../generatedCode/src/generatedCode/generated";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsersCog } from "react-icons/fa";
import RoutePaths from "../RouthPaths";
import PersonDetailsCard from "../Component/PersonDetailsCard";
import { Sidebar } from "../Component/SidebarComponent";
import { TitleComponent } from "../Component/TitleComponent";

export function DetailPagePerson() {
  const { id } = useParams<{ id: string | undefined }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerson = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data: IPerson = await client.personsGET(parseInt(id));
          setPerson(new Person(data)); 
        } catch (error) {
          console.error("Error fetching person:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPerson();
  }, [id]);

  const handleDelete = async () => {
    if (person) {
      const client = new ApiClient("https://localhost:7088");
      try {
        await client.personsDELETE(person.id);
        navigate(RoutePaths.IndexPagePerson); 
        console.log("Person deleted");
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    }
  };

  const refreshParent = async () => {
    if (id) {
      const client = new ApiClient("https://localhost:7088");
      try {
        const data: IPerson = await client.personsGET(parseInt(id));
        setPerson(new Person(data)); 
      } catch (error) {
        console.error("Error fetching person:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!person) {
    return <div>No person found</div>;
  }

  return (
    <Container fluid>
      <Row>
      <Col xs={2} className="p-0 sidebar">
          <Sidebar />
        </Col>
        <Col>
          <TitleComponent title="List Of All Personal" icon={FaUsersCog} iconColor="white" />
          <Row className="justify-content-center mt-4">
            <Col md={10}>
              <PersonDetailsCard
                person={person}
                refreshParent={refreshParent}
                handleDelete={handleDelete}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
