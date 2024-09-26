import { ChatMessage } from 'components/App'
import css from './Chat.module.css'

function Chat({ chatHistory }: { chatHistory: ChatMessage[] }) {
  return (
    <div>
      {chatHistory.map((message, index) => (
        <div key={index} 
          className={css.chat}
          style={{ color: message.role === 'player' ? 'lightblue' : 'white' }}
        >
          {message.content}
        </div>
      ))}
    </div>
  )
}

export default Chat
