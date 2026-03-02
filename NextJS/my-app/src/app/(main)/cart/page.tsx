"use client"
import { RootState } from "@/src/redux/store"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"


export default function cartPage () {
    const state = useSelector((state: RootState) => state.auth);
    const router = useRouter();
   
    useEffect(() => {
        if(!state.isAuthenticated) return router.push('/auth/signIn')
    }, [router, state.isAuthenticated])

    return (
        <div>
            <h2>This is Cart page</h2>
            <p>Welcome to cart page</p>
        </div>
    )
}