import { IAdress } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";


interface IProps {
  tableRows?: IAdress[];
  isLoading: boolean;
}

export function IndexTableAdressComponent({ tableRows, isLoading }: IProps) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead >
        <tr>
          <th>ID</th>
          <th>Street</th>
          <th>City</th>
          <th>Room</th>
          <th>State</th>
          <th>Postal Code</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={7} className="text-center">
              Loading...
            </td>
          </tr>
        )}
        {tableRows && tableRows.length == 0 && (
          <tr>
            <td colSpan={7} className="text-center">
              No data - Start creating your first entry
            </td>
          </tr>
        )}
        {tableRows?.map((x) => (
          <tr key={x.id}>
            <td>
              <Link to={RoutePaths.EditPageAdress(x)}>{x.id}</Link>
            </td>
            <td>{x.street}</td>
            <td>{x.city}</td>
            <td>{x.raum}</td>
            <td>{x.state}</td>
            <td>{x.postalCode}</td>
            <td>{x.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  );
}
