import { ApiClient, ITicket, Person } from "../generatedCode/src/generatedCode/generated";
import { Link } from "react-router-dom";
import RoutePaths from "../RouthPaths";
import { useEffect, useState } from "react";

interface IProps {
  tableRows?: ITicket[];
  isLoading: boolean;
}

export function IndexTableTicketComponent({ tableRows, isLoading }: IProps) {
  const client = new ApiClient("https://localhost:7088");
  const [PersonMap, setPersonMap] = useState<{ [key: number]: string }>({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPersones = async () => {
      if (tableRows && tableRows.length > 0) {
        console.log("Ticket objects:", tableRows);

        // Filter out rows without responsibleId
        const validRows = tableRows.filter(ticket => ticket.responsibleId !== undefined) as ITicket[];
        
        const uniquePersonIds = [...new Set(validRows.map(ticket => ticket.responsibleId))] as number[];
        const missingPersonIds = uniquePersonIds.filter(id => !PersonMap[id]);

        if (missingPersonIds.length > 0) {
          setIsFetching(true);
          const PersonPromises = missingPersonIds.map(id => client.personsGET(id));
          try {
            const Persones = await Promise.all(PersonPromises);
            const newPersonMap = Persones.reduce((map, Person) => {
              map[Person.id] = Person.lastName;
              return map;
            }, {} as { [key: number]: string });

            setPersonMap(prevMap => ({ ...prevMap, ...newPersonMap }));
            console.log("Fetched and merged person data:", newPersonMap);
          } catch (error) {
            console.error("Error fetching persons:", error);
          } finally {
            setIsFetching(false);
          }
        }
      }
    };
    fetchPersones();
  }, [tableRows, client, PersonMap]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Attributed</th>
            <th>Completed</th>
            <th>Responsible</th>
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
                <Link to={RoutePaths.EditPageTickets(x)}>{x.id}</Link>
              </td>
              <td>{x.title}</td>
              <td>{new Date(x.deadline).toLocaleDateString()}</td>
              <td>{x.attributed ? "Attributed" : "Not Attributed"}</td>
              <td>{x.completed ? "Completed" : "In Progress"}</td>
              <td>
                {x.responsibleId === undefined 
                  ? "Not Assigned" 
                  : (PersonMap[x.responsibleId] || "Loading...")}
              </td>            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
