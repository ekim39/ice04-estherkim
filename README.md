# ICE 04: Websockets - Esther Kim

FOr ICE 04, I built a very simple (websockets) messaging application where online users can chat with all other users online and set their own username for the session. Users will be notified when other users join and there is a counter that keeps track of how many live users there are.

One challenge I faced was converting Svelte to React when I was following the demo. The demo was in Svelte, but converting it to React was difficult because I wasn't sure how converting between the two languages would affect the way the application ran. I had to make some edits to the server.js and App.jsx files to handle the connections and messages sent properly. Another challenge was trying to make sure the format of the data I was sending was consistent so that the same code can be used by all clients, but rendered slightly differently depending on their variables.

I used this website (https://www.bootdey.com/snippets/view/Chat-box) as a template for my chat box styling. I used the code provided in App.css and used the styling to style the HTML elements in App.jsx.

### Instructions

- To run the application, enter the foler "vite-project" using the command "cd vite-project". Then, enter the command "npm run build" to build the application. Then, enter "node server.js" in one terminal to start the server locally. You may access the website by entering the link "http://localhost:3050/". You may open the link on different browsers/tabs to simulate different users.
