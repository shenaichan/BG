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
  const [memories, setMemories] = useState<Memory[]>([])
  const [gameState, setGameState] = useState<GameState>({ numTimesAsked: 0 })

  useEffect(() => {
    setChatHistory(chatHistory => 
      [...chatHistory, 
        { role: 'narrator', 
          content: STORY[currentPage].content(inputText, memories, gameState) 
        }
      ])
  }, [currentPage])

  function submitText() {
    setChatHistory(chatHistory => 
      [...chatHistory, 
        { role: 'player', 
          content: <p>{`> ${inputText}`}</p> 
        }
      ])

    const nextPage = STORY[currentPage].next(inputText.toLowerCase(), memories, gameState)

    // setGameState(gameState => ({ ...gameState, numTimesAsked: gameState.numTimesAsked + 1 }))

    if (nextPage !== currentPage) {
      setCurrentPage(nextPage)
    }
    else {
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: STORY[currentPage].content(inputText, memories, gameState) 
          }
        ])
    }

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
