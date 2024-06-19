import React from "react";
import { BusnessTrip } from "../generatedCode/src/generatedCode/generated";
import { FormGroup, Button, Form } from "react-bootstrap";
import { FormikHelpers, Formik, Field, FormikProps } from "formik";
import DatePicker from "react-datepicker";

interface IProps {
  itemToUpdate: BusnessTrip;
  toggleEditMode: () => void;
  refreshParent: () => void;
  onSave: (updatedBusnessTrip: BusnessTrip) => Promise<void>;
}

const EditFormBusnessTrip: React.FC<IProps> = ({ itemToUpdate, toggleEditMode, refreshParent, onSave }) => {
  const initialValues: BusnessTrip = new BusnessTrip({
    ...itemToUpdate,
  });

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
            <label htmlFor="approved">Adress</label>
            <Field as="select" name="approved" className="form-control">
              <option value="">Select...</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Field>
            {errors.adress && touched.adress ? (
              <div className="text-danger">{errors.adress}</div>
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

export default EditFormBusnessTrip;
