import { useEffect, useState } from "react";
import TaskAddForm from "./TaskAddForm";
import TaskComponent from "./TaskComponent";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToDatabase, getMyTasks } from "../redux/slices/tasksSlice";
import { logoutUser } from "../redux/slices/usersSlice";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigator = useNavigate();
  const handleAddTask = (task) => {
    console.log("Yeni görev:", task);
    dispatch(addTaskToDatabase(task));
    setShowForm(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigator("/");
  };

  const [showForm, setShowForm] = useState(false);
  //const tasksSelector = useSelector((state) => state.tasksSlice.tasks);
  const { tasks: tasksSelector, loading } = useSelector(
    (state) => state.tasksSlice
  );
  const loggedUserIdSelector = useSelector(
    (state) => state.usersSlice.loggedUserId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyTasks());
  }, [dispatch]);

  if (loading === "loading" || !Array.isArray(tasksSelector)) {
    console.log("yükleniyor");
    return <div>Görevler Yükleniyor...</div>;
  }

  return (
    <div className="welcome_container">
      <h1 className="header_title">
        Görev Yöneticisi
        <sub>
          <small>v1.0.9</small>
        </sub>
      </h1>

      <h2 className="header2_title">Günlük görevlerinizi organize edin</h2>

      <div className="welcome-logout-container">
        <h2 className="welcome_addButton" onClick={() => setShowForm(true)}>
          Yeni Görev Ekle
        </h2>
        <h2 className="logout-button" onClick={() => handleLogout()}>
          Çıkış Yap
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
