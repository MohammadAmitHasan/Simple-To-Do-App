import React from 'react';

const Loading = () => {
    return (
        <div className='h-[70vh] flex justify-center items-center'>
            <div>
                <h3 className='text-2xl mb-5 font-semibold text-neutral'>Please wait, Loading ...</h3>
                <div className='flex justify-center'>
                    <div className="w-24 h-24 border-b-2 border-neutral rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;