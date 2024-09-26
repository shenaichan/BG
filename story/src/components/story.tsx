import React from 'react'

export type Memory =
    "memory1"
  | "memory2"
  | "memory3"

export type GameState = {
  numTimesAsked: number
}

export type PageName = 
    "start"
  | "because"
  // | "door"
  // | "window"

export type Page = {
    content: (userInput: string, memories: Memory[], gameState: GameState) => React.ReactNode
    next: (userInput: string, memories: Memory[], gameState: GameState) => PageName
}

export const STORY: Record<PageName, Page> = {
  start: {
    content: (userInput, memories, gameState) => {
      return (
        <>
          <p>
            You are not very good at talking to girls. You remind yourself that 
            you are, in fact, a girl yourself -- but this does not really seem to 
            have any effect on the fact that you are not very good at talking to girls.
          </p>
          <p>
            Nevertheless, there is a girl sitting in front of you. She is happy 
            to be here with you. She has told you as much. You do not entirely 
            believe this.
          </p>
        </>
      )
    },
    next: (userInput, memories, gameState) => {
      if (userInput.includes("why")) {
        return "because";
      }
      return "start";
    }
  },
  because: {
    content: (userInput, memories, gameState) => {
      return (
        <>
          <p>
            Because that's who you are.
          </p>
        </>
      )
    },
    next: (userInput, memories, gameState) => {
      return "because";
    }
  },
};