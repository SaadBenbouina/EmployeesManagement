import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaTicketAlt} from "react-icons/fa";
import Sidebar from "../Component/SidebarComponent";
import TitleComponent from "../Component/TitleComponent";
import RoutePaths from "../RouthPaths";
import { Ticket, ApiClient, ITicket } from "../generatedCode/src/generatedCode/generated";
import { TicketDetailsCard } from "../Component/TicketDetailsCard";

export function EditPageTicket() {
  const { id } = useParams<{ id: string | undefined }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      const client = new ApiClient("https://localhost:7088");
      if (id) {
        try {
          const data: ITicket = await client.ticketsContollerGET(parseInt(id));
          setTicket(new Ticket(data));
        } catch (error) {
          console.error("Error fetching Ticket:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTicket();
  }, [id]);

  const handleDelete = async () => {
    if (ticket) {
      const client = new ApiClient("https://localhost:7088");
      try {
        await client.ticketsContollerDELETE(ticket.id);
        navigate(RoutePaths.HomePageTicket);
        console.log("Ticket deleted");
      } catch (error) {
        console.error("Error deleting Ticket:", error);
      }
    }
  };

  const refreshParent = async () => {
    if (id) {
      const client = new ApiClient("https://localhost:7088");
      try {
        const data: ITicket = await client.ticketsContollerGET(parseInt(id));
        setTicket(new Ticket(data));
      } catch (error) {
        console.error("Error fetching Ticket:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>No Ticket found</div>;
  }

  return (
    <Container fluid>
      <Row>
      <Col xs={2} className="p-0 sidebar">
          <Sidebar />
        </Col>
        <Col>
          <TitleComponent title="Edit Of All Ticket" icon={FaTicketAlt} iconColor="white" />
          <Row className="justify-content-center mt-4">
            <Col md={10}>
              <TicketDetailsCard
                ticket={ticket}
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
