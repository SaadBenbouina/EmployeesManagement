import { Absence, Adress, ApiClient, IAbsence, IAdress, IWorkingTime, Status, WorkStatus, WorkingTime } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateAdressComponent } from "./CreateAdressComponent";

interface IProps {
    onSubmit: (dto: IWorkingTime) => Promise<WorkingTime>;
    onSuccess: (dto: IWorkingTime) => void;
}

export function CreateWorkInfoComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IWorkingTime>();

    const _onSubmit: SubmitHandler<IWorkingTime> = async (data) => {
        try {
            const resp = await onSubmit(data);
            onSuccess(resp);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const client = new ApiClient("https://localhost:7088");

    return (
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Form.Group className="mb-3" controlId="from">
                <Form.Label>From</Form.Label>
                <Form.Control {...register('from')} type="text" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Control {...register('to')} type="text" />
            </Form.Group>

            <CreateAdressComponent
                 onSubmit={(data) => client.adressPOST(new Adress(data))}
                 onSuccess={(address) => console.log("Address saved:", address)}
                 />

            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}
