import { ApiClient, IBusnessTrip, Adress } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { useEffect, useState } from "react";

interface IProps {
  tableRows?: IBusnessTrip[];
  isLoading: boolean;
}

export function IndexTableBusnessTripComponent({ tableRows, isLoading }: IProps) {
  const client = new ApiClient("https://localhost:7088");
  const [addressMap, setAddressMap] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchAddresses = async () => {
      if (tableRows && tableRows.length > 0) {
        console.log("BusnessTrip objects:", tableRows); 

        const uniqueAddressIds = [...new Set(tableRows.map(trip => trip.adressId))];
        const missingAddressIds = uniqueAddressIds.filter(id => !addressMap[id]);

        if (missingAddressIds.length > 0) {
          const addressPromises = missingAddressIds.map(id => client.adressGET(id));
          const addresses = await Promise.all(addressPromises);
          const newAddressMap = addresses.reduce((map, address) => {
            map[address.id] = address.city;
            return map;
          }, {} as { [key: number]: string });

          setAddressMap(prevMap => ({ ...prevMap, ...newAddressMap }));
          console.log("BusnessTrip objects22:", tableRows); 
          // Update tableRows with the fetched addresses
          tableRows.forEach(trip => {
            trip.adress = addresses.find(address => address.id === trip.adressId);
          });

          console.log("Updated BusnessTrip objects:", tableRows);

        }
      }
    };
    fetchAddresses();
  }, [tableRows, client, addressMap]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>For One Person</th>
            <th>From</th>
            <th>To</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6} className="text-center">
                Loading...
              </td>
            </tr>
          )}
          {!isLoading && tableRows && tableRows.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No data - Start creating your first entry
              </td>
            </tr>
          )}
          {!isLoading && tableRows?.map((x) => (
            <tr key={x.id}>
              <td>
                <Link to={RoutePaths.EditPageBusnessTrip(x)}>{x.id}</Link>
              </td>
              <td>{x.name}</td>
              <td>{x.alone ? "alone" : "group"}</td>
              <td>{new Date(x.from).toLocaleDateString()}</td>
              <td>{new Date(x.to).toLocaleDateString()}</td>
              <td>{addressMap[x.adressId] || "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
