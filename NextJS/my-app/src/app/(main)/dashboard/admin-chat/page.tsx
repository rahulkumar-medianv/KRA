"use client";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminChatPanel from "../../../../components/AdminChatPanel";
import { RootState } from '@/src/redux/store';

 export default function AdminChatPage() {
  const router = useRouter();
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/'); // redirect non-admins
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return null; // or loading indicator
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin - Live Chat</h2>
      <div className="bg-white rounded shadow p-4">
        {/* AdminChatPanel is a client component that opens WebSocket and shows messages */}
        <AdminChatPanel />
      </div>
    </div>
  );
}

