import "../css/TaskComponent.css";
import { useDispatch } from "react-redux";
import {
  deleteTaskFromDatabase,
  handleDoneTask,
} from "../redux/slices/tasksSlice";
function TaskComponent({ task }) {
  const date = new Date(task.dueDate);

  // padStart(2, '0') -> '5' ise '05' yapar, '12' ise '12' bırakır
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // DİKKAT: getMonth() 0'dan başlar (Ocak=0)
  const year = date.getFullYear();

  // DD/MM/YYYY formatı
  const formattedDate = `${day}/${month}/${year}`;

  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(handleDoneTask(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTaskFromDatabase(task.id));
  };

  return (
    <div className="task-container">
      <div
        className="task-duedate"
        style={{ textDecoration: task.done ? "line-through" : "none" }}
      >
        {formattedDate}
      </div>
      <div
        className="task-title"
        style={{ textDecoration: task.done ? "line-through" : "none" }}
      >
        {task.title}
      </div>
      <div
        className="task-description"
        style={{ textDecoration: task.done ? "line-through" : "none" }}
      >
        {task.description}
      </div>
      <div className="task-icons">
        {!task.done && (
          <img
            onClick={() => handleCheck()}
            className="icon-check"
            src="/assets/dark-check.svg"
            alt="Mark As Done!"
          />
        )}
        {task.done && (
          <img
            onClick={() => handleCheck()}
            className="icon-close"
            src="/assets/close.svg"
            alt="Mark As UnDone!"
          />
        )}
        <img
          onClick={() => handleDelete()}
          className="icon-delete"
          src="/assets/delete.svg"
          alt="Delete The Task!"
        />
      </div>
    </div>
  );
}

export default TaskComponent;
