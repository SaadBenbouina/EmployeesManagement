import { Absence, Adress, ApiClient, IAbsence, IAdress, IWorkingTime, Status, WorkStatus, WorkingTime } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CreateAdressComponent } from "./CreateAdressComponent";
import DatePicker from "react-datepicker";

interface IProps {
    onSubmit: (dto: IWorkingTime) => Promise<WorkingTime>;
    onSuccess: (dto: IWorkingTime) => void;
}

export function CreateWorkInfoComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register, handleSubmit, control, getValues, formState: { errors } } = useForm<IWorkingTime>();

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
            <h5>Address Info</h5>
            <CreateAdressComponent
                 onSubmit={(data) => client.adressPOST(new Adress(data))}
                 onSuccess={(address) => console.log("Address saved:", address)}
                 />
        </form>
    );
}
