import React from "react";
import { Absence } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button, Form } from "react-bootstrap";
import { FormikHelpers, Formik, Field, FormikProps } from "formik";
import DatePicker from "react-datepicker";

interface IProps {
  itemToUpdate: Absence;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedAbsence: Absence) => Promise<void>;
}

const EditFormAbsence: React.FC<IProps> = ({ itemToUpdate, toggleEditMode, refreshParent, onSave }) => {
  const initialValues: Absence = new Absence({
    ...itemToUpdate,
  });

  const submitHandler = async (values: Absence, { setSubmitting }: FormikHelpers<Absence>) => {
    console.log("Form values on submit:", values);
    try {
      await onSave({
        ...values,
        approved: values.approved === "true" ? true : values.approved === "false" ? false : values.approved,
      });
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
      {({ handleSubmit, isSubmitting, isValid, errors, touched, setFieldValue, values }: FormikProps<Absence>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="reason">Reason</label>
            <Field name="reason" type="text" className="form-control" />
            {errors.reason && touched.reason ? (
              <div className="text-danger">{errors.reason}</div>
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
            <label htmlFor="approved">Approved</label>
            <Field as="select" name="approved" className="form-control" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("approved", e.target.value === "true")}>
              <option value="">Select...</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Field>
            {errors.approved && touched.approved ? (
              <div className="text-danger">{errors.approved}</div>
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

export default EditFormAbsence;
