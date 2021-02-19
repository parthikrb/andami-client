import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "calc(100vh - 100px)",
    display: "flex",
  },
  button: {
    width: "30%",
    height: "100%",
    margin: "1em",
  },
  dashboard: {
    backgroundColor: "#1289A7",
  },
  user: {
    backgroundColor: "#A3CB38",
  },
  bill: {
    backgroundColor: "#B53471",
  },
  report: {
    backgroundColor: "#f5cd79",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Button
          component={Link}
          to={"/dashboard"}
          className={[classes.dashboard, classes.button].join(" ")}
        >
          Dashboard
        </Button>
        <Button
          component={Link}
          to={"/user"}
          className={[classes.user, classes.button].join(" ")}
        >
          Users
        </Button>
        <Button
          component={Link}
          to={"/bill"}
          className={[classes.bill, classes.button].join(" ")}
        >
          Bills
        </Button>
        <Button
          component={Link}
          to={"/reports"}
          className={[classes.report, classes.button].join(" ")}
        >
          Report
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
