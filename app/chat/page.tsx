import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function Home(){

    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/");
    }
    return(
        <div className="absolute text-xl">
            <h2>hey</h2>
        </div>
    )
}