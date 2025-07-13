# SnakeP2P

Classic Snake game with potential P2P play between two browsers, without a need for a server.

## TODO LIST

- [ ] Setting the environment with classes and boilerplate
  - [ ] classes with boilerplate code
  - [ ] html with all classes in the head

- [x] Implement Display class
  - [x] drawSnake() 
  - [x] drawApple()
  - [x] clear()

- [ ] Implement Game class
  - [X] drawing the snake and apple with correct coordinates
  - [X] snake movement with keyboard keys
  - [X] collision checking (snake and walls) / game over flag
  - [X] apple spawning and collision logic (growing snake) 
  - [X] game over flag when no more empty cells available
  - [ ] prettier game over states with an option to restart
  - [ ] snake speeds up when it eats an apple

- [ ] Talk about P2P implementation and update this list

## Temporary implementation details (subject to change)
- Display - rendering on canvas with exposed drawSnake(snake), drawApple(x, y), clear()
- Game - main loop with logic and drawing calls
- Utils - common functions
- In the future Network - with exposed getOpponentSnake(): snake
