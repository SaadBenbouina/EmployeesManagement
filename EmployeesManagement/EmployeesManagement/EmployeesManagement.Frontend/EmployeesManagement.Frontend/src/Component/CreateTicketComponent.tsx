import { ApiClient, Ticket, ITicket, Person } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

interface IProps {
    onSubmit: (dto: Omit<ITicket, 'id'>) => Promise<ITicket>;
    onSuccess: () => void;
}

export function CreateTicketComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues
    } = useForm();
    const [persons, setPersons] = useState<Person[]>([]);
    const client = new ApiClient("https://localhost:7088");

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const result = await client.personsAll();
                setPersons(result);
            } catch (error) {
                console.error("Error fetching persons:", error);
            }
        };
        fetchPersons();
    }, []);

    const _onSubmit: SubmitHandler<any> = async (data) => {
        try {
            // Only keep the fields required by the API
            const submitData: Omit<ITicket, 'id'> = {
                description: data.description,
                title: data.title,
                deadline: new Date(data.deadline),
                responsibleId: parseInt(data.responsibleId),
                attributed: data.attributed === "true",
                completed: data.completed === "true"
            };
            console.log("Submitting data:", submitData);
            await onSubmit(submitData);
            onSuccess();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control {...register('title', { required: true })} type="text" />
                {errors.title && <p className="text-danger">Title is required</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control {...register('description', { required: true })} type="text" />
                {errors.description && <p className="text-danger">Description is required</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="attributed">
                <Form.Label>Attributed</Form.Label>
                <Form.Select {...register('attributed', { required: true })}>
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
                {errors.attributed && <p className="text-danger">Please select an option</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="completed">
                <Form.Label>Completed</Form.Label>
                <Form.Select {...register('completed', { required: true })}>
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
                {errors.completed && <p className="text-danger">Please select an option</p>}
            </Form.Group>

            <h5>Work Info</h5>
            <Form.Group className="mb-3" controlId="deadline">
                <Form.Label>Deadline</Form.Label>
                <Controller
                    name="deadline"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                        />
                    )}
                />
                {errors.deadline && <span className="text-danger">This field is required</span>}
            </Form.Group>

            <h5>Responsible Person</h5>
            <Form.Group className="mb-3" controlId="responsibleId">
                <Form.Label>Responsible</Form.Label>
                <Form.Select {...register('responsibleId', { required: true })}>
                    <option value="">Select...</option>
                    {persons.map((person) => (
                        <option key={person.id} value={person.id.toString()}>
                            {person.lastName}, {person.firstName}
                        </option>
                    ))}
                </Form.Select>
                {errors.responsibleId && <p className="text-danger">Responsible person is required</p>}
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}
