import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { Adress, IPerson, Person } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button } from "react-bootstrap";
import * as Yup from "yup";

interface IProps {
  itemToUpdate: Adress;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedAdress: Adress) => Promise<void>; 
}

const EditFormAdress: React.FC<IProps> = ({ itemToUpdate, toggleEditMode, refreshParent, onSave }) => {
  const initialValues: Adress = new Adress({
    ...itemToUpdate,
  });



  const submitHandler = async (values: Adress, { setSubmitting }: FormikHelpers<Adress>) => {
    // Rufe die onSave-Funktion auf
    await onSave(values);
    setSubmitting(false);
    toggleEditMode();
    refreshParent();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form>
         <FormGroup>
            <label htmlFor="street">Street</label>
            <Field name="street" type="text" className="form-control" />
            {errors.street && touched.street ? (
              <div className="text-danger">{errors.street}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="city">City</label>
            <Field name="city" type="text" className="form-control" />
            {errors.city && touched.city ? (
              <div className="text-danger">{errors.city}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="raum">Room</label>
            <Field name="raum" type="text" className="form-control" />
            {errors.raum && touched.raum ? (
              <div className="text-danger">{errors.raum}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="state">State</label>
            <Field name="state" type="state" className="form-control" />
            {errors.state && touched.state ? (
              <div className="text-danger">{errors.state}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="postalCode">Postal Code</label>
            <Field name="postalCode" type="text" className="form-control" />
            {errors.postalCode && touched.postalCode ? (
              <div className="text-danger">{errors.postalCode}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="country">Country</label>
            <Field name="country" type="text" className="form-control" />
            {errors.country && touched.country ? (
              <div className="text-danger">{errors.country}</div>
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

export default EditFormAdress;
