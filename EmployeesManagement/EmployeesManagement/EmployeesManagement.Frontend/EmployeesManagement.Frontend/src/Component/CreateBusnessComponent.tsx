import { ApiClient, BusnessTrip, IBusnessTrip, WorkingTime } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateWorkInfoComponent } from "./CreateWorkInfoComponent";

interface IProps {
    onSubmit: (dto: IBusnessTrip) => Promise<BusnessTrip>;
    onSuccess: (dto: IBusnessTrip) => void;
}

export function CreateBusnessTripComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBusnessTrip>();
    const _onSubmit: SubmitHandler<IBusnessTrip> = async (data) => {
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
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control {...register('name', { required: true })} type="text" />
                {errors.name && <p className="text-danger">Title is required</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="alone">
                <Form.Label>Alone</Form.Label>
                <Form.Select {...register('alone', { required: true })}>
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
                {errors.alone && <p className="text-danger">Please select an option</p>}
            </Form.Group>

            <h5>Work Info</h5>
            <CreateWorkInfoComponent
                onSubmit={(data) => client.workingTimePOST(new WorkingTime(data))}
                onSuccess={(WorkingTime) => console.log("WorkInfo saved:", WorkingTime)}
            />

           
        </form>
    );
}
