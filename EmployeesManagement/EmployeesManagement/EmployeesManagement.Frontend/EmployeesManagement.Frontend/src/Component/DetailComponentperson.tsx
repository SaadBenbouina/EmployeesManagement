import { IPerson, Person } from "../generatedCode/src/generatedCode/generated";
import React from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import EditFormPerson from "./EditFormPerson";
import useToggle from "./useToggle";
import { mapEnumValue, statusMap, workstatusMap } from "../MapFkt/mapForStatus";
import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";

interface IProps {
  person: Person;
  handleDelete?: () => void;
  refreshParent: () => void;
  children?: React.ReactNode;
}

function PersonDetailsCard(props: IProps) {
  const { person, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();

  const handleEdit = async (updatedPerson: Person) => {
    const client = new ApiClient("https://localhost:7088");
    try {
      await client.personsPUT(person.id, updatedPerson);
      refreshParent();
      toggleEditMode();
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="mb-3" />
      <Card.Body>
        <div className="text-center">
          <Card.Title as="h3">
            {person.firstName} {person.lastName} <Badge bg="secondary">{person.id}</Badge>
          </Card.Title>
          <p>{person.salutation}</p>
        </div>

        {editMode ? (
          <EditFormPerson
            itemToUpdate={person}
            toggleEditMode={toggleEditMode}
            refreshParent={refreshParent}
            onSave={handleEdit} // Übergebe die handleEdit-Funktion an das EditFormPerson-Component
          />
        ) : (
          <dl>
            <dt>Status</dt>
            <dd>{mapEnumValue(statusMap, person.status)}</dd>
            
            <dt>Email</dt>
            <dd>
              <a href={"mailto:" + person.email}>{person.email}</a>
            </dd>

            <dt>Department</dt>
            <dd>{person.departement}</dd>

            <dt>Speciality</dt>
            <dd>{person.speciality}</dd>

            <dt>WorkStatus</dt>
            <dd>{mapEnumValue(workstatusMap, person.workStatus)}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={toggleEditMode}>
            Edit
          </Button>
          <Link to={RoutePaths.IndexPagePerson}>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Link>
        </div>
      </Card.Body>
      <ListGroup variant="flush">
        {person.absences && person.absences.length > 0 && (
          <ListGroup.Item>
            <h5>Absences</h5>
            <ul>
              {person.absences.map((absence, index) => (
                <li key={index}>{absence.reason}</li>
              ))}
            </ul>
          </ListGroup.Item>
        )}
        {person.tickets && person.tickets.length > 0 && (
          <ListGroup.Item>
            <h5>Tickets</h5>
            <ul>
              {person.tickets.map((ticket, index) => (
                <li key={index}>{ticket.title}</li>
              ))}
            </ul>
          </ListGroup.Item>
        )}
      </ListGroup>
      {props.children}
    </Card>
  );
}

export default PersonDetailsCard;
