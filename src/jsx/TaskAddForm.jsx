import { useState } from "react";
import "../css/TaskAddForm.css";

function TaskAddForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, dueDate, description });
    setTitle("");
    setDueDate("");
    setDescription("");
  };

  return (
    <div className="taskFormOverlay">
      <form className="taskForm" onSubmit={handleSubmit}>
        <label for="title" className="taskNameLabel">
          Task Name:
        </label>
        <input
          type="text"
          id="title"
          name="title1"
          required
          maxLength="30"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label for="dueDate" className="dueDateLabel">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          name="due_date1"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label for="description" className="descriptionLabel">
          Description:
        </label>
        <textarea
          id="description"
          name="description1"
          rows="4"
          required
          maxLength="250"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" id="addTaskButton">
          Add Task
        </button>
        <button type="button" id="closeFormBtn" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}

export default TaskAddForm;
