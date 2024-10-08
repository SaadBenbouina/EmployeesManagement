import React, { useEffect, useState } from "react";
import { BusnessTrip, Adress, ApiClient } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button, Form } from "react-bootstrap";
import { FormikHelpers, Formik, Field, FormikProps } from "formik";
import DatePicker from "react-datepicker";

interface IProps {
  itemToUpdate: BusnessTrip;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedBusnessTrip: BusnessTrip) => Promise<void>;
}

export function EditFormBusnessTrip({ itemToUpdate, toggleEditMode, refreshParent, onSave }:IProps) {
  const initialValues: BusnessTrip = new BusnessTrip({
    ...itemToUpdate,
  });

  const [addresses, setAddresses] = useState<Adress[]>([]);
  const client = new ApiClient("https://localhost:7088");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressList = await client.adressAll();
        setAddresses(addressList);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const submitHandler = async (values: BusnessTrip, { setSubmitting }: FormikHelpers<BusnessTrip>) => {
    console.log("Form values on submit:", values);
    try {
      await onSave(values);
      console.log("Update successful");
    } catch (error) {
      console.error("Error during save:", error);
    } finally {
      setSubmitting(false);
      toggleEditMode();
      refreshParent();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {({ handleSubmit, isSubmitting, isValid, errors, touched, setFieldValue, values }: FormikProps<BusnessTrip>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Title</label>
            <Field name="name" type="text" className="form-control" />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </FormGroup>

          <Form.Group className="mb-3" controlId="from">
            <Form.Label>From</Form.Label>
            <DatePicker
              selected={values.from ? new Date(values.from) : null}
              onChange={(date) => setFieldValue('from', date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
            {errors.from && touched.from && <span className="text-danger">{String(errors.from)}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="to">
            <Form.Label>To</Form.Label>
            <DatePicker
              selected={values.to ? new Date(values.to) : null}
              onChange={(date) => setFieldValue('to', date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
            {errors.to && touched.to && <span className="text-danger">{String(errors.to)}</span>}
          </Form.Group>

          <FormGroup>
            <label htmlFor="alone">Alone</label>
            <Field as="select" name="alone" className="form-control" value={values.alone.toString()} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('alone', e.target.value === "true")}>
              <option value="">Select...</option>
              <option value="true">alone</option>
              <option value="false">group</option>
            </Field>
            {errors.alone && touched.alone ? (
              <div className="text-danger">{errors.alone}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="adressId">Address</label>
            <Field as="select" name="adressId" className="form-control" value={values.adressId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('adressId', parseInt(e.target.value))}>
              <option value="">Select...</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.city}
                </option>
              ))}
            </Field>
            {errors.adressId && touched.adressId ? (
              <div className="text-danger">{errors.adressId}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <Button variant="secondary" onClick={toggleEditMode}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || !isValid}>
              Save
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

