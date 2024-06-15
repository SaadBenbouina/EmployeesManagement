import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { IPerson, Person } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button } from "react-bootstrap";
import * as Yup from "yup";

interface IProps {
  itemToUpdate: Person;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedPerson: Person) => Promise<void>; // Neue Eigenschaft hinzugefügt
}

const EditFormPerson: React.FC<IProps> = ({ itemToUpdate, toggleEditMode, refreshParent, onSave }) => {
  const initialValues: Person = new Person({
    ...itemToUpdate,
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const submitHandler = async (values: Person, { setSubmitting }: FormikHelpers<Person>) => {
    // Rufe die onSave-Funktion auf
    await onSave(values);
    setSubmitting(false);
    toggleEditMode();
    refreshParent();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form>
          <FormGroup>
            <label htmlFor="salutation">Salutation</label>
            <Field as="select" name="salutation" className="form-control">
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </Field>
            {errors.salutation && touched.salutation ? (
              <div className="text-danger">{errors.salutation}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" className="form-control" />
            {errors.firstName && touched.firstName ? (
              <div className="text-danger">{errors.firstName}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" className="form-control" />
            {errors.lastName && touched.lastName ? (
              <div className="text-danger">{errors.lastName}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="form-control" />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="departement">Department</label>
            <Field name="departement" type="text" className="form-control" />
            {errors.departement && touched.departement ? (
              <div className="text-danger">{errors.departement}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="speciality">Speciality</label>
            <Field name="speciality" type="text" className="form-control" />
            {errors.speciality && touched.speciality ? (
              <div className="text-danger">{errors.speciality}</div>
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

export default EditFormPerson;
