import React from 'react';
import AllTodos from '../AllTodos/AllTodos';
import AddTask from './AddTask/AddTask';

const Home = () => {
    return (
        <div>
            <AddTask></AddTask>
            <AllTodos></AllTodos>
        </div>
    );
};

export default Home;