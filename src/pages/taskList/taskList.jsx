import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { editTask, deleteTask } from '../../store/taskSlice';
import './TaskList.scss';

const TaskList = () => {
    const [isSorted, setIsSorted] = useState(false);
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const goToAddTask = () => {
        navigate('/');
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(tasks[index]);
    };

    const saveEdit = (index) => {
        dispatch(editTask({ index, newTask: editText }));
        setEditIndex(null);
        setEditText('');
    };

    const handleDelete = (index) => {
        dispatch(deleteTask(index));
    };

    const toggleSort = () => {
        setIsSorted(!isSorted);
    };

    const sortedTasks = isSorted ? [...tasks].sort((a, b) => a.localeCompare(b)) : tasks;

    return (
        <div className="task-list-container">
            <div className="header">
                <h2 className="title">Список задач</h2>
                <button onClick={goToAddTask} className="add-task-button">
                    Добавить задачу
                </button>
                <button onClick={toggleSort} className="sort-button">
                    {isSorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
                </button>
            </div>
            {tasks.length === 0 ? (
                <p className="empty-message">Задач нет, но вы можете их придумать себе!</p>
            ) : (
                <ul className="task-list">
                    {sortedTasks.map((task, index) => (
                        <li key={index} className="task-item">
                            <span className="task-number">{index + 1}.</span>
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <span className="task-text">{task}</span>
                            )}
                            <button
                                onClick={() => handleEdit(index)}
                                className={`button ${editIndex === index ? 'hidden' : ''}`}
                            >
                                Редактировать
                            </button>
                            {editIndex === index && (
                                <button onClick={() => saveEdit(index)} className="button">
                                    Сохранить
                                </button>
                            )}
                            <button onClick={() => handleDelete(index)} className="button">
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
