"use client"
import { useEffect } from "react";
import { Counter } from "../../components/Counter";
import DummyAPI from "../../components/DummyAPI";
import { productAPI } from "@/src/api/productapi";
import { getAllMessage } from "@/src/api/sendMessage";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
   const QueryClient = useQueryClient()
  const product = async () => {
    const data = await productAPI();
    console.log(data);
  }

  useEffect(()=> {
    product();
  },[])

  
  const fetchMessage = async () => {
    const res = await getAllMessage();
    return res;
  }

  const {data, isLoading, error} = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessage,
    refetchInterval: 5000,
  });

  if(isLoading) return <p>Loading....</p>
  if(error) return <p>SomeThing Went Wrong, Please Try After Some Time.</p>


  // check cache data
  const checkCache = () => {
    const cachedData = QueryClient.getQueryData(['messages']);
    console.log(cachedData);
  }


  return (
    <div>
      {/* <h2>Next.js with App Routing</h2>
      <Counter/>

      <DummyAPI/>
       */}
       {/* <button onClick={checkCache}>Check Cache</button> */}
       {data?.map((user: any) => (
        <p key={user.id}>{user.fname}</p>
       ))}
    </div>
  );
}
