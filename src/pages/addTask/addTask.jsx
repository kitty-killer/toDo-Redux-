import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice';
import { useNavigate } from 'react-router';
import './AddTask.scss';

const AddTask = () => {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask(task));
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
                <button
                    onClick={handleAddTask}
                    className="add-button"
                >
                    Добавить
                </button>
            </div>
            <button
                onClick={goToTaskList}
                className="view-tasks-button"
            >
                Просмотреть задачи
            </button>
        </div>
    );
};

export default AddTask;