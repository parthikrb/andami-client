import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CreateUser from '../components/CreateUser/CreateUser';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import GoBackButton from '../components/GoBackButton/GoBackButton';
import axios from 'axios';
import UserList from '../components/UserList/UserList';

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
        padding: '3em',
        display: 'flex',
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addUserBtn: {
        position: 'absolute',
        right: '10px',
        top: '10px'
    },
}));

const User = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then(({ data }) => {
                setUsers([...data]);
            })

    }, [])



    return (
        <div className={classes.root}>
            <GoBackButton />
            <Button className={classes.addUserBtn} color="secondary" variant="contained"
                onClick={handleOpen}
            >Add User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user-modal"
                aria-describedby="add-user-modal"
            >
                <div style={modalStyle} className={classes.paper}>
                    <CreateUser />
                </div>
            </Modal>
            <UserList users={users} />
        </div>
    )
}

export default User
