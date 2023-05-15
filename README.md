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
- Error handling e.g. for piece-taking behind piece bug.
- Add custom error messages with e.g. ternaries to offer more info like whose turn it is.

## NTH:

- Chess Clock?
- Database to help sessions persist , or save games.
- "Beginner mode" - shows available moves.

## Checking for check:

- When do we check for check:
  - to constrain each move - use tempStatefulPieces, after other checks but before change in state.
  - to notify?
  - to check for checkmate?
    - For this use-case we need a separate function which notifies when you're in check. Combine this with the existing func, iterated for all King moves, and we've checked for checkmate.
