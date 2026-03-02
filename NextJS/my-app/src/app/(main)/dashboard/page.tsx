"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function DashboardPage(){
    const state = useSelector((s: RootState) => s.auth);
    const router = useRouter();

    useEffect(() => {
        if (!state.isAuthenticated) {
            router.replace('/auth/signIn');
        }
    }, [state.isAuthenticated, router]);

    if (!state.isAuthenticated) return null;

    return (
        <div>
            <p>Welcome to dashboard</p>
        </div>
    )
}