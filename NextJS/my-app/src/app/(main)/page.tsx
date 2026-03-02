"use client"
import { useEffect } from "react";
import { Counter } from "../../components/Counter";
import DummyAPI from "../../components/DummyAPI";
import { productAPI } from "@/src/api/productapi";

export default function Home() {
  const product = async () => {
    const data = await productAPI();
    console.log(data);
  }

  useEffect(()=> {
    product();
  },[])
  

  return (
    <div>
      {/* <h2>Next.js with App Routing</h2>
      <Counter/>

      <DummyAPI/>
       */}
    </div>
  );
}
