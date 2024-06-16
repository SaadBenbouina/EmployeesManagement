import { IAbsence } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";


interface IProps {
  tableRows?: IAbsence[];
  isLoading: boolean;
}

export function IndexTableAbsenceComponent({ tableRows, isLoading }: IProps) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead >
        <tr>
          <th>ID</th>
          <th>Reason</th>
          <th>From</th>
          <th>To</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={5} className="text-center">
              Loading...
            </td>
          </tr>
        )}
        {tableRows && tableRows.length == 0 && (
          <tr>
            <td colSpan={5} className="text-center">
              No data - Start creating your first entry
            </td>
          </tr>
        )}
        {tableRows?.map((x) => (
          <tr key={x.id}>
            <td>
              <Link to={RoutePaths.EditPageAbsence(x)}>{x.id}</Link>
            </td>
            <td>{x.reason}</td>
            <td>{new Date(x.from).toLocaleDateString()}</td> 
            <td>{new Date(x.to).toLocaleDateString()}</td> 
            <td>{x.approved !== undefined ? x.approved.toString() : "false"}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  );
}
