import React, { useState } from 'react';
import {
    useGetTasksQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} from '../../services/taskApi';
import { useNavigate } from 'react-router';
import './TaskList.scss';

const TaskList = () => {
    const [isSorted, setIsSorted] = useState(false);
    const { data: tasks = [] } = useGetTasksQuery();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const navigate = useNavigate();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const goToAddTask = () => navigate('/');

    const handleEdit = (task) => {
        setEditId(task.id);
        setEditText(task.text);
    };

    const saveEdit = async () => {
        if (editText.trim()) {
            await updateTask({ id: editId, text: editText });
            setEditId(null);
            setEditText('');
        }
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    const toggleSort = () => setIsSorted(!isSorted);

    const sortedTasks = isSorted
        ? [...tasks].sort((a, b) => a.text.localeCompare(b.text))
        : tasks;


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
                        <li key={task.id} className="task-item">
                            <span className="task-number">{index + 1}.</span>
                            {editId === task.id ? (
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <span className="task-text">{task.text}</span>
                            )}
                            <button
                                onClick={() => handleEdit(task)}
                                className={`button ${editId === task.id ? 'hidden' : ''}`}
                            >
                                Редактировать
                            </button>
                            {editId === task.id && (
                                <button onClick={saveEdit} className="button">
                                    Сохранить
                                </button>
                            )}
                            <button onClick={() => handleDelete(task.id)} className="button">
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