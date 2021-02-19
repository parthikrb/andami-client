import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "80%",
    margin: "auto",
  },
  column: {
    width: "45%",
    height: "25vh",
    marginRight: "10px",
    backgroundColor: "#778beb",
    borderRadius: "1em",
    padding: "1em",
  },
  address: {
    backgroundColor: "#63cdda",
  },
}));

const UserDetail = (props) => {
  const { user } = props;
  console.log(user);
  const {
    first_name,
    last_name,
    mobile,
    door_number,
    street_name,
    ward_number,
  } = user;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <p>First Name</p>
        <h3>{first_name}</h3>
        <p>Last Name</p>
        <h3>{last_name}</h3>
        <p>Mobile Number</p>
        <h3>{mobile}</h3>
      </div>
      <div className={[classes.column, classes.address].join(" ")}>
        <p>Door Number</p>
        <h3>{door_number}</h3>
        <p>Street Name</p>
        <h3>{street_name}</h3>
        <p>Ward Number</p>
        <h3>{ward_number}</h3>
      </div>
    </div>
  );
};

export default UserDetail;
