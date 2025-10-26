"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const users = ['Bezos', 'Elon', 'Buffet'];
  const [userName, setUserName] = React.useState('');
  console.log(userName);

  const join = () => {
    if (users.includes(userName)) {
      router.push('/home/');
      console.log('seccessful');
      return;
    }

    alert('User not found');
    setUserName('');
  }




  return (
    <main className="flex flex-col">
      <input 
        onChange={(e) => setUserName(e.target.value)}
        type="text" 
        placeholder="Enter your name...." 
        className="border p-2 rounded-md text-3xl" 
      />
      <button onClick={join} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md text-3xl">Join</button>
    </main>
  )


};
