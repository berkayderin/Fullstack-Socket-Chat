import './App.css'

import Chat from './components/Chat'
import Room from './components/Room'
import io from 'socket.io-client'
import { useState } from 'react'

const socket = io.connect('http://localhost:5000')

function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [chatScreen, setChatScreen] = useState(false)

	return (
		<div className="bg-gray-100 h-screen">
			{!chatScreen ? (
				<Room
					username={username}
					room={room}
					setUsername={setUsername}
					setRoom={setRoom}
					setChatScreen={setChatScreen}
					socket={socket}
				/>
			) : (
				<Chat username={username} room={room} socket={socket} />
			)}
		</div>
	)
}

export default App
