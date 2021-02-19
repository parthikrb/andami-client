import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

const validationSchema = yup.object({
  fiscal_year: yup
    .string("Enter financial year")
    .required("Financial year is required"),
  receipt_number: yup
    .number("Enter receipt number")
    .required("Receipt number is required"),
  amount: yup.number("Enter Bill amount").required("Bill amount is required"),
});

const CreateBill = (props) => {
  const { userId, newBill } = props;
  const formik = useFormik({
    initialValues: {
      bill_type: "house",
      fiscal_year: "",
      receipt_number: "",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = { ...values, user: userId, date: new Date() };
      axios
        .post(`${process.env.REACT_APP_API_URL}/bill`, data)
        .then((response) => {
          newBill(response);
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Bill Type</FormLabel>
          <RadioGroup
            aria-label="bill_type"
            name="bill_type"
            style={{ display: "flex" }}
            value={formik.values.bill_type}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="house"
              control={<Radio />}
              label="House Tax"
            />
            <FormControlLabel
              value="water"
              control={<Radio />}
              label="Water Tax"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          id="fiscal_year"
          name="fiscal_year"
          label="Financial Year"
          value={formik.values.fiscal_year}
          onChange={formik.handleChange}
          error={
            formik.touched.fiscal_year && Boolean(formik.errors.fiscal_year)
          }
          helperText={formik.touched.fiscal_year && formik.errors.fiscal_year}
        />
        <TextField
          fullWidth
          id="receipt_number"
          name="receipt_number"
          label="Receipt number"
          value={formik.values.receipt_number}
          onChange={formik.handleChange}
          error={
            formik.touched.receipt_number &&
            Boolean(formik.errors.receipt_number)
          }
          helperText={
            formik.touched.receipt_number && formik.errors.receipt_number
          }
        />
        <TextField
          fullWidth
          type="Number"
          id="amount"
          name="amount"
          label="Bill Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateBill;
