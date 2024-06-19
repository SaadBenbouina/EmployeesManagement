import { BusnessTrip } from "../generatedCode/src/generatedCode/generated";
import React, { useState, useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import useToggle from "./useToggle";
import { ApiClient } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import EditFormBusnessTrip from "./EditFormBusnessTrip";

interface IProps {
  busnissTrip: BusnessTrip;
  handleDelete?: () => void;
  refreshParent: () => void;
  children?: React.ReactNode;
}

function BusnissTripDetailsCard(props: IProps) {
  const { busnissTrip, refreshParent, handleDelete } = props;
  const [editMode, toggleEditMode] = useToggle();
  const [addressMap, setAddressMap] = useState<{ [key: number]: string }>({});
  const client = new ApiClient("https://localhost:7088");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const uniqueAddressIds = [busnissTrip.adressId];
        const addressPromises = uniqueAddressIds.map(id => client.adressGET(id));
        const addresses = await Promise.all(addressPromises);
        const addressMap = addresses.reduce((map: { [key: number]: string }, address: Address) => {
          map[address.id] = address.city;
          return map;
        }, {});
        setAddressMap(addressMap);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [busnissTrip.adressId]);

  const handleEdit = async (updatedBusnissTrip: BusnessTrip) => {
    console.log("Updated BusnissTrip to be sent to API:", updatedBusnissTrip);
    try {
      console.log("Calling BusnissTripsPUT...");
      await client.busnessTripPUT(busnissTrip.id, updatedBusnissTrip);
      console.log("API call successful, BusnissTrip updated");
      refreshParent();
      toggleEditMode();
    } catch (error) {
      console.error("Error updating BusnissTrip:", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="mb-3" />
      <Card.Body>
        <div className="text-center">
          <Card.Title as="h3">
            <Badge bg="secondary">{busnissTrip.id}</Badge>
          </Card.Title>
          <p>{busnissTrip.id}</p>
        </div>

        {editMode ? (
          <EditFormBusnessTrip
            itemToUpdate={busnissTrip}
            toggleEditMode={toggleEditMode}
            refreshParent={refreshParent}
            onSave={handleEdit}
          />
        ) : (
          <dl>
            <dt>Title</dt>
            <dd>{busnissTrip.name}</dd>

            <dt>Alone</dt>
            <dd>{busnissTrip.alone !== undefined ? (busnissTrip.alone ? "True" : "False") : "False"}</dd>
            
            <dt>From</dt>
            <dd>{new Date(busnissTrip.from).toDateString()}</dd>

            <dt>To</dt>
            <dd>{new Date(busnissTrip.to).toDateString()}</dd>

            <dt>City</dt>
            <dd>{addressMap[busnissTrip.adressId] || "Loading..."}</dd>
          </dl>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="me-1" variant="primary" onClick={() => {
            console.log("Edit button clicked, current BusnissTrip:", busnissTrip);
            toggleEditMode();
          }}>
            Edit
          </Button>
          <Link to={RoutePaths.IndexPageBusnessTrip}>
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

export default BusnissTripDetailsCard;
