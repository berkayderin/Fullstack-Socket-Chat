import React from 'react'

const Room = ({ username, room, setUsername, setRoom, setChatScreen, socket }) => {
	const sendRoom = () => {
		if (username && room) {
			socket.emit('room', room)
			setChatScreen(true)
		} else {
			alert('Lütfen kullanıcı adı ve oda adı giriniz.')
		}
	}

	return (
		<div className="flex items-center justify-center h-full">
			<div className="w-1/3 h-[250px] bg-indigo-600 flex flex-col space-y-4 p-3">
				<h1 className="text-3xl font-bold text-white text-center">Sohbet Et</h1>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="h-12 rounded-lg p-3 outline-none"
					type="text"
					placeholder="Kullanıcı Adı"
				/>
				<input
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					className="h-12 rounded-lg p-3 outline-none"
					type="text"
					placeholder="Oda Adı"
				/>
				<button
					className="h-12 rounded-lg bg-indigo-500 text-white font-bold focus:
                outline-none hover:bg-indigo-950 transition duration-200 ease-in-out"
					onClick={sendRoom}
				>
					Giriş Yap
				</button>
			</div>
		</div>
	)
}

export default Room
