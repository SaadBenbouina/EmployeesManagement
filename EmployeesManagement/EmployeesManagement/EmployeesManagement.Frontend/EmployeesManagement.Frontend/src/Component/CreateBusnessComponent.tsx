import { Adress, ApiClient, BusnessTrip, IBusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

interface IProps {
    onSubmit: (dto: IBusnessTrip) => Promise<BusnessTrip>;
    onSuccess: () => void;
}

export function CreateBusnessTripComponent(props: IProps) {
    const { onSubmit, onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues
    } = useForm();
    const [addresses, setAddresses] = useState<Adress[]>([]);
    const client = new ApiClient("https://localhost:7088");

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const result = await client.adressAll();
                setAddresses(result);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        fetchAddresses();
    }, []);

    const _onSubmit: SubmitHandler<any> = async (data) => {
        try {
            // Only keep the fields required by the API
            const submitData = {
                name: data.name,
                alone: data.alone === "true", // Convert string to boolean
                from: new Date(data.from),
                to: new Date(data.to),
                adressId: parseInt(data.adressId) // Only send the address ID
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
            <Form.Group className="mb-3" controlId="adressId">
                <Form.Label>Address</Form.Label>
                <Form.Select {...register('adressId', { required: true })}>
                    <option value="">Select...</option>
                    {addresses.map((address) => (
                        <option key={address.id} value={address.id.toString()}>
                            {address.street}, {address.city}
                        </option>
                    ))}
                </Form.Select>
                {errors.adressId && <p className="text-danger">Address is required</p>}
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Save</Button>
            </Form.Group>
        </form>
    );
}
