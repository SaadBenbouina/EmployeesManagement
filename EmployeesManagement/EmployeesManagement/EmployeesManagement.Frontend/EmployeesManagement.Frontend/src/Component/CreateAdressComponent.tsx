import { Adress, IAdress,  Status, WorkStatus } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IProps {
    onSubmit: (dto: IAdress) => Promise<Adress>;
    onSuccess: (dto: IAdress) => void;
}

export function CreateAdressComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAdress>();
    const _onSubmit: SubmitHandler<IAdress> = async (data) => {
        try {
            const resp = await onSubmit(data);
            onSuccess(resp);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Form.Group className="mb-3" controlId="Street">
                <Form.Label>Street</Form.Label>
                <Form.Control {...register('street')} type="text" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="City">
                <Form.Label>City</Form.Label>
                <Form.Control {...register('city')} type="text" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="Room">
                <Form.Label>Room</Form.Label>
                <Form.Control {...register('raum')} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="State">
                <Form.Label>State</Form.Label>
                <Form.Control {...register('state')} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Postal Code">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control {...register('postalCode')} type="text" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control {...register('country')} type="text" />
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}