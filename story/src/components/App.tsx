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
  const [gameState, setGameState] = useState<GameState>({ numTimesLookedAtToolbox: 0 })

  useEffect(() => {
    const [nextContent, nextGameState] = STORY[currentPage].content("", [], {numTimesLookedAtToolbox: 0})
    setChatHistory(
      [
        { role: 'narrator', 
          content: nextContent 
        }
      ])
    setGameState(nextGameState)
  }, [])

  function submitText() {
    setChatHistory(chatHistory => 
      [...chatHistory, 
        { role: 'player', 
          content: <p>{`> ${inputText}`}</p> 
        }
      ])
    
    const lowerInputText = inputText.toLowerCase()
    
    if (lowerInputText === 'help' || lowerInputText === 'look') {
      const [nextContent, nextGameState] = STORY[lowerInputText as PageName].content(lowerInputText, memories, gameState) 
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: nextContent
          }
        ])
      setGameState(nextGameState)
    } else if (lowerInputText.includes("look at toolbox")) {
      const [nextContent, nextGameState] = STORY['look at toolbox'].content(lowerInputText, memories, gameState)
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: nextContent 
          }
        ])
      setGameState(nextGameState)
      // update state in content
      

    }
    else {
      const nextPage = STORY[currentPage].next(lowerInputText, memories, gameState)
      const [nextContent, nextGameState] = STORY[nextPage].content(lowerInputText, memories, gameState)
      setCurrentPage(nextPage)
      setChatHistory(chatHistory => 
        [...chatHistory, 
          { role: 'narrator', 
            content: nextContent 
          }
        ])
      setGameState(nextGameState)
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
