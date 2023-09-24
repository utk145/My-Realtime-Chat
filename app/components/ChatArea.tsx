"use client";

import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";

interface ChatProp {
    data: {
        User: {
            image: string | null,
            name: string | null,
        },
        message: string;
    }[];
}

export default function ChatArea({ data }: ChatProp) {

    const [total, setTotal] = useState(data);
    // console.log(total);


    const msgEnd = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_key as string, {
            cluster: 'ap2'
        });


        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data: any) {
            const parsedComments = JSON.parse(data.message);
            setTotal((prev) => [...prev, parsedComments]);
        });

        // Handling mesages appearing twice.For this we will unsubscibe from the websocket
        return ()=>{
            pusher.unsubscribe("my-channel");
        } 
        
    }, [])

    const scrollBtm = () => {
        msgEnd.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollBtm();
    }, [total])


    return (
        <div className="p-6 flex-grow max-h-screen py-32 overflow-y-auto bg-[#202123]">
            <div className="flex flex-col gap-4">
                {total.map((msg, indx) => (
                    <div key={indx} className=''>
                        <div className="flex items-center">
                            <Image src={msg?.User?.image as string || "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?size=626&ext=jpg"} alt="Profile-img" className="w-10 h-10 object-cover rounded-lg mr-4" width={50} height={50} />
                            <div className="rounded-lg bg-[#82f3ad] p-3 shadow-md self-start">{msg.message}</div>
                        </div>
                        <p className="text-sm text-gray-700">{msg.User?.name as string}</p>
                    </div>
                ))}
                <div ref={msgEnd}></div>
            </div>
        </div>
    )
}