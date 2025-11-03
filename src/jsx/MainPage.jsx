import { useEffect, useState } from "react";
import TaskAddForm from "./TaskAddForm";
import TaskComponent from "./TaskComponent";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToDatabase, getMyTasks } from "../redux/slices/tasksSlice";

function MainPage() {
  const handleAddTask = (task) => {
    console.log("Yeni görev:", task);
    dispatch(addTaskToDatabase(task));
    setShowForm(false);
  };

  const [showForm, setShowForm] = useState(false);
  const tasksSelector = useSelector((state) => state.tasksSlice.tasks);
  const loggedUserIdSelector = useSelector(
    (state) => state.usersSlice.loggedUserId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyTasks());
  }, [dispatch]);

  return (
    <div className="welcome_container">
      <h1 className="header_title">
        Görev Yöneticisi
        <sub>
          <small>v1.0.9</small>
        </sub>
      </h1>

      <h2 className="header2_title">Günlük görevlerinizi organize edin</h2>

      <div>
        <h2 className="welcome_addButton" onClick={() => setShowForm(true)}>
          Yeni Görev Ekle
        </h2>
      </div>
      {showForm && (
        <TaskAddForm
          onSubmit={handleAddTask}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="welcome_task_container">
        {tasksSelector.map((task, index) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
