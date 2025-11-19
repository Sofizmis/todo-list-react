function ToDoItem({ task, index, onDelete, onMoveUp, onMoveDown }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center fs-5 py-3">
      <span className="flex-grow-1">{index + 1}. {task}</span>
      <div className="btn-group">
        <button
          className="btn btn-danger btn-lg me-2"
          onClick={() => onDelete(index)}
        >
          Удалить
        </button>
        <button
          className="btn btn-outline-secondary btn-lg me-2"
          onClick={() => onMoveUp(index)}
        >
          Вверх
        </button>
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => onMoveDown(index)}
        >
          Вниз
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;