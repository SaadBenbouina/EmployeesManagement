import {  ApiClient, BusnessTrip,  IBusnessTrip, WorkingTime,  } from "../generatedCode/src/generatedCode/generated";
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
                <Form.Control {...register('name')} type="text" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="alone">
                <Form.Label>From</Form.Label>
                <Form.Control {...register('alone')} type="text" />
            </Form.Group>

            <CreateWorkInfoComponent
                 onSubmit={(data) => client.workingTimePOST(new WorkingTime(data))}
                 onSuccess={(WorkingTime) => console.log("WorkInfo saved:", WorkingTime)}
                 />
    
            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}