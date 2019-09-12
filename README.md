# Game Me + You

Made in collaboration with [Rejin Cusi](https://github.com/rejincusi)

#### The backend for this project [game-server](https://github.com/nataliaev/geme-server)

#### To play the game, head to [Me + You](https://me-and-you.netlify.com)

## Technologies used

-   [React](https://reactjs.org)
-   [Redux](https://redux.js.org)
-   [Superagent](http://visionmedia.github.io/superagent/)
-   [Material-UI](https://material-ui.com)

## Features

- You need to log in or sign up.
- You can create a new game room or join one of the existing rooms to start the game.
- You can choose one of 4 types of the game: Numbers, Shapes, Colors or Emojies.
- During the game you and your partner try to undestand each other and choose the same variants. To help you to guess the right answer you are shown a hint - the previous answer of your partner.
- You also can see the current level, that you have riched in the game (labeled with color).
- At some level the game becomes more difficult to prevent you from giving the same answers in each round.
- Your results are saved to the database and you can see the total amount of your games won & failed.
- The room is deleated when the players left it.

## Installation

```
> git clone git@github.com:nataliaev/game-client.git
> cd game-client
> npm install
> npm run start
```
