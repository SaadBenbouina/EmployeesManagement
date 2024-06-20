import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsersCog } from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";
import RoutePaths from "../RouthPaths";
import { BusnessTrip, ApiClient, IBusnessTrip } from "../generatedCode/src/generatedCode/generated";
import BusnissTripDetailsCard from "../Component/BusnessTripDetailCard";
import { MdBusinessCenter } from "react-icons/md";

export function EditPageBusnessTrip() {
  const { id } = useParams<{ id: string | undefined }>();
  const [busnessTrip, setBusnessTrip] = useState<BusnessTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusnessTrip = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data: IBusnessTrip = await client.busnessTripGET(parseInt(id));
          setBusnessTrip(new BusnessTrip(data));
        } catch (error) {
          console.error("Error fetching BusnessTrip:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBusnessTrip();
  }, [id]);

  const handleDelete = async () => {
    if (busnessTrip) {
      const client = new ApiClient("https://localhost:7088");
      try {
        await client.busnessTripDELETE(busnessTrip.id);
        navigate(RoutePaths.HomePageBusnessTrip);
        console.log("BusnessTrip deleted");
      } catch (error) {
        console.error("Error deleting BusnessTrip:", error);
      }
    }
  };

  const refreshParent = async () => {
    if (id) {
      const client = new ApiClient("https://localhost:7088");
      try {
        const data: IBusnessTrip = await client.busnessTripGET(parseInt(id));
        setBusnessTrip(new BusnessTrip(data));
      } catch (error) {
        console.error("Error fetching BusnessTrip:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!busnessTrip) {
    return <div>No BusnessTrip found</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar />
        </Col>
        <Col>
          <TitleComponent title="Edit Of All BusnessTrip" icon={MdBusinessCenter} iconColor="white" />
          <Row className="justify-content-center mt-4">
            <Col md={10}>
              <BusnissTripDetailsCard
                busnissTrip={busnessTrip}
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
