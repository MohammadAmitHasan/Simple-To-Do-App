import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddTask = ({ refetch }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async data => {

        const todo = {
            name: data.taskName,
            description: data.description,
            isComplete: false,
        }
        fetch('http://localhost:5000/addTodo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reset();
                    toast.success('Task Added Successfully');
                    refetch();
                }
            })
    }
    return (
        <div className='mb-10 mt-2'>
            <form className='grid grid-cols-1 gap-3' onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow-xl p-5 rounded-lg form-control w-full mx-auto max-w-xs grid grid-cols-1 gap-5">
                    <h1 className='text-2xl text-center font-semibold text-primary'>Add a New Task</h1>
                    <div>
                        <label className="label">
                            <span className="label-text">Task Name</span>
                        </label>
                        <input autoComplete='off' type="text" placeholder="Task Name" className="input input-bordered w-full max-w-xs"
                            {...register("taskName", {
                                required: {
                                    value: true,
                                    message: 'Task Name required'
                                }
                            })}
                        />
                        {errors.taskName?.type === 'required' &&
                            <p className='text-red-500 mt-1 rounded-lg'>
                                {errors.taskName.message}
                            </p>}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <textarea autoComplete='off' placeholder='Task Description' className='min-h-16 input input-bordered w-full max-w-xs'
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description required'
                                },
                            })}
                        />
                        {errors.description?.type === 'required' &&
                            <p className='text-red-500 mt-1 rounded-lg'>
                                {errors.description.message}
                            </p>}
                    </div>

                    <input className='btn w-full' type="submit" value={'Add Task'} />
                </div>
            </form>
        </div>
    );
};

export default AddTask;