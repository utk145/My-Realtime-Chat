"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { prisma } from "./lib/db";

export async function postData(formData: FormData) {
    "use server";

    const Pusher = require("pusher");

    const session = await getServerSession(authOptions);
    const message = formData.get("message");


    const data = await prisma.message.create({
        data: {
            message: message as string,
            email: session?.user?.email,
        },
        include: {
            User: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });



    // Now creating a pusher instance 
    const pusher = new Pusher({
        appId:process.env.PUSHER_app_id,
        key:process.env.NEXT_PUBLIC_PUSHER_key,
        secret:process.env.PUSHER_secret ,
        cluster:process.env.PUSHER_cluster,
        useTLS:true,
    });


    pusher.trigger("my-channel", "my-event",{
        message: `${JSON.stringify(data)}\n\n`,
    });

}



// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices