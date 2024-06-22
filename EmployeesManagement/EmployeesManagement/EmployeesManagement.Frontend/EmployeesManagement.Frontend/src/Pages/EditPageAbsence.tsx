import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegCalendarAlt, FaUsersCog } from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";
import RoutePaths from "../RouthPaths";
import { Absence, ApiClient, IAbsence } from "../generatedCode/src/generatedCode/generated";
import AbsenceDetailsCard from "../Component/AbsenceDetailsCard";

export function EditPageAbsence() {
  const { id } = useParams<{ id: string | undefined }>();
  const [absence, setAbsence] = useState<Absence | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbsence = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data: IAbsence = await client.absencesGET(parseInt(id));
          setAbsence(new Absence(data)); 
        } catch (error) {
          console.error("Error fetching absence:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAbsence();
  }, [id]);
  
  const handleDelete = async () => {
    if (absence) {
      const client = new ApiClient("https://localhost:7088");
      try {
        await client.absencesDELETE(absence.id);
        navigate(RoutePaths.HomePageAbsence); 
        console.log("Absence deleted");
      } catch (error) {
        console.error("Error deleting absence:", error);
      }
    }
  };

  const refreshParent = async () => {
    if (id) {
      const client = new ApiClient("https://localhost:7088");
      try {
        const data: IAbsence = await client.absencesGET(parseInt(id));
        setAbsence(new Absence(data)); 
      } catch (error) {
        console.error("Error fetching Absence:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!absence) {
    return <div>No Absence found</div>;
  }

  return (
    <Container fluid>
      <Row>
      <Col xs={2} className="p-0 sidebar">
          <Sidebar />
        </Col>
        <Col>
          <TitleComponent title="Edit Of All Absence" icon={FaRegCalendarAlt} iconColor="white" />
          <Row className="justify-content-center mt-4">
          <Col md={10}>
              <AbsenceDetailsCard
                absence={absence}
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
