"use client";
import React, { useRef } from 'react';
import { postData } from '../do';

const Form = () => {

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form className='p-6 fixed bottom-0 left-0 w-full bg-white'
            action={async (formData)=>{await postData(formData);
                formRef.current?.reset();
            }}
            ref={formRef}
        >
            <div className="flex">
                <input type="text" name='message' placeholder='Type a message' className='flex-grow py-2 px-4 outline-none' />
                <button className='hover:border-gray-700 hover:text-gray-700 hover:bg-orange-300 inset-y-0 right-0 my-1.5 mr-1.5 flex w-12 items-center justify-center rounded border border-gray-200 font-sans text-lg text-gray-400 px-2' type='submit'>Send</button>
            </div>
        </form>
    )
}

export default Form