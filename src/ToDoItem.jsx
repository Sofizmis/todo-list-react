function ToDoItem({ task, index, onDelete, onMoveUp, onMoveDown, onTaskComplete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center fs-5 py-3">
      <div className="form-check flex-grow-1">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={task.completed}
          onChange={onTaskComplete}
          id={`task-${index}`}
        />
        <label
          className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
          htmlFor={`task-${index}`}
        >
          {index + 1}. {task.text}
        </label>
        <div className="small text-muted">
          Создано: {task.createdAt}
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-danger btn-lg me-2" onClick={() => onDelete(index)}>
          Удалить
        </button>

        {!task.completed && (
          <>
            <button className="btn btn-outline-secondary btn-lg me-2" onClick={() => onMoveUp(index)}>
              Вверх
            </button>
            <button className="btn btn-outline-secondary btn-lg" onClick={() => onMoveDown(index)}>
              Вниз
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default ToDoItem;