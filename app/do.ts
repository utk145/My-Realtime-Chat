"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { prisma } from "./lib/db";

export async function postData(formData: FormData) {
    "use server";

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

}



// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices