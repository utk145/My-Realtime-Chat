import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "../components/Form";
import { authOptions } from "../lib/auth";

export default async function Home(){

    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/");
    }
    return(
        <div className="h-screen bg-gray-200 flex flex-col">
            <Form/>                    
        </div>
    )
}