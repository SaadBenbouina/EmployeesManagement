import { Adress  } from "../generatedCode/src/generatedCode/generated";
import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import useToggle from "./useToggle";
import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { EditFormAdress } from "./EditFormAdress";

interface IProps {
  adress: Adress;
  handleDelete?: () => void;
  refreshParent: () => void;
  children?: React.ReactNode;
}

export function AdressDetailsCard(props: IProps) {
  const { adress, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();

  const handleEdit = async (updatedAdress: Adress) => {
    const client = new ApiClient("https://localhost:7088");
    try {
      await client.adressPUT(adress.id, updatedAdress);
      refreshParent();
      toggleEditMode();
    } catch (error) {
      console.error("Error updating adress:", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="mb-3" />
      <Card.Body>
        <div className="text-center">
          <Card.Title as="h3">
            <Badge bg="secondary">{adress.id}</Badge>
          </Card.Title>
          <p>{adress.country}</p>
        </div>

        {editMode ? (
          <EditFormAdress
            itemToUpdate={adress}
            toggleEditMode={toggleEditMode}
            refreshParent={refreshParent}
            onSave={handleEdit} 
          />
        ) : (
            
            <dl>
            <dt>Street</dt>
            <dd>{adress.street}</dd>
            
            <dt>City</dt>
            <dd>{adress.city}</dd>


            <dt>Room</dt>
            <dd>{adress.raum}</dd>

            <dt>State</dt>
            <dd>{adress.state}</dd>

            <dt>Postal Code</dt>
            <dd>{adress.postalCode}</dd>

            <dt>Country</dt>
            <dd>{adress.country}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={toggleEditMode}>
            Edit
          </Button>
          <Link to={RoutePaths.HomePageAdress}>
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

