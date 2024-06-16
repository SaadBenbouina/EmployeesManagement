import { Absence, IAbsence } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
    onSubmit: (dto: IAbsence) => Promise<Absence>;
    onSuccess: (dto: IAbsence) => void;
}

export function CreateAbsenceComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm<IAbsence>({
        defaultValues: { approved: false }
    });

    const _onSubmit: SubmitHandler<IAbsence> = async (data) => {
        try {
            const formData = { 
                ...data, 
                from: new Date(data.from), 
                to: new Date(data.to), 
                approved: false 
            };
            const resp = await onSubmit(formData);
            onSuccess(resp);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Form.Group className="mb-3" controlId="reason">
                <Form.Label>Reason</Form.Label>
                <Form.Control {...register('reason', { required: true })} type="text" />
                {errors.reason && <span>This field is required</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="from">
                <Form.Label>From</Form.Label>
                <Controller
                    name="from"
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
                {errors.from && <span>This field is required</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="to">
                <Form.Label>To</Form.Label>
                <Controller
                    name="to"
                    control={control}
                    rules={{
                        required: true,
                        validate: value => {
                            const fromDate = getValues('from');
                            return new Date(value) > new Date(fromDate) || "To date must be later than from date";
                        }
                    }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                        />
                    )}
                />
                {errors.to && <span>{errors.to.message}</span>}
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}
