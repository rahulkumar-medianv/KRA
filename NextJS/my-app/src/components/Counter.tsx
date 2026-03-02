"use client"
import React, { useState } from "react"

export const Counter = () => {
    const [count, setCount] = useState<number>(0)

    const increment = () => {
       setCount((prev) => (prev + 1));
    }

    const decrement = () => {
        if(count <= 0) return 0
        setCount((prev) => (prev - 1))
    }

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

        </div>
    )
}