import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiClient, IPerson } from "../generatedCode/src/generatedCode/generated";
import PersonDetailsCard from "../Component/DetailComponentperson";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsersCog } from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";

export function DetailPagePerson() {
  const { id } = useParams<{ id: string | undefined }>();
  const [person, setPerson] = useState<IPerson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data = await client.personsGET(parseInt(id));
          setPerson(data);
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
        // Redirect or update the parent component
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
        const data = await client.personsGET(parseInt(id));
        setPerson(data);
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
        <Col xs={2} className="p-0">
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
