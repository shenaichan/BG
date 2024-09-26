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
  | "look at toolbox"
  | "sorry"

export type Page = {
    content: (userInput: string, memories: Memory[], gameState: GameState) => React.ReactNode
    next: (userInput: string, memories: Memory[], gameState: GameState) => PageName
}

export const STORY: Record<PageName, Page> = {
  "look": {
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
  "help": {
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
  "start": {
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
          </p>
          <p>
            This morning you woke up in a panic, disoriented, immersed in an amnesiac
            haze. You do not remember your name. You do not remember her name. 
            You do not know how old you are -- twenty-something, perhaps, but the specific year escapes you.
            You recall your life in fragments -- the vague notion
            that the two of you are on a road trip, that you are escaping from somewhere,
            and uneasily heading somewhere else. 
          </p>
          <p>
            Louder than anything else, a thought resounds in your mind:
            you are horrifically, irrevocably in love with this girl. The weight of it 
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
      } else if (userInput.includes("look at") && userInput.includes("toolbox")) {
        return "look at toolbox";
      }
      return "sorry";
    }
  },
  "because": {
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
  "look at toolbox": {
    content: () => {
      return (
        <>
          <p>
            You take your eyes off the beautiful girl in front of you to look at your toolbox. Nice going!
          </p>
          <p>
            You are deeply fond of your toolbox. You've had it since you were a teenager, and it's
            accompanied you through a great many life transition. It seems to be locked right now.
          </p>
          <p>
            The girl in front of you raises her eyebrows. You had basically begged her to let you take
            the toolbox in. <em>I'll leave the key in the car</em>, you'd said. An uneasy compromise.
          </p>
        </>
      )
    },
    next: () => {
      return "start";
    }
  },
  "sorry": {
    content: () => {
      return (
        <>
          <p>
            That is not something you can do, at least right now.
          </p>
        </>
      )
    },
    next: (userInput) => {
      if (userInput.includes("look at") && userInput.includes("toolbox")) {
        return "look at toolbox";
      }
      return "start";
    }
  },
};