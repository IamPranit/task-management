import classes from "./Button.module.scss";

const Button = (props) => {
  const { variant, children, ...rest } = props;
  return (
    <button
      className={`btn btn-default ${classes.button} ${classes[variant]}`}
      role="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
