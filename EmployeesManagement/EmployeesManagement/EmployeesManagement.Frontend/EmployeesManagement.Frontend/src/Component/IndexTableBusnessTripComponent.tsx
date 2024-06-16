import { IBusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";


interface IProps {
  tableRows?: IBusnessTrip[];
  isLoading: boolean;
}

export function IndexTableBusnessTripComponent({ tableRows, isLoading }: IProps) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead >
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
              <Link to={RoutePaths.EditPageBusnessTrip(x)}>{x.id}</Link>
            </td>
            <td>{x.name}</td>
            <td>{x.alone}</td>
            <td>{new Date(x.workInfo.from).toLocaleDateString()}</td> 
            <td>{new Date(x.workInfo.to).toLocaleDateString()}</td> 
            <td>{x.workInfo.adress.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  );
}
