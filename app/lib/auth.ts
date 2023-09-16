import { PrismaAdapter } from "@/node_modules/@auth/prisma-adapter/index";
import type { NextAuthOptions } from "@/node_modules/next-auth/index";
import RedditProvider from "@/node_modules/next-auth/providers/reddit";
import { PrismaClient } from '@prisma/client'

const prismaInstance = new PrismaClient();


export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter:PrismaAdapter(prismaInstance),
    providers: [
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
        })
    ]
};






// https://next-auth.js.org/providers/reddit