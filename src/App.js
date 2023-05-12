import io from 'socket.io-client'
import './App.css';
import { useState } from 'react'
import Chat from './chat'

const socket = io.connect("http://localhost:3001"); 

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // through this runction we are sending data to the backend
      setShowChat(true);
      // !important

    }
  }; // if username is not an empty string AND if room is not an empty string, the user will bea ble to join the room

  return (



    <div className="App">
      {!showChat ? (
        <div className='join-session-section'>


          <h3>Join a chat</h3>
          <div class="form-group">
            <input className='form-field'
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value) // ELE MUDA OS STATES INDIVIDUALMENTE COM CADA INPUT!!!
                console.log(username) //IMPORTANT
              }}
            />
          </div>
          <input className='form-field'
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
              console.log(room) //!! IMPORTANT
            }}
          />
          <button className='button-3' onClick={joinRoom}>Join A Room</button>
        </div>) :
        (<Chat socket={socket} username={username} room={room} />)}
    </div>
  )
}

export default App;


// HOW i solved the heroku problem: https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error