"use client";
import { signIn, signOut } from 'next-auth/react';
import React from 'react'


export function Logout() {
    return (
        <button className='flex items-center justify-center bg-[#fd3a4e] gap-2 rounded-lg px-8 py-3 text-center text-sm font-semibold text-white ring-red-300 transition duration-100 hover:bg-red-700 md:text-base '
            onClick={() => signOut()}
        >
            Logout
        </button>
    )
};


export function Login() {
    return (
        <button className='flex items-center justify-center bg-[#06C755] gap-2 rounded-lg px-8 py-3 text-center text-sm font-semibold text-white ring-red-300 transition duration-100 hover:bg-[#0f7238] md:text-base'
            onClick={()=>signIn("reddit")}
        >Login</button>
    )
}



