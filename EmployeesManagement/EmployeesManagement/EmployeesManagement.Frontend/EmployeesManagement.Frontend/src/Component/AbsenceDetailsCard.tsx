import { Absence } from "../generatedCode/src/generatedCode/generated";
import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import useToggle from "./useToggle";
import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import EditFormAbsence from "./EditFormAbsence";

interface IProps {
  absence: Absence;
  handleDelete?: () => void;
  refreshParent: () => void;
  children?: React.ReactNode;
}

function AbsenceDetailsCard(props: IProps) {
  const { absence, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();

  const handleEdit = async (updatedAbsence: Absence) => {
    console.log("Updated absence to be sent to API:", updatedAbsence);
    const client = new ApiClient("https://localhost:7088");
    try {
      console.log("Calling absencesPUT...");
      await client.absencesPUT(absence.id, updatedAbsence);
      console.log("API call successful, absence updated");
      refreshParent();
      toggleEditMode();
    } catch (error) {
      console.error("Error updating Absence:", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="mb-3" />
      <Card.Body>
        <div className="text-center">
          <Card.Title as="h3">
            <Badge bg="secondary">{absence.id}</Badge>
          </Card.Title>
          <p>{absence.id}</p>
        </div>

        {editMode ? (
          <EditFormAbsence
            itemToUpdate={absence}
            toggleEditMode={toggleEditMode}
            refreshParent={refreshParent}
            onSave={handleEdit}
          />
        ) : (
          <dl>
            <dt>Reason</dt>
            <dd>{absence.reason}</dd>
            
            <dt>From</dt>
            <dd>{absence.from.toDateString()}</dd>

            <dt>To</dt>
            <dd>{absence.to.toDateString()}</dd>

            <dt>Approved</dt>
            <dd>{absence.approved !== undefined ? (absence.approved ? "True" : "False") : "False"}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={() => {
            console.log("Edit button clicked, current absence:", absence);
            toggleEditMode();
          }}>
            Edit
          </Button>
          <Link to={RoutePaths.HomePageAbsence}>
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

export default AbsenceDetailsCard;
