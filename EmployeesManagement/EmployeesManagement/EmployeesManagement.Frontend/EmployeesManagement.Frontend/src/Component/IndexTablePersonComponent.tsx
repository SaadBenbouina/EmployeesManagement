import { IPerson } from "../generatedCode/src/generatedCode/generated";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";


interface IProps {
  tableRows?: IPerson[];
  isLoading: boolean;
}

export function IndexTablePersonComponent({ tableRows, isLoading }: IProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Workstatus</th>
          <th>Availability</th>
          <th>Department</th>
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
        {tableRows && tableRows.length == 0 && (
          <tr>
            <td colSpan={6} className="text-center">
              No data - Start creating your first entry
            </td>
          </tr>
        )}
        {tableRows?.map((x) => (
          <tr key={x.id}>
            <td>
              <Link to={RoutePaths.EditPagePerson(x)}>{x.id}</Link>
            </td>
            <td>{x.firstName}</td>
            <td>{x.lastName}</td>
            <td>{x.status}</td>
            <td>{x.absenceStatus}</td>
            <td>{x.departement}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
