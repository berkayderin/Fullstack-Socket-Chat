import React, { useEffect, useState } from 'react'

const Chat = ({ username, room, socket }) => {
	const [message, setMessage] = useState('')
	const [messageList, setMessageList] = useState([])

	useEffect(() => {
		socket.on('messageReturn', (data) => {
			setMessageList((prevMessageList) => [...prevMessageList, data])
		})
	}, [socket])

	const sendMessage = async () => {
		const messageContent = {
			username: username,
			message: message,
			room: room,
			date: `${new Date().getHours()}:${new Date().getMinutes()}`
		}

		await socket.emit('message', messageContent)
		setMessageList((prevMessageList) => [...prevMessageList, messageContent])
		setMessage('')
	}

	return (
		<div className="flex items-center justify-center h-full">
			<div className="w-1/3 h-[500px] bg-white relative">
				<div className="w-full h-17 bg-gray-700 flex items-center p-2">
					<div className="w-12 h-12 bg-white rounded-full"></div>
					<div className="ml-2">
						<p className="text-white font-bold">{username}</p>
						<p className="text-white text-xs">Oda {room}</p>
					</div>
				</div>
				<div className="w-full h-[400px] overflow-y-auto p-3">
					{messageList.map((val, key) => {
						return (
							<div
								key={key}
								className={`w-full flex break-all flex-col mb-3 ${
									username === val.username ? 'items-end' : 'items-start'
								}`}
							>
								<div
									className={`w-2/3 p-2 rounded-lg ${
										username === val.username ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-black'
									}`}
								>
									<p className="font-medium text-sm">{val.message}</p>
								</div>
								<p className="text-xs text-gray-500 mt-1">Saat {val.date}</p>
							</div>
						)
					})}
				</div>
				<div className="absolute bottom-0 left-0 w-full">
					<input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						type="text"
						placeholder="Mesajınızı yazın"
						className="w-3/4 h-12 p-3 outline-none"
						onKeyPress={(e) => (e.key === 'Enter' ? sendMessage() : null)}
					/>
					<button
						onClick={sendMessage}
						className="w-1/4 h-12 bg-indigo-600 text-white font-bold focus:outline-none hover:bg-indigo-950 transition duration-200 ease-in-out"
					>
						Gönder
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chat
