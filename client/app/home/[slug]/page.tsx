"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useSocket from "@/hooks/useSocket";
import { usePathname } from "next/navigation";

import bezosImg from "../../../assets/images/img1.jpg";
import elonImg from "../../../assets/images/img2.jpg";
import buffetImg from "../../../assets/images/img3.jpg";

const SERVER_URL = {
  URL: "http://localhost:4000",
};

const posts = [
  { id: 1, name: "bezos", postImg: bezosImg },
  { id: 2, name: "elon", postImg: elonImg },
  { id: 3, name: "buffet", postImg: buffetImg },
];

function ProfilePage() {
  const socket = useSocket(SERVER_URL.URL);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<string[]>([]);
  const userId = Number(pathname[pathname.length - 1]); 
  const currentUser = posts.find((u) => u.id === userId);


  useEffect(() => {
    socket.current?.emit("register", userId);


    socket.current?.on("newNotify", (message) =>{
      setNotifications((prev) => [...prev, message]);
      console.log(notifications);
    })

  }, []);

  
  const sendNotify = (data: {type: string, rec_id: number, rec_name: string}) => {
      const sender_user_id = pathname[pathname.length - 1]
      const sender_name = currentUser?.name || "Unknown";;

      console.log(`${data.type} post ${sender_user_id} ${sender_name} to ${data.rec_id}`)
      socket.current?.emit("newNotify", {
        ...data, 
        senderId: sender_user_id,
        senderName: sender_name,
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">MySocial</h1>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowModal(!showModal)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Notification Modal */}
          {showModal && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-4 border-b text-gray-800 font-semibold">
                Notifications
              </div>
              <div className="p-4 text-sm text-gray-600">
                {notifications.length === 0 ? (
                <p>No new notifications</p>
                ) : (
                    <ul className="space-y-2 max-h-48 overflow-auto">
                      {notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-800"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Posts Section */}
      <div className="max-w-md mx-auto mt-8 space-y-6">
        {posts.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Post Header */}
            <div className="flex items-center p-3">
              <Image
                src={user.postImg}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <p className="ml-3 font-semibold text-gray-800">{user.name}</p>
            </div>

            {/* Post Image */}
            <div className="relative w-full h-72">
              <Image
                src={user.postImg}
                alt={user.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-around py-3 text-gray-700">
              <button
                onClick={() => sendNotify({type: "❤️like", rec_name: user.name, rec_id: user.id})}
                className="flex items-center gap-1 hover:text-red-500 transition"
              >
                {/* Like Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.29-4.5-5.118-4.5-1.756 0-3.29.832-4.132 2.118A5.118 5.118 0 007.618 3.75C4.79 3.75 2.5 5.765 2.5 8.25c0 7.22 9.5 12 9.5 12s9.5-4.78 9.5-12z"
                  />
                </svg>
              </button>

              {/* Comment Icon */}
              <button 
                onClick={() => sendNotify({type: "💬comment", rec_name: user.name, rec_id: user.id})}
                className="flex items-center gap-1 hover:text-blue-500 transition"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 4.5c.621 0 1.125.504 1.125 1.125v1.005c0 .207-.023.411-.066.609a8.962 8.962 0 016.807 6.807c.198-.043.402-.066.609-.066h1.005a1.125 1.125 0 110 2.25h-1.005a8.963 8.963 0 01-6.807 6.807c.043.198.066.402.066.609v1.005a1.125 1.125 0 11-2.25 0v-1.005a8.963 8.963 0 01-6.807-6.807c-.198.043-.402.066-.609.066H3.75a1.125 1.125 0 110-2.25h1.005c.207 0 .411-.023.609-.066a8.962 8.962 0 016.807-6.807c-.043-.198-.066-.402-.066-.609V5.625c0-.621.504-1.125 1.125-1.125z"
                  />
                </svg>
              </button>

              {/* Share Icon */}
              <button 
                onClick={() => sendNotify({type: "⬆️share", rec_name: user.name, rec_id: user.id})}
                className="flex items-center gap-1 hover:text-green-500 transition"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 12h9m0 0l-3.75 3.75M16.5 12l-3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
