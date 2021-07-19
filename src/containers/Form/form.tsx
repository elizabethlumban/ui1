import React from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { insertRecord } from "actions/items";
import { IState } from "store/types";
import { TextField, Button } from "@material-ui/core";

export const Basic = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: IState) => state.items);
  const loading = useSelector((state: IState) => state.loading);

  const validate = (values: any) => {
    const errors = {} as any;
    //TODO: add more validation check for URL
    if (!values.url) {
      errors.url = "Please provide URL";
    }
    return errors;
  };
  return (
    <div style={{ height: 10, margin: 80 }}>
      <Formik
        initialValues={{
          url: "",
        }}
        validate={validate}
        onSubmit={async (values: any) => {
          const update: any = {
            fullUrl: values.url,
          };
          try {
            await dispatch(insertRecord(update));
          } catch (error) {}
        }}
      >
        {({ values, errors, handleChange, handleSubmit, /*isSubmitting, setFieldValue,*/ dirty, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              style={{ width: 900 }}
              variant="outlined"
              name="url"
              id="url"
              label="Url"
              onChange={handleChange}
              value={values.url}
              error={Boolean(errors.url)}
            />
            <div>{Boolean(errors.url) ? errors.url : ""}</div>
            <Button type="submit" variant="contained" color="primary" disabled={!(dirty && isValid)}>
              Submit
            </Button>
            <Button type="reset" variant="contained" color="secondary">
              Reset
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        {" "}
        <br></br>
        <br></br>
        {!loading &&
          items.map((e, i) => (
            <span
              style={{ color: "black", cursor: "pointer" }}
              key={i}
            >{`https://${window.location.hostname}/${e.name}`}</span>
          ))}
      </div>
    </div>
  );
};
export default Basic;
