import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Adress, ApiClient, IAdress } from "../generatedCode/src/generatedCode/generated";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaUsersCog } from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";
import RoutePaths from "../RouthPaths";
import AdressDetailsCard from "../Component/AdressDetailsCard";

export function EditPageAdress() {
  const { id } = useParams<{ id: string | undefined }>();
  const [adress, setAdress] = useState<Adress | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdress = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data: IAdress = await client.adressGET(parseInt(id));
          setAdress(new Adress(data)); 
        } catch (error) {
          console.error("Error fetching person:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdress();
  }, [id]);
  
  const handleDelete = async () => {
    if (adress) {
      const client = new ApiClient("https://localhost:7088");
      try {
        await client.adressDELETE(adress.id);
        navigate(RoutePaths.HomePageAdress); 
        console.log("Adress deleted");
      } catch (error) {
        console.error("Error deleting adress:", error);
      }
    }
  };

  const refreshParent = async () => {
    if (id) {
      const client = new ApiClient("https://localhost:7088");
      try {
        const data: IAdress = await client.adressGET(parseInt(id));
        setAdress(new Adress(data)); 
      } catch (error) {
        console.error("Error fetching adress:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adress) {
    return <div>No adress found</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar />
        </Col>
        <Col>
          <TitleComponent title="Edit Of All Adress" icon={FaMapMarkerAlt} iconColor="white" />
          <Row className="justify-content-center mt-4">
          <Col md={10}>
              <AdressDetailsCard
                adress={adress}
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
