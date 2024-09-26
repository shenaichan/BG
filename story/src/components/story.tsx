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
  | "look"

export type Page = {
    content: (userInput: string, memories: Memory[], gameState: GameState) => React.ReactNode
    next: (userInput: string, memories: Memory[], gameState: GameState) => PageName
}

export const STORY: Record<PageName, Page> = {
  look: {
    content: () => {
      return (
        <>
          <p>
            You are in a Whataburger in Bumfuck Nowhere, New Mexico.
          </p>
          <p>
            Across from you sits a girl smiling at you pleasantly. She is looking at you expectantly.
          </p>
          <p>
            You notice the table is slightly sticky. There are two menus, two glasses of water, two mugs, and a steaming pot of coffee in front of you.
            Also on the table are your keys, your phone, and your wallet. Next to you on the booth is a toolbox.
          </p>
        </>
      )
    },
    next: () => {
      return "look";
    }
  },
  help: {
    content: () => {
      return (
        <>
          <p>
            No worries, talking to girls is hard.
          </p>
          <p>
            Some commands you can use:
            <ul>
              <li>
                <b>help</b>: pull up this menu again
              </li>
              <li>
                <b>undo</b>: undo previous command
              </li>
              <li>
                <b>look</b>: look around the scene
              </li>
            </ul>
          </p>
        </>
      )
    },
    next: () => {
      return "help";
    }
  },
  start: {
    content: () => {
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
    next: (userInput) => {
      if (userInput.includes("why")) {
        return "because";
      }
      return "start";
    }
  },
  because: {
    content: () => {
      return (
        <>
          <p>
            Because that's who you are.
          </p>
        </>
      )
    },
    next: () => {
      return "because";
    }
  },
};