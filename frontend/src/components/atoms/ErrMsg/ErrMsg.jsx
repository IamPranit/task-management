import classes from "./ErrMsg.module.scss";

const ErrMsg = ({ message }) => {
  return <p className={classes.ErrMsg}>{message}</p>;
};

export default ErrMsg;
