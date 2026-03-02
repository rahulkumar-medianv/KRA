"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Msg = { id: string; content: string; from: string; time: string; role?: string; clientId?: string };

export default function ChatWidget() {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  if (!isAuthenticated) return null; // only logged‑in users see chat
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    if (!open) return;
    // Construct WS URL: in dev use localhost, in prod use current host
    const isProduction = process.env.NODE_ENV === 'production';
    const wsUrl = isProduction ? `wss://${window.location.host}` : 'ws://localhost:3001';
    setConnecting(true);
    setError(null);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setConnected(true);
      setConnecting(false);
      // identify as user
      try {
        ws.send(JSON.stringify({ type: "identify", role: user?.role || 'user', user: user || null }));
      } catch (e) {
        // ignore
      }
    });

    ws.addEventListener('error', (ev) => {
      setError('WebSocket connection error');
      setConnecting(false);
      setConnected(false);
    });

    ws.addEventListener('close', () => {
      setConnected(false);
      setConnecting(false);
    });

    ws.addEventListener("message", (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "history") {
          setMessages(data.messages || []);
        }
        if (data.type === "message") {
          setMessages((m) => [...m, data.message]);
        }
      } catch (err) {
        // ignore
      }
    });

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [open, user]);

  const send = () => {
    if (!input.trim()) return;
    const payload = { type: "message", content: input, from: user?.email || 'anonymous', role: user?.role || 'user' };
    const ws = wsRef.current;
    if (!ws) {
      setError('No WebSocket connection');
      return;
    }
    if (ws.readyState !== WebSocket.OPEN) {
      setError('WebSocket not open');
      return;
    }
    try {
      ws.send(JSON.stringify(payload));
    } catch (err) {
      setError('Failed to send message');
    }
    setInput("");
  };

  return (
    <div>
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 p-3 text-white shadow-lg"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-h-96 rounded-lg bg-white shadow-xl flex flex-col">
          <div className="px-3 py-2 border-b">Support Chat</div>
          <div className="px-3 text-xs text-gray-500">{connecting ? 'Connecting...' : connected ? 'Connected' : error ?? 'Disconnected'}</div>
          <div className="p-3 overflow-auto flex-1" style={{ maxHeight: 320 }}>
            {messages.map((m) => (
              <div key={m.id} className={`mb-2 flex ${m.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${m.role === 'admin' ? 'bg-indigo-100 text-right' : 'bg-gray-100'} rounded-md p-2 text-sm`}> 
                  <div className="text-xs text-gray-500">
                    {m.from} <span className="text-xs text-gray-400">{new Date(m.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="mt-1">{m.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." aria-label="Chat message input" className="flex-1 rounded-md border px-2 py-1" />
              <button onClick={send} disabled={!connected} className="rounded bg-indigo-600 px-3 text-white disabled:opacity-50">Send</button>
            </div>
            {!connected && (
              <div className="mt-2 text-xs">
                <button onClick={() => { setOpen(false); setTimeout(() => setOpen(true), 100); }} className="text-sm text-blue-600">Reconnect</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
