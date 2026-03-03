"use client";

import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ContentManager() {
  const state = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated || state?.user?.role !== "admin") {
      router.push("/auth/signIn");
    }
  }, [router, state.isAuthenticated, state?.user?.role]);

  return (
    <div>
      <h3>This page is accessible only by Admin</h3>
      <p>Welcome to Content Manager page</p>
    </div>
  );
}