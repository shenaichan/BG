import React, { useState, useEffect } from 'react'
import css from 'components/App.module.css'
import Chat from 'components/chat/Chat'
import { STORY, PageName, Memory, GameState } from 'components/story'

export type ChatMessage = {
  role: 'player' | 'narrator'
  content: React.ReactNode
}

function App() {

  const [inputText, setInputText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<PageName>('start')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [memories] = useState<Memory[]>([])
  const [gameState] = useState<GameState>({ numTimesAsked: 0 })

  useEffect(() => {
    setChatHistory(
      [
        { role: 'narrator', 
          content: STORY['start'].content(inputText, memories, gameState) 
        }
      ])
  }, [])

  function submitText() {
    setChatHistory(chatHistory => 
      [...chatHistory, 
        { role: 'player', 
          content: <p>{`> ${inputText}`}</p> 
        }
      ])
    
    if (inputText.toLowerCase() === 'help' || inputText.toLowerCase() === 'look') {
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: STORY[inputText.toLowerCase() as PageName].content(inputText, memories, gameState) 
          }
        ])
    }
    else {
      const nextPage = STORY[currentPage].next(inputText.toLowerCase(), memories, gameState)
      setCurrentPage(nextPage)
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: STORY[nextPage].content(inputText, memories, gameState) 
          }
        ])
    }

    // setGameState(gameState => ({ ...gameState, numTimesAsked: gameState.numTimesAsked + 1 }))

    setInputText('')

  }

  return (
    <div className={css.container}>
      <Chat chatHistory={chatHistory} />
      <input 
        type="text" 
        className={css.input}
        value={`> ${inputText}`}
        onChange={(e) => setInputText(e.target.value.slice(2))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitText()
          }
        }}
      />
    </div>
  )
}

export default App
