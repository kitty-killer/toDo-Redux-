import React, { useState } from 'react';
import { useAddTaskMutation } from '../../services/taskApi';
import { useNavigate } from 'react-router';
import './AddTask.scss';

const AddTask = () => {
    const [task, setTask] = useState('');
    const [addTask] = useAddTaskMutation();
    const navigate = useNavigate();

    const handleAddTask = async () => {
        if (task.trim()) {
            await addTask({ text: task });
            setTask('');
        }
    };

    const goToTaskList = () => {
        navigate('/tasks');
    };

    return (
        <div className="add-task-container">
            <h2 className="title">Добавить задачу</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Введите задачу..."
                    className="task-input"
                />
                <button onClick={handleAddTask} className="add-button">
                    Добавить
                </button>
            </div>
            <button onClick={goToTaskList} className="view-tasks-button">
                Просмотреть задачи
            </button>
        </div>
    );
};

export default AddTask;