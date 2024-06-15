import { IPerson, Person, Status, WorkStatus } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IProps {
    onSubmit: (dto: IPerson) => Promise<Person>;
    onSuccess: (dto: IPerson) => void;
}

export function CreatePersonComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPerson>();
    const _onSubmit: SubmitHandler<IPerson> = async (data) => {
        // Konvertieren Sie die String-Werte in numerische Werte für die Enums
        data.status = parseInt(data.status as unknown as string) as unknown as Status;
        data.workStatus = parseInt(data.workStatus as unknown as string) as unknown as WorkStatus;
        try {
            const resp = await onSubmit(data);
            onSuccess(resp);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Form.Group className="mb-3" controlId="salutation">
                <Form.Label>Salutation</Form.Label>
                <Form.Select {...register('salutation')}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control {...register('firstName')} type="text" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control {...register('lastName')} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select {...register('status')}>
                    <option value={Status._0}>Früh</option>
                    <option value={Status._1}>Spät</option>
                    <option value={Status._2}>Nacht</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="workStatus">
                <Form.Label>Work Status</Form.Label>
                <Form.Select {...register('workStatus')}>
                    <option value={WorkStatus._3}>Homeoffice</option>
                    <option value={WorkStatus._4}>WorkAtOffice</option>
                    <option value={WorkStatus._5}>Hybride</option>
                </Form.Select>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control {...register('departement')} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register('email')} type="email" />
            </Form.Group>
    
            {errors?.firstName && <p>{errors.firstName.message}</p>}
            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}