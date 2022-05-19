import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase.init';
import AllTodos from '../AllTodos/AllTodos';
import Loading from '../Loading/Loading';
import AddTask from './AddTask/AddTask';

const Home = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useQuery('todo', () =>
        fetch(`https://hasans-simple-todo-app.herokuapp.com/todos?userEmail=${user?.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    signOut(auth);
                    navigate('/login')
                }
                return res.json()
            })
    )

    console.log(data)

    if (isLoading || data.message === 'Forbidden access') {
        return <Loading></Loading>
    }

    // Delete button handler
    const handleDelete = id => {
        const confirm = window.confirm('Are you sure.?')
        if (confirm) {
            fetch(`https://hasans-simple-todo-app.herokuapp.com/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
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

        fetch(`https://hasans-simple-todo-app.herokuapp.com/todo/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
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