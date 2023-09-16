import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { MainLogin } from './components/Btn'
import { authOptions } from './lib/auth'

export default async function Home() {

  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chat");
  }
  return (
    <div className="max-w-xl mx-auto border rounded-lg p-10 mt-32">
      <h1 className='text-4xl text-center font-semibold'>Login to have a conversation with your Buds.</h1>
      <div className="mt-8">
        <MainLogin />
      </div>
    </div>
  )
}
