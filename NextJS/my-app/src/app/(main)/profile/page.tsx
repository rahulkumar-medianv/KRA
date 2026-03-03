"use client"
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import ProfileCard from "./profileCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function profilePage(){
    const state = useSelector((state: RootState) => state.auth);
    const user = state.user;
    const router = useRouter();

    useEffect(() => {
        if (!state.isAuthenticated) {
            router.replace('/auth/signIn');
        }
    }, [state.isAuthenticated, router]);

    return (
        <>
            <ProfileCard/>
           
        </>
    )
}