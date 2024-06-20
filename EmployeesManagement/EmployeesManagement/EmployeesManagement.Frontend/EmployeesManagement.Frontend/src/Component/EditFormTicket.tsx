import React, { useEffect, useState } from "react";
import { ApiClient, Ticket, Person } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button, Form } from "react-bootstrap";
import { FormikHelpers, Formik, Field, FormikProps } from "formik";
import DatePicker from "react-datepicker";

interface IProps {
  itemToUpdate: Ticket;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedTicket: Ticket) => Promise<void>;
}

const EditFormTicket: React.FC<IProps> = ({ itemToUpdate, toggleEditMode, refreshParent, onSave }) => {
  const initialValues: Ticket = new Ticket({
    ...itemToUpdate,
  });

  const [persons, setPersons] = useState<Person[]>([]);
  const client = new ApiClient("https://localhost:7088");

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const personList = await client.personsAll();
        setPersons(personList);
      } catch (error) {
        console.error("Error fetching responsible persons:", error);
      }
    };

    fetchPersons();
  }, []);

  const submitHandler = async (values: Ticket, { setSubmitting }: FormikHelpers<Ticket>) => {
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
      {({ handleSubmit, isSubmitting, isValid, errors, touched, setFieldValue, values }: FormikProps<Ticket>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className="form-control" />
            {errors.title && touched.title ? (
              <div className="text-danger">{errors.title}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" className="form-control" />
            {errors.description && touched.description ? (
              <div className="text-danger">{errors.description}</div>
            ) : null}
          </FormGroup>

          <Form.Group className="mb-3" controlId="deadline">
            <Form.Label>Deadline</Form.Label>
            <DatePicker
              selected={values.deadline ? new Date(values.deadline) : null}
              onChange={(date) => setFieldValue('deadline', date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
            {errors.deadline && touched.deadline && <span className="text-danger">{String(errors.deadline)}</span>}
          </Form.Group>

          <FormGroup>
            <label htmlFor="completed">Status</label>
            <Field as="select" name="completed" className="form-control" value={values.completed.toString()} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('completed', e.target.value === "true")}>
              <option value="">Select...</option>
              <option value="true">Completed</option>
              <option value="false">In Progress</option>
            </Field>
            {errors.completed && touched.completed ? (
              <div className="text-danger">{errors.completed}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="attributed">Attributed</label>
            <Field as="select" name="attributed" className="form-control" value={values.attributed.toString()} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('attributed', e.target.value === "true")}>
              <option value="">Select...</option>
              <option value="true">Attributed</option>
              <option value="false">Not Attributed</option>
            </Field>
            {errors.attributed && touched.attributed ? (
              <div className="text-danger">{errors.attributed}</div>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label htmlFor="responsibleId">Responsible</label>
            <Field as="select" name="responsibleId" className="form-control" value={values.responsibleId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('responsibleId', parseInt(e.target.value))}>
              <option value="">Select...</option>
              {persons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.lastName}
                </option>
              ))}
            </Field>
            {errors.responsibleId && touched.responsibleId ? (
              <div className="text-danger">{errors.responsibleId}</div>
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

export default EditFormTicket;
