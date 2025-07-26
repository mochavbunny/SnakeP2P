"use strict";

class Game {
    static #display;

    /**
     * The first element is the head.
     * The last element is the last block of the tail.
     *
     * Example snake: [[1, 0], [2, 0]]
    */
    static #snake;
    /**
     * up, down, left or right.
     */
    static #snakeDirection;
    /**
     * Direction which we request the snake moves in on the next update().
     * If it's not null and not the opposite to the #snakeDirection, it will be applied.
     */
    static #snakeNewDirection;
    static #isGameOver = false;
    static #isPaused = true;
    static #updateInterval;

    static #apple;


    static run() {
        Display.initialize();
        
        Menu.setMenu(Constants.menuPages.gameMode);
        this.#initButtons();
        this.#initControls();
        Display.draw();
    }


    static #initBoard() {
        this.#snake = [[2, 1], [1, 1]];
        this.#snakeNewDirection = "right";

        const emptySquares = this.#getEmptySquares();
        this.#spawnApple(emptySquares);
    }


    static #initControls() {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    this.#snakeNewDirection = "up";
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    this.#snakeNewDirection = "down";
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.#snakeNewDirection = "left";
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    this.#snakeNewDirection = "right";
                    break;

            }
        })
    }


    static #initButtons() {
        const sp = document.getElementById("singleplayer-button");
        const mp = document.getElementById("multiplayer-button");
        const gm = document.getElementById("game-mode-button");
        const rt = document.getElementById("retry-button");

        sp.addEventListener("click", e => {
            Menu.hideMenu();
            this.#initGame();
        });

        mp.addEventListener("click", e => {
            alert("Coming soon!");
        });

        gm.addEventListener("click", e => {
            Menu.setMenu(Constants.menuPages.gameMode);
        });

        rt.addEventListener("click", e => {
            Menu.hideMenu();
            this.#initGame();
        });
    }


    static #initGame() {
        this.#isPaused = false;
        this.#isGameOver = false;
        this.#initBoard();

        this.#updateInterval = setInterval(() => this.#update(), 250);
    }


    static #update() {
        if (!this.#isPaused && !this.#isGameOver) {
            this.#updateDirection();
            this.#checkHeadCollision();

            // Additional check after possible #checkHeadCollision() isGameOver changes.
            if (!this.#isGameOver) {
                this.#moveSnake();
            }

            // Apple was consumed.
            if (!this.#apple) {
                const emptySquares = this.#getEmptySquares();

                if (emptySquares.length > 0) {
                    this.#spawnApple(emptySquares);
                } else {
                    alert("You won");
                    this.#isGameOver = true;
                }
            }
        } else if (this.#isGameOver) {
            clearInterval(this.#updateInterval);
            Menu.setMenu(Constants.menuPages.gameOver);
            Menu.showMenu();
        }

        Display.draw(this.#snake, this.#apple);
    }


    static #updateDirection() {
        if (!this.#snakeNewDirection) {
            return;
        }

        if (Utils.areOppositeDirections(this.#snakeNewDirection, this.#snakeDirection)) {
            return;
        }

        this.#snakeDirection = this.#snakeNewDirection;
        this.#snakeNewDirection = null;
    }


    /**
     * Checks the collisions and based on them updates the game state, including the game over flag.
     */
    static #checkHeadCollision() {
        const currentHead = this.#snake[0];

        // Position at which the snake's head
        // is going to be after the update() is done
        const futureHead = [currentHead[0], currentHead[1]];
        this.#moveBlock(futureHead, this.#snakeDirection);

        // Apple collision
        if (futureHead[0] === this.#apple[0] && futureHead[1] === this.#apple[1]) {
            this.#apple = null;
            this.#snake.push([0, 0]);
            return;
        }

        // Wall collisions
        const horizontalCollision = futureHead[0] < 0 || futureHead[0] > Constants.columns - 1;
        const verticalCollision = futureHead[1] < 0 || futureHead[1] > Constants.rows - 1;

        if (horizontalCollision || verticalCollision) {
            this.#isGameOver = true;
            return;
        }

        // Snake tail collisions
        for (let i = 1; i < this.#snake.length; i++) {
            const block = this.#snake[i];

            if (futureHead[0] === block[0] && futureHead[1] === block[1]) {
                this.#isGameOver = true;
                return;
            }
        }
    }


    /**
     * Movement is implemented in reverse.
     * The last block is moved into the position of the next one.
     * And the next block is moved into the position of the one after.
     * The process is repeated until the head.
     * Then the head is moved in the requested direction.
     */
    static #moveSnake() {
        this.#moveTail();
        this.#moveBlock(this.#snake[0], this.#snakeDirection);
    }


    static #moveBlock(block, direction) {
        switch (direction) {
            case "left":
                block[0] -= 1;
                break;
            case "right":
                block[0] += 1;
                break;
            case "up":
                block[1] -= 1;
                break;
            case "down":
                block[1] += 1;
                break;
        }
    }


    static #moveTail() {
        for (let i = this.#snake.length - 1; i >= 1; i--) {
            const nextBlock = this.#snake[i - 1];
            this.#snake[i] = [nextBlock[0], nextBlock[1]];
        }
    }


    static #getEmptySquares() {
        const allSquares = [];
        for (let y = 0; y < Constants.rows; y++) {
            for (let x = 0; x < Constants.columns; x++) {
                allSquares.push([x, y]);
            }
        }

        // Filter out squares that contain snake blocks.
        return allSquares.filter((square) => {
            for (let i = 0; i < this.#snake.length; i++) {
                const snakeBlock = this.#snake[i];

                if (snakeBlock[0] === square[0] && snakeBlock[1] === square[1]) {
                    return false;
                }
            }

            return true;
        });
    }


    static #spawnApple(emptySquares) {
        const i = Utils.getRandomInt(0, emptySquares.length - 1);
        this.#apple = emptySquares[i];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Game.run();
})