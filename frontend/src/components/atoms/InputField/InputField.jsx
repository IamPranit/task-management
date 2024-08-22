import classes from "./InputField.module.scss";

const InputField = (props) => {
  const { form, ...rest } = props;
  return (
    <input
      className={classes.inputField}
      {...form.register("title")}
      {...rest}
    />
  );
};

export default InputField;
