import { useState, useEffect, useRef } from 'react'
import './App.css'

// I used this website as a template to style the chat app https://www.bootdey.com/snippets/view/Chat-box

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
      ws.current.send( 'A new user has connected.' );
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
        data = JSON.parse(message);
        isJSON = true;
      } catch (e) {
        isJSON = false;
      }
      
      if (isJSON && data.count !== undefined) {
        setCounter(data.count);
      } else if (!isJSON) {
        setMsgs(prevMsgs => [...prevMsgs, {username: '', txt: message}]);
      } else {
        // adding on message to the messages we have saved.
        setMsgs(prevMsgs => [...prevMsgs, {username: data.username, txt: data.txt}]);
      }

    }

    return () => {
      ws.current?.close(); // cleanup
    };
  }, []) // ensures that this only runs once.

  // sends message that is typed into input box when key "Enter" is hit
  const send = function(event) {
    if (event.type === 'click' || event.key === 'Enter') {
      const txt = document.getElementById('message').value;
      // adds new message from this client onto the array msgs
      if (username !== '') {
        ws.current.send(JSON.stringify({username: username, txt: txt}));
        setMsgs(prevMsgs => [...prevMsgs, {username: `${username} (me)`, txt: txt}]);
      } else {
        ws.current.send(JSON.stringify({username: 'guest', txt: txt}));
        setMsgs(prevMsgs => [...prevMsgs, {username: 'me', txt: txt}]);
      }
    }
  }

  const sendUser = function(event) {
    const txt = document.getElementById('username').value;
    setUsername(txt);
  }

  return (
    <>

      <div className="container bootstrap snippets bootdey">
          <div className="row">
              <div className="col-md-12 col-md-offset-4">
                  <div className="portlet portlet-default">


                  <div className="portlet-heading">
                    <div className="portlet-title">
                        <h4><i className="fa fa-circle text-green"></i> {username === ''? 'Guest' : username}</h4>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  
                  <div className='portlet-purple'>
                    <div className='portlet-heading'>
                      <h1>Chat Together</h1>
                      <p>This is a place where you can talk with all other online users and like their message.</p>
                      <h2>Active Users: <span id='activeUserCounter'>{counter}</span></h2>
                      
                      <div>
                        <label htmlFor='username'>Want to set a username?:</label>
                        <input type="text" id='username' />
                        <button id="sending" onClick={ e => sendUser()} className='btn-white'>Submit</button>
                      </div>
                      <br />
                    </div>
                  </div>

                  <div>
                  <div className="portlet-body chat-widget" style={{overflowY: 'auto', width: 'auto', height: '300px'}}>
                    {msgs.map((msg, index) => (
                      <div key={index}>
                        <h4>{msg.username !== ''? msg.username : 'SYSTEM MESSAGE'}</h4>
                        <p>{msg.txt}</p>
                      </div>
                    ))}
                    
                  
                  </div>
                  </div>

                    <div className="portlet-footer">
                      <div>
                        <label htmlFor='message'>Message:</label>
                        <br />
                        <input type="text" id='message' onKeyUp={send} />
                        <button id="user" onClick={send} className='btn-white'>Send</button>
                      </div>
                      
                    </div>
                
                </div>
              </div>
          </div>
      </div>    


    </>
  )
}

export default App
