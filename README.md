# React Chess Game

## Run the game:

From the project root, run `yarn` to install dependencies, then `yarn dev` to run the development server. Navigate to the URL presented in the terminal to play.

## MVP

Client-side game, two human players, all rules followed.

Need to add:

- Turn-management
- Move constraints - use class-based approach.
  - In the handleMove() func, call a checkMoveAllowed() func, which takes in the piece type, and generates a list of endPosition codes that are valid.
    - Will need to
  - Check if requested end code is in this array. If not, cancel, setInitial(null) and throw error (maybe a modal?)
- Castling.
- En Passant
- Game win conditions.

## NTH:

- Chess Clock?
- Database to help sessions persist , or save games.
