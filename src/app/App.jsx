import React from 'react';
import {  Routes, Route } from 'react-router';
import AddTask from '../pages/addTask/addTask';
import TaskList from '../pages/taskList/taskList';
import './App.scss';

const App = () => {
    return (

        <div className="app-container">
                    <Routes>
                        <Route path="/" element={<AddTask />} />
                        <Route path="/tasks" element={<TaskList />} />
                    </Routes>
        </div>

    );
};

export default App;