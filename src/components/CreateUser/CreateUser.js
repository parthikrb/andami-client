import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

const validationSchema = yup.object({
  first_name: yup.string("Enter first name").required("First name is required"),
  last_name: yup.string("Enter last name").required("Last name is required"),
  mobile: yup
    .number("Enter Mobile number"),
  door_number: yup
    .string("Enter Door number")
    .required("Door number is required"),
  street_name: yup
    .string("Enter Street name")
    .required("Street details are required"),
  ward_number: yup
    .string("Enter Ward Number")
    .required("Ward number is required"),
});

const CreateUser = (props) => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      door_number: "",
      street_name: "",
      ward_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post(`${process.env.REACT_APP_API_URL}/user`, values)
        .then(response => {
          console.log(response)
        })
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          autoComplete="off"
          autoFocus
          fullWidth
          id="first_name"
          name="first_name"
          label="First name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          autoComplete="off"
          fullWidth
          id="last_name"
          name="last_name"
          label="Last name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        <TextField
          autoComplete="off"
          fullWidth
          type="Number"
          id="mobile"
          name="mobile"
          label="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          autoComplete="off"
          fullWidth
          id="door_number"
          name="door_number"
          label="Door Number"
          value={formik.values.door_number}
          onChange={formik.handleChange}
          error={
            formik.touched.door_number && Boolean(formik.errors.door_number)
          }
          helperText={formik.touched.door_number && formik.errors.door_number}
        />
        <TextField
          autoComplete="off"
          fullWidth
          id="street_name"
          name="street_name"
          label="Street Name"
          value={formik.values.street_name}
          onChange={formik.handleChange}
          error={
            formik.touched.street_name && Boolean(formik.errors.street_name)
          }
          helperText={formik.touched.street_name && formik.errors.street_name}
        />
        <TextField
          autoComplete="off"
          fullWidth
          type="number"
          id="ward_number"
          name="ward_number"
          label="Ward Number"
          value={formik.values.ward_number}
          onChange={formik.handleChange}
          error={
            formik.touched.ward_number && Boolean(formik.errors.ward_number)
          }
          helperText={formik.touched.ward_number && formik.errors.ward_number}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
