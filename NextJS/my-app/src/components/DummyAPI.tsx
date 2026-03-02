"use client";

import { useEffect, useState } from "react";
import { userData } from "../api/dummyapi";
import { UserData } from "../types/user";

export default function DummyAPI() {
  const [users, setUsers] = useState<UserData[]>([]);

 async function  apiCall() {
    const res = await userData();
    setUsers(res);
 }

 useEffect(()=> {
    apiCall();
 }, []);

 console.log(users)


  return (
    <div>
      <h2>This is dummy data api call</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}