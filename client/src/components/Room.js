import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import React from 'react'

const Room = ({ username, room, setUsername, setRoom, setChatScreen, socket }) => {
	const sendRoom = () => {
		const regex = /^[a-zA-Z]+$/
		const roomRegex = /^[0-9]+$/

		if (username === '' || room === '') {
			toast.error('Kullanıcı adı ve oda adı boş bırakılamaz!', {
				position: 'bottom-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			})
		} else if (!username.match(regex)) {
			toast.error('Kullanıcı adı sadece harflerden oluşabilir!', {
				position: 'bottom-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			})
		} else if (!room.match(roomRegex)) {
			toast.error('Oda adı sadece rakamlardan oluşabilir!', {
				position: 'bottom-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			})
		} else {
			socket.emit('joinRoom', { room })
			setChatScreen(true)
		}
	}

	return (
		<div className="flex items-center justify-center h-full">
			<div className="w-1/3 h-[250px] bg-indigo-600 flex flex-col space-y-4 p-3 border-2 border-indigo-900 rounded-lg">
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
					onKeyPress={(e) => (e.key === 'Enter' ? sendRoom() : null)}
				/>
				<button
					className="h-12 rounded-lg bg-indigo-500 text-white font-bold focus:
                outline-none hover:bg-indigo-950 transition duration-200 ease-in-out"
					onClick={sendRoom}
				>
					Giriş Yap
				</button>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</div>
	)
}

export default Room
