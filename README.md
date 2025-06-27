# ICE 04: Websockets - Esther Kim

FOr ICE 04, I built a very simple (websockets) messaging application where online users can chat with all other users online and set your own username for the session.

One challenge I faced was converting Svelte to React when I was following the demo. The demo was in Svelte, but converting it to React was difficult because I wasn't sure how converting between the two languages would affect the way the application ran. I had to make some edits to the server.js and App.jsx files to handle the connections and messages sent properly.

### Instructions

- To run the application, enter the command "node server.js" in one terminal to start the server side. Then, enter "npm run dev" in another to start the client side". You may open the link on different browsers/tabs to simulate different users.

2. Implement the basic websockets setup demo from the [sockets guide](https://github.com/jmcuneo/cs4241-guides/blob/master/using.sockets.md). Make sure that is up and running correctly before proceeding to the next step.

3. Using the demo as a starting point, create a simple networked web application. Make sure the application can handle more than one person. If you're completing this assignment by yourself, find a friend to test it with you, or try to connect from a second computer.

4. Write up a README file that includes the names of all of your group members and a description of what the application does. Be sure to list anything a user might need to know before using your application. Also describe any challenges you faced.

5. Submit your final assignment by initiating a pull request against this repo.

**NOTE:** The demo uses Svelte, but you are welcome to switch to a different UI framework if you prefer.
