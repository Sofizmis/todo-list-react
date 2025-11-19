import React, { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem';

const STORAGE_KEY = 'tasks';

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const [newTask, setNewTask] = useState("");
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { 
                text: newTask, 
                completed: false,
                createdAt: new Date().toLocaleString()
             }]);
            setNewTask("");
        }
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter((_, i) => i !== id);
        setTasks(updatedTasks);
    }

    function moveTaskUp(id) {
        if(id > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[id], updatedTasks[id - 1]] = 
            [updatedTasks[id - 1], updatedTasks[id]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(id) {
        if(id < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[id], updatedTasks[id + 1]] = 
            [updatedTasks[id + 1], updatedTasks[id]];
            setTasks(updatedTasks);
        }
    }

    function taskComplete(id) {
        const updatedTasks = [...tasks];
        updatedTasks[id].completed = !updatedTasks[id].completed;
        setTasks(updatedTasks);
    }

    function clearTasks() {
        setTasks([]);
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary display-5 mb-4">To-Do Список</h1>

            <div className="input-group input-group-lg mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите задачу ..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="btn btn-success btn-lg px-4" onClick={addTask}>
                    Добавить
                </button>
                <button className="btn btn-danger btn-lg px-4 ms-2" onClick={clearTasks}>
                    Удалить всё
                </button>
            </div>

            <h2 className="text-secondary">Активные задачи</h2>
            <ol className="list-group mb-4">
                {activeTasks.map((task, index) => (
                    <ToDoItem
                        key={index}
                        task={task}
                        index={tasks.indexOf(task)}
                        onDelete={deleteTask}
                        onMoveUp={moveTaskUp}
                        onMoveDown={moveTaskDown}
                        onTaskComplete={() => taskComplete(tasks.indexOf(task))}
                    />
                ))}
            </ol>

            {completedTasks.length > 0 && (
                <>
                    <h2 className="text-success">Выполненные задачи</h2>
                    <ol className="list-group">
                        {completedTasks.map((task, index) => (
                            <ToDoItem
                                key={index}
                                task={task}
                                index={tasks.indexOf(task)}
                                onDelete={deleteTask}
                                onMoveUp={moveTaskUp}
                                onMoveDown={moveTaskDown}
                                onTaskComplete={() => taskComplete(tasks.indexOf(task))}
                            />
                        ))}
                    </ol>
                </>
            )}
        </div>
    )
}

export default ToDoList