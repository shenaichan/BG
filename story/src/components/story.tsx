import React from 'react'
import css from 'components/Story.module.css'

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
  | "help"

export type Page = {
    content: (userInput: string, memories: Memory[], gameState: GameState) => React.ReactNode
    next: (userInput: string, memories: Memory[], gameState: GameState) => PageName
}

export const STORY: Record<PageName, Page> = {
  help: {
    content: (userInput, memories, gameState) => {
      return (
        <>
          <p>
            No worries, talking to girls is hard.
          </p>
          <p>
            Some commands you can use:
            <ul>
              <li>
                <b>help</b>: pulls up this menu again
              </li>
              <li>
                <b>undo</b>
              </li>
            </ul>
          </p>
        </>
      )
    },
    next: (userInput, memories, gameState) => {
      return "help";
    }
  },
  start: {
    content: (userInput, memories, gameState) => {
      return (
        <>
          <p>
            You are <span className={css.highlight}>not very good at talking to girls</span>. You remind yourself that 
            you are, in fact, a girl yourself -- but this does not really seem to 
            have any effect on the fact that you are not very good at talking to girls.
          </p>
          <p>
            Nevertheless, there is a girl sitting in front of you. She is happy 
            to be here with you; she has told you as much. You do not entirely 
            believe this.
          </p>
          <p>
            You two are sitting in a booth in a Whataburger in the middle of 
            Bumfuck Nowhere, New Mexico.
            Your car is parked just outside, already 1,000 miles logged on the road trip
            the two of you have embarked upon.
          </p>
          <p>
            You are horrifically, irrevocably in love with this girl. The weight of it 
            grips you like a drowning man intent on taking you down with him.
          </p>
          <p>
            What will you do next?
          </p>
          <p className={css.ooc}>
            For new players, feel free to write "help" for ideas on how to proceed.
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