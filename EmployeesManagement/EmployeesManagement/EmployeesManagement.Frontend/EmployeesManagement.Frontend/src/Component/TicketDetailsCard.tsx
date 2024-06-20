import {  Ticket } from "../generatedCode/src/generatedCode/generated";
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
  const { ticket, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();
  const [personMap, setPersonMap] = useState<{ [key: number]: string }>({});
  const client = new ApiClient("https://localhost:7088");

  useEffect(() => {
    const fetchPerson = async () => {
      if (ticket.responsibleId !== undefined) {
        try {
          const person = await client.personsGET(ticket.responsibleId);
          setPersonMap(prevMap => ({
            ...prevMap,
            [person.id]: person.lastName
          }));
        } catch (error) {
          console.error("Error fetching person:", error);
        }
      }
    };

    fetchPerson();
  }, [ticket.responsibleId]);

  const handleEdit = async (updatedTicket: Ticket) => {
    console.log("UpdatedTicket to be sent to API:", updatedTicket);
    try {
      console.log("CallingTicketsPUT...");
      await client.ticketsContollerPUT(ticket.id, updatedTicket);
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
            <dd>{ticket.completed ? "Completed" : "In Progress"}</dd>
            
            <dt>Attributed</dt>
            <dd>{ticket.attributed ? "Attributed" : "Not Attributed"}</dd>

            <dt>Deadline</dt>
            <dd>{new Date(ticket.deadline).toDateString()}</dd>

            <dt>Responsible</dt>
            <dd>{ticket.responsibleId !== undefined ? personMap[ticket.responsibleId] || "Loading..." : "Not Assigned"}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={() => {
            console.log("Edit button clicked, currentTicket:", ticket);
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
