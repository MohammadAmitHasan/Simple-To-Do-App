import React from 'react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'

const AllTodos = ({ data, handleDelete, handleComplete }) => {

    return (
        <div>
            <h1 className='text-2xl text-center font-semibold text-primary mb-2'>All Todo List</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((todo, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td className={todo.isComplete ? 'line-through' : ''}>{todo.name}</td>
                                <td className={todo.isComplete ? 'line-through' : ''}>{todo.description}</td>
                                <td>
                                    <CheckCircleIcon onClick={() => handleComplete(todo._id)} className='w-10 h-10 text-green-600 hover:bg-green-600 rounded-full hover:text-white cursor-pointer p-2'></CheckCircleIcon>
                                </td>
                                <td>
                                    <TrashIcon onClick={() => handleDelete(todo._id)} className='w-10 h-10 text-red-600 hover:bg-red-600 rounded-full hover:text-white cursor-pointer p-2'></TrashIcon>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTodos;