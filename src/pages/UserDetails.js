import React, { useState, useEffect } from "react";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import { makeStyles } from "@material-ui/core/styles";
import UserDetail from "../components/UserDetail/UserDetail";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import CreateBill from "../components/CreateBill/CreateBill";
import BillList from "../components/BillList/BillList";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
    // display: "flex",
    position: "relative",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addBillBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));
const UserDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [bills, setBills] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(({ data }) => {
        setUser({ ...data });
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}/bills`)
      .then(({ data }) => {
        setBills([...data]);
      });
  }, [id]);

  const newBill = ({ data }) => {
    setOpen(false);
    setBills([...bills, data]);
  };

  return (
    <div className={classes.root}>
      <GoBackButton />
      <UserDetail user={user} />
      <Button
        className={classes.addBillBtn}
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        Add Bill
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-bill-modal"
        aria-describedby="add-bill-modal"
      >
        <div style={modalStyle} className={classes.paper}>
          <CreateBill userId={id} newBill={newBill} />
        </div>
      </Modal>
      {bills ? <BillList bills={bills} /> : <p>No Bills Found for the user</p>}
    </div>
  );
};

export default UserDetails;
