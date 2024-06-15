import { IPerson } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { absenceStatusMap, mapEnumValue, statusMap } from "../MapFkt/mapForStatus";


interface IProps {
  tableRows?: IPerson[];
  isLoading: boolean;
}

export function IndexTablePersonComponent({ tableRows, isLoading }: IProps) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead >
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>status</th>
          <th>Workstatus</th>
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
            <td>{mapEnumValue(statusMap, x.status)}</td> {}
            <td>{mapEnumValue(absenceStatusMap, x.status)}</td> {}
            <td>{x.departement}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  );
}
