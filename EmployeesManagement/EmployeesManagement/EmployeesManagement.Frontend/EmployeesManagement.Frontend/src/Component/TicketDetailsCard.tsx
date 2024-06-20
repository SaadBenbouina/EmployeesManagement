import { Person, Ticket } from "../generatedCode/src/generatedCode/generated";
import React, { useState, useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import useToggle from "./useToggle";
import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import EditFormTicket from "./EditFormTicket";

interface IProps {
 ticket: Ticket;
  handleDelete?: () => void;
  refreshParent: () => void;
  children?: React.ReactNode;
}

export function TicketDetailsCard(props: IProps) {
  const {ticket, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();
  const [personMap, setPersonMap] = useState<{ [key: number]: string }>({});
  const client = new ApiClient("https://localhost:7088");

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const uniquePersonIds = [ticket.responsibleId];
        const addressPromises = uniquePersonIds.map(id => client.personsGET(id));
        const person = await Promise.all(addressPromises);
        const addressMap = person.reduce((map: { [key: number]: string },person: Person) => {
          map[person.id] = person.lastName;
          return map;
        }, {});
        setPersonMap(personMap);
      } catch (error) {
        console.error("Error fetching person:", error);
      }
    };

    fetchPerson();
  }, [ticket.responsibleId]);

  const handleEdit = async (updatedticket: Ticket) => {
    console.log("UpdatedTicket to be sent to API:", updatedticket);
    try {
      console.log("CallingTicketsPUT...");
      await client.ticketsContollerPUT(ticket.id, updatedticket);
      console.log("API call successful,Ticket updated");
      refreshParent();
      toggleEditMode();
    } catch (error) {
      console.error("Error updatingTicket:", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="mb-3" />
      <Card.Body>
        <div className="text-center">
          <Card.Title as="h3">
            <Badge bg="secondary">{ticket.id}</Badge>
          </Card.Title>
          <p>{ticket.id}</p>
        </div>

        {editMode ? (
          <EditFormTicket
            itemToUpdate={ticket}
            toggleEditMode={toggleEditMode}
            refreshParent={refreshParent}
            onSave={handleEdit}
          />
        ) : (
          <dl>
            <dt>Title</dt>
            <dd>{ticket.title}</dd>

            <dt>Description</dt>
            <dd>{ticket.description}</dd>

            <dt>Status</dt>
            <dd>{ticket.completed !== undefined ? (ticket.completed ? "Completed" : "in Progress") : "group"}</dd>
            
            <dt>Attributed</dt>
            <dd>{ticket.attributed !== undefined ? (ticket.attributed ? "Attributed" : "Not Attributed") : "group"}</dd>

            <dt>Deadline</dt>
            <dd>{new Date(ticket.deadline).toDateString()}</dd>

            <dt>Responsible</dt>
            <dd>{personMap[ticket.responsibleId] || "Loading..."}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={() => {
            console.log("Edit button clicked, currentTicket:",Ticket);
            toggleEditMode();
          }}>
            Edit
          </Button>
          <Link to={RoutePaths.IndexPageTickets}>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Link>
        </div>
      </Card.Body>
      {props.children}
    </Card>
  );
}

