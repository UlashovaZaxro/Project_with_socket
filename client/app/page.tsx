"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const users = [ 
  {id: 1, name: 'elon'},
  {id: 2, name: 'bezos'},
  {id: 3, name: 'buffet'},
];

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

    const join = () => {
    const result = users.find((u) => u.name === userName.toLowerCase());

    if (!result) {
      setUserName('');
      return alert('User not found');
    } 
    
    router.push(`/home/${result.id}`);
    return;
  }

  console.log(userName)

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
