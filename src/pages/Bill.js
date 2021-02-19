import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CreateBill from '../components/CreateBill/CreateBill';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import GoBackButton from '../components/GoBackButton/GoBackButton';

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
    addBillBtn: {
        position: 'absolute',
        right: '10px',
        top: '10px'
    }
}));

const Bill = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <GoBackButton />
            <Button className={classes.addBillBtn} color="secondary" variant="contained"
                onClick={handleOpen}
            >Add Bill</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-bill-modal"
                aria-describedby="add-bill-modal"
            >
                <div style={modalStyle} className={classes.paper}>
                    <CreateBill />
                </div>
            </Modal>
        </div>
    )
}

export default Bill
