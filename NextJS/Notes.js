/*
Setup Next.js project
-------------------------
npx create-next-app@latest <project_name>
Run Command: npm run dev -- URL localhost:3000

App/ -> this is the main new Next.js App Router

layout.tsx --> Global Layout
- this wraps All Pages.

used for -> Navbar, footer, ThemeProviders, Redux provider

Page.tsx -- Every route Must have page.tsx  -> page.tsx = screen/page component


Next.js App Router
--------------------
Next.js Reads folders and builds a layout tree automatically.

## How next.js makes THis possible (automatically layout will wrapper)
next.js use layout rendering
- this ayout automatically wraps:
- all pages
- all child routes
- all nested folders

Rendering -- How HTML is created and send to the browser.

user - server - html - browser - screen

CSR - client side rendering
SSR - server side rendering
SSG - static site generation

1. CSR = Client side Rendering
------------------------------
- Browser requests page
- server sends empty html + js
- React runs in browser
- API call happens
- UI appears

2. SSR - Server side rendering
-----------------------------------
- on the server for every request.
- user requests page
- server fetches data
- server builds HTML
- Ready HTMl send to browser



*/

/*
Routing
--------
1. File-based Routing 
Folder name = URL path
page.tsx = page content

also the nested routing

profile/page.tsx -- localhost:3000/profile
profile/setting/page.tsx -- localhost:3000/profile/setting

Dynamic routing
product/page.tsx -- localhost:3000/product
product/[id]/page.tsx -- here [id] is Dynamic router
ex: localhost:3000/product/123



Navigation: Using <Link> & Using useRouter()

Next.js currently has two routing systems:
1. Page Router (old)
2. App Router (new recommended)

1. Page Router (Old System) -- Used before next.js 13.

CSR - Browser calls API after page loads. (page loads -> fetch -> show data)
SSR - next.js calls backend before sending page.
server fetch -> HTML read -> send to browser (Faster SEC + first load.)

*/

/*

React Toolkit
---------------
Redux Toolkit -> In Next.js, components normally manage state using (useState).
But when state is needed everywhere, Redux helps.

Common Global state Ex:
- Authentication (logged in user)
- Theme(dark/light)
- Cart items
- Notifications
- Share API Data


Care Concepts:
----------------
Store: The central database of app (Holds all global state).

Slice: A piece of the store. (counterSlice, authSlice, themeSlice)
- each slice contains (state, reducers, actions)

Reducer : Function that updates state.
Action: An instruction send to redux.
Provider: Connects Redux store to your Next.js app.
(Without provider - components cannot access store.)


Install Redux Toolkit (Next.js)
npm install @reduxjs/toolkit react-redux

*/

/*

TanStack Query 
----------------

TanStack Query (React Query) is a library that helps: 
- Fetch data from backend APIs
- Store server data automatically
- cache data
- handle loading & errors
- Refetch data when needed

In simple words: TanStack Query = Smart API data manager


*/

/*
HTTp & WebSocket
---------------------

HTTP - (Normal API)
client -> request -> server
server -> Response -> client
connection closed

WebSocket - (Real-Time)
server -> Message -> client
client -> message -> server

No need to request again and again


How to implement using NestJS (Backend);
in NestJS we use: 
- @nestjs/websockets
- socket.io

STEP: 1 install
----------------
npm install @nestjs/websockets @nestjs/plateform-socket.io socket.io

STEP: 2 Create Gateway
- chat.gateway.ts

export class ChatGateway{
@WebSocketServer()
server: Server;

// client sends message
@SubscribeMessage('sendMessage')
handleMessage(@MessageBody() data: any){
console.loh("Received", Data);

// Broadcast to all clients
this.server.emit('receivemessage', data)
}
}


Next.js Frontend (Connect to NestJS)
npm install socket.io-client

*/

/*
Webhook
--------
- When Server A automatically sends to server B when an event happens.

we don't ask for the data
it sends automatically.

- A Webhook is a way for one application to automatically send real-time data to another application when a specific event happens.

Webhook - automatic event-based notification send for one server to another server.
- you give your server URl to another service
- when event happens -> that serivce automatically sends data to your URL

 */

/*

Caching & Refetch Behavior
-----------------------------

Avoid unnecessary API calls while keeping data fresh.
- instead of calling API every time -> we store in memory (cache) and control when to refetch.



*/
