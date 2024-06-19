import { ApiClient, ITicket } from "../generatedCode/src/generatedCode/generated";
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

  useEffect(() => {
    const fetchPersones = async () => {
      if (tableRows && tableRows.length > 0) {
        console.log("Ticket objects:", tableRows);

        const uniquePersonIds = [...new Set(tableRows.map(ticket => ticket.responsibleId).filter(id => id !== undefined))] as number[];
        const missingPersonIds = uniquePersonIds.filter(id => !PersonMap[id]);

        if (missingPersonIds.length > 0) {
          const PersonPromises = missingPersonIds.map(id => client.personsGET(id));
          const Persones = await Promise.all(PersonPromises);
          const newPersonMap = Persones.reduce((map, Person) => {
            map[Person.id] = Person.lastName;
            return map;
          }, {} as { [key: number]: string });

          setPersonMap(prevMap => ({ ...prevMap, ...newPersonMap }));
          console.log("Ticket objects22:", tableRows);
          
          // Update tableRows with the fetched Persones
          tableRows.forEach(ticket => {
            ticket.responsible = Persones.find(Person => Person.id === ticket.responsibleId);
          });

          console.log("Updated Ticket objects:", tableRows);
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
              <td>{x.attributed ? "yes" : "no"}</td>
              <td>{x.completed ? "yes" : "no"}</td>
              <td>{x.responsibleId !== undefined ? PersonMap[x.responsibleId] || "Loading..." : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
