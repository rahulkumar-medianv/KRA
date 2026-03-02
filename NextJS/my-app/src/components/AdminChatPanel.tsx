"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Msg = { id: string; content: string; from: string; time: string; clientId?: string; role?: string; email?: string };

export default function AdminChatPanel() {
  // store conversations keyed by clientId
  const [conversations, setConversations] = useState<{
    [client: string]: { msgs: Msg[]; email?: string };
  }>({});
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    // Construct WS URL: in dev use localhost, in prod use current host
    const isProduction = process.env.NODE_ENV === 'production';
    const wsUrl = isProduction ? `wss://${window.location.host}` : 'ws://localhost:3001';

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      setConnected(true);
      setError(null);
      try {
        ws.send(JSON.stringify({ type: 'identify', role: 'admin', user: user || null }));
      } catch (e) {}
    });

    ws.addEventListener('error', () => {
      setError('WebSocket connection error');
      setConnected(false);
    });

    ws.addEventListener('close', () => {
      setConnected(false);
    });

    ws.addEventListener('message', (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === 'history') {
          const convs: any = {};
          (data.messages || []).forEach((msg: Msg) => {
            const id = msg.email || msg.clientId || msg.from || 'unknown';
            if (!convs[id]) convs[id] = { msgs: [], email: msg.email || msg.from };
            convs[id].msgs.push(msg);
          });
          setConversations(convs);
          if (!selectedClientId) {
            const first = Object.keys(convs)[0];
            setSelectedClientId(first || null);
          }
        }
        if (data.type === 'message') {
          const msg: Msg = data.message;
          const id = msg.email || msg.clientId || msg.from || 'unknown';
          setConversations((c) => {
            const copy = { ...c };
            if (!copy[id]) copy[id] = { msgs: [], email: msg.email || msg.from };
            copy[id].msgs = [...copy[id].msgs, msg];
            // update email if not admin
            if (msg.from && msg.role !== 'admin') copy[id].email = msg.from;
            return copy;
          });
          if (!selectedClientId) {
            setSelectedClientId(id);
          }
        }
      } catch (err) {
        // ignore
      }
    });

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [user]);

  const send = () => {
    if (!input.trim() || !selectedClientId) return;
    const targetEmail = conversations[selectedClientId]?.email;
    const payload: any = { type: 'message', content: input, from: user?.email || 'admin', role: 'admin', target: selectedClientId };
    if (targetEmail) payload.targetEmail = targetEmail;
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setError('Not connected to server');
      return;
    }
    try {
      ws.send(JSON.stringify(payload));
    } catch (e) {
      setError('Failed to send');
    }
    setInput('');
  };

  return (
    <div className="p-4 flex">
      {/* conversation list */}
      <div className="w-1/4 border-r pr-2">
        <h4 className="font-medium mb-2">Users</h4>
        {Object.entries(conversations).map(([clientId, conv]) => (
          <div
            key={clientId}
            onClick={() => setSelectedClientId(clientId)}
            className={`p-2 rounded cursor-pointer mb-1 ${selectedClientId === clientId ? 'bg-indigo-100' : ''}`}
          >
            <div className="text-sm font-semibold">{conv.email || clientId}</div>
            <div className="text-xs text-gray-500">{conv.msgs.length} msg{conv.msgs.length !== 1 ? 's' : ''}</div>
          </div>
        ))}
      </div>

      {/* messages panel */}
      <div className="flex-1 pl-4">
        <h3 className="text-lg font-semibold mb-2">Conversation</h3>
        <div className="text-xs text-gray-500 mb-2">{connected ? 'Connected' : error ?? 'Disconnected'}</div>
        <div className="border rounded p-3 mb-3 max-h-72 overflow-auto bg-white">
          {(selectedClientId && conversations[selectedClientId]?.msgs || []).map((m) => (
            <div key={m.id} className={`mb-2 flex ${m.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${m.role === 'admin' ? 'bg-indigo-100 text-right' : 'bg-gray-100'} rounded-md p-2 text-sm`}> 
                <div className="text-xs text-gray-500">{m.from} <span className="text-xs text-gray-400">{new Date(m.time).toLocaleTimeString()}</span></div>
                <div className="mt-1">{m.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-md border px-2 py-1" placeholder="Reply to users..." aria-label="Admin reply input" />
          <button onClick={() => send()} disabled={!connected || !selectedClientId} className="rounded bg-indigo-600 px-3 text-white disabled:opacity-50">Send</button>
          {!connected && (
            <button onClick={() => {
              const ws = wsRef.current;
              try { if (ws && ws.readyState !== WebSocket.CLOSED) ws.close(); } catch (e) {}
              // Force a re-render by toggling state
              setConnected(false);
              setTimeout(() => window.location.reload(), 100);
            }} className="rounded border px-2 py-1 text-sm">Reconnect</button>
          )}
        </div>
    </div>
    </div>
  )
  }