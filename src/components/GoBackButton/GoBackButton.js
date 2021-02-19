import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    backBtn: {
        position: 'absolute',
        left: '10px',
        top: '10px'
    }
}));

const GoBackButton = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Fab color="primary" size="small" className={classes.backBtn} aria-label="add"
            onClick={() => history.goBack()}
        >
            <ArrowBackIcon />
        </Fab>
    )
}

export default GoBackButton;
