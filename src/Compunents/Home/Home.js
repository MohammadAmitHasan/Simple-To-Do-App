import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import AllTodos from '../AllTodos/AllTodos';
import Loading from '../Loading/Loading';
import AddTask from './AddTask/AddTask';

const Home = () => {
    const { data, isLoading, refetch } = useQuery('todo', () =>
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }

    // Delete button handler
    const handleDelete = id => {
        const confirm = window.confirm('Are you sure.?')
        if (confirm) {
            fetch(`http://localhost:5000/todo/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.error('Task Deleted')
                        refetch();
                    }
                })
        }
    }

    // Complete task button handler
    const handleComplete = id => {

        const updateToDo = {
            isComplete: true
        }

        fetch(`http://localhost:5000/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateToDo),

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Task Completed');
                    refetch();
                }
            })
    }

    return (
        <div>
            <AddTask refetch={refetch}></AddTask>
            <AllTodos
                data={data}
                refetch={refetch}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
            ></AllTodos>
        </div>
    );
};

export default Home;