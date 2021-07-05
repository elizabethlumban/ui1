import React from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { insertRecord } from "actions/items";
import { IState } from "store/types";

export const Basic = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: IState) => state.items);
  const loading = useSelector((state: IState) => state.loading);

  return (
    <div style={{ height: 10, margin: 80 }}>
      {/*      <h2>Provide URL</h2> */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
        }}
        onSubmit={async (values: any) => {
          /* await new Promise((r) => setTimeout(r, 500)); */
          /* alert(JSON.stringify(values, null, 2)); */
          const update: any = {
            fullUrl: values.url,
          };
          try {
            await dispatch(insertRecord(update));
          } catch (error) {}
        }}
      >
        <Form>
          <label htmlFor="url">URL: </label>
          <Field style={{ width: 900 }} id="url" name="url" placeholder="http://google.com/1344" />
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </Form>
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
