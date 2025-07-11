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
  - [ ] drawing the snake and apple with correct coordinates
  - [ ] snake movement with keyboard keys
  - [ ] collision checking (snake and walls) / game over flag
  - [ ] apple spawning and collision logic (growing snake) 
  - [ ] game over flag when no more empty cells available
  - [ ] prettier game over states with an option to restart

- [ ] Talk about P2P implementation and update this list

## Temporary implementation details (subject to change)
- Display - rendering on canvas with exposed drawSnake(snake), drawApple(x, y), clear()
- Game - main loop with logic and drawing calls
- Snake - dataclass with an array of coordinates
- In the future Network - with exposed getOpponentSnake(): snake
- Utils - common functions
