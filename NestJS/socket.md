# Happen when user connects

- When user open app browser connects to server and websocket connection socket ID
- This socket ID represents that specific connection - not the user permanently

- if user refreshes -> new socket ID
- if user opens another tab -> new socket ID
- if user uses mobile + desktop -> 2 socket IDs

so socket ID = connection
Not != user identity

## How One-to-One Chat works without Rooms

- if we don't use rooms, then:
  server must know: - Which socket ID belongs to which user ?
- so the flow becomes:
- STEP 1: User connects - user sends their identity (email/userID) to server

STEP 2: server keeps something like:
user A -> socket ID 123
user B -> socket ID 456

Now server knows who is online and where to send messages.

## Difference Between Room and No Room ?

- Without Room: send message to specific socket ID.

- With Room: Both users join a private Group and then send message to that group (Speak inside a private chat goup with 2 members.)

# Problem without Rooms:

- users opens 3 tabs, user reconnects, user temporarily disconnects so now multiple socket IDs

- WebSocket is a protocol for real-time, two - way communication between: Client(browser/app) server

HTTP: client sends request , server sends response, connection closes

WebSocket: Connection stays open, Both sides can send data anytime

# WebSocket works internally

- STEP 1: Browser 1st sends normal HTTP request, server upgrades it to WebSocket. if accepted -> connection becomes persistent

- STEP 2: Now Connection stays open., No closing after response. Both sides can send data anytime.

# What is Socket.IO

- it is a JS library built on top of WebSocket.
- it makes real-time communication:

WebSocket = Raw engine
Socket.IO = Engine + Gearbox + steering + features

# How Socket.IO Works Internally

- Tries websocket first
