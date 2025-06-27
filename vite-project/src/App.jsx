import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [msgs, setMsgs] = useState([]); // array that holds onto all the messages
  const ws = useRef(null); // holds onto reference of ws (connection)
  const[counter, setCounter] = useState(0);
  const[username, setUsername] = useState('');
    
  useEffect(() => {
    // create one connection instead of creating new ones each time
    ws.current = new WebSocket( 'ws://127.0.0.1:3050' )

    // when connection opens, send this message
    ws.current.onopen = async msg => {
      ws.current.send( 'a new client has connected.' );
    }

    // adds msg to end of msgs array
    ws.current.onmessage = async msg => {
      let message;
      let isJSON;
      let data;

      // handle issues of Blob
      if (msg.data instanceof Blob) {
        // if msg is a Blob, convert it to a string
        message = await msg.data.text();
      } else {
        // if msg is not a Blob, it is a string, so save as is.
        message = msg.data;
      }

      try {
        data = JSON.parse(msg.data);
        isJSON = true;
      } catch (e) {
        isJSON = false;
      }
      
      if (isJSON && data.count !== undefined) {
        setCounter(data.count);
      } else {
        // adding on message to the messages we have saved.
        setMsgs(prevMsgs => [...prevMsgs, `${message}`]);
      }

    }

    return () => {
      ws.current?.close(); // cleanup
    };
  }, []) // ensures that this only runs once.

  // sends message that is typed into input box when key "Enter" is hit
  const send = function(event) {
    if (event.key === 'Enter') {
      const txt = document.getElementById('message').value;
      // adds new message from this client onto the array msgs
      if (username !== '') {
        ws.current.send(`${username}: ${txt}`);
        setMsgs(prevMsgs => [...prevMsgs, `${username} (me): ${txt}`]);
      } else {
        ws.current.send(`them: ${txt}`);
        setMsgs(prevMsgs => [...prevMsgs, `me: ${txt}`]);
      }
    }
  }

  const sendUser = function(event) {
    const txt = document.getElementById('username').value;
    setUsername(txt);
  }

  return (
    <>
      <h1>Chat Together</h1>
      <p>This is a place where you can talk with all other online users and like their message.</p>
      <h2>Active Users: <span id='activeUserCounter'>{counter}</span></h2>
      <div>
        <label htmlFor='username'>Want to set a username?:</label>
        <input type="text" id='username' />
        <button id="sending" onClick={ e => sendUser()}>Submit</button>
      </div>
      <br />
      <div>
        <label htmlFor='message'>Message:</label>
        <input type="text" id='message' onKeyUp={send} />
      </div>
      
      <div id='messages'>
        {msgs.map((msg, index) => (
          <h3 key={index}>{msg}</h3>
        ))}
      </div>
    </>
  )
}

export default App
