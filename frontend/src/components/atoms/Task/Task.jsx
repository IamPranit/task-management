import { FaPencil, FaTrash } from "react-icons/fa6";
import classes from "./Task.module.scss";

const Task = ({ title = "", category = "", onDelete, onEdit }) => {
  return (
    <div className={classes.task}>
      <h3 className={classes.task__title}>
        {title}{" "}
        <div className={classes.title__actions}>
          <FaPencil className={classes.actions__FaPencil} onClick={onEdit} />
          <FaTrash className={classes.actions__FaTimes} onClick={onDelete} />
        </div>
      </h3>
      <p className={classes.task__category}>{category.toLowerCase()}</p>
    </div>
  );
};

export default Task;
