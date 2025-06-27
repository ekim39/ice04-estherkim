import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [msgs, setMsgs] = useState([]); // array that holds onto all the messages
  const ws = useRef(null); // holds onto reference of ws (connection)
    
  useEffect(() => {
    // create one connection instead of creating new ones each time
    ws.current = new WebSocket( 'ws://127.0.0.1:3050' )

    // when connection opens, send this message
    ws.current.onopen = () => {
      ws.current.send( 'a new client has connected.' )
    }

    // adds msg to end of msgs array
    ws.current.onmessage = async msg => {
      let message;

      // handle issues of Blob
      if (msg.data instanceof Blob) {
        // if msg is a Blob, convert it to a string
        message = await msg.data.text();
      } else {
        // if msg is not a Blob, it is a string, so save as is.
        message = msg.data;
      }

      // adding on message to the messages we have saved.
      setMsgs(prevMsgs => [...prevMsgs, `them: ${message}`])
    }
  }, []) // ensures that this only runs once.

  // sends message that is typed into input box when key "Enter" is hit
  const send = function(event) {
    if (event.key === 'Enter') {
      const txt = document.querySelector('input').value
      ws.current.send( txt )
      // adds new message from this client onto the array msgs
      setMsgs(prevMsgs => [...prevMsgs, `me: ${txt}`])
    }
  }

  return (
    <>
      <input type="text" onKeyUp={send} />
      
      <div id='messages'>
        {msgs.map((msg, index) => (
          <h3 key={index}>{msg}</h3>
        ))}
      </div>
    </>
  )
}

export default App
