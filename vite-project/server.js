/* 
1. Open up a socket server
2. Maintain a list of clients connected to the socket server
3. When a client sends a message to the socket server, forward it to all
connected clients
*/

import express from 'express'
import http from 'http'
import ViteExpress from 'vite-express'
import { WebSocketServer } from 'ws'

const app = express()

const server = http.createServer( app ),
      socketServer = new WebSocketServer({ server }),
      clients = []

let activeUsers = 0,
    likeCounter = []

socketServer.on( 'connection', client => {
  console.log( 'connect!' )

  activeUsers++; // increment activeUsers counter

  client.send('Connected to WebSocket server');
  client.send(JSON.stringify({ count: activeUsers }))
  //clients.forEach(c => {c.send(JSON.stringify({ count: activeUsers }))})
    
  // when the server receives a message from this client...
  client.on( 'message', msg => {
	  // send msg to every client EXCEPT the one who originally sent it
    clients.forEach( c => { if( c !== client ) c.send( msg ) })
    clients.forEach(c => {c.send(JSON.stringify({ count: activeUsers }))})
  })

  client.on('close', () => {
    const index = clients.indexOf(client)
    if (index !== -1) clients.splice(index, 1)
    activeUsers--; // decrement activeUsers counter
    console.log('Client disconnected')
    clients.forEach(c => {c.send(JSON.stringify({ count: activeUsers }))})
  })

  // add client to client list
  clients.push( client )
})

server.listen( 3050 )

ViteExpress.bind( app, server )