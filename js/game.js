"use strict";

class Game {
    /**
     * An array that stores an arbitrary number of players, however only 2 are supported at this stage
     */
    static snakes = [];
    
    /**
     * Flag for the #update function to know when to stop the game
     */
    static #isGameOver = false;

    /**
     * Flag that stops the update function from running while true
     */
    static #isPaused = true;

    /**
     * Stores the Interval object that runs the #update function
     */
    static #updateInterval;

    /**
     * Contains a gameModes constant to indicate the current game mode
     */
    static gameMode;

    /**
     * The coordinates of the apple
     */
    static apple;


    /**
     * The first function run, responsible for setting up initial objects
     */
    static run() {
        Display.initialize();
        
        Menu.setMenu(Constants.menuPages.gameMode);
        this.#initButtons();
        Display.draw();
    }


    /**
     * Sets up the HTML buttons for the game's menu
     */
    static #initButtons() {
        const sp = document.getElementById("singleplayer-button");
        const mp = document.getElementById("multiplayer-button");
        const gm = document.getElementById("game-mode-button");
        const rt = document.getElementById("retry-button");

        sp.addEventListener("click", e => {
            Menu.hideMenu();
            this.gameMode = Constants.gameModes.single;
            this.#initGame();
        });

        mp.addEventListener("click", e => {
            //alert("Coming soon!");
            Menu.hideMenu();
            //this.gameMode = Constants.gameModes.multiOnline;
            this.gameMode = Constants.gameModes.multiLocal;
            this.#initGame();
        });

        gm.addEventListener("click", e => {
            Menu.setMenu(Constants.menuPages.gameMode);
        });

        rt.addEventListener("click", e => {
            Menu.hideMenu();
            this.#initGame();
        });
    }


    /**
     * Sets up the game when a game mode is selected
     */
    static #initGame() {
        this.#isPaused = false;
        this.#isGameOver = false;
        this.#initBoard();

        this.#updateInterval = setInterval(() => this.#update(), Constants.updateRate);
    }


    /**
     * Initializes various aspects of the game when a game mode is selected, including setting up players
     */
    static #initBoard() {
        this.snakes = [];
        if (this.gameMode === Constants.gameModes.single) {
            const snake1 = new Snake(1);
            this.snakes.push(snake1);
        } else if (this.gameMode === Constants.gameModes.multiLocal) {
            const snake1 = new Snake(1);
            const snake2 = new Snake(2);
            this.snakes.push(snake1);
            this.snakes.push(snake2);
        }

        const emptySquares = this.#getEmptySquares();
        this.#spawnApple(emptySquares);
    }


    /**
     * Run at every update interval, responsible for all of the real time game logic
     */
    static #update() {
        if (!this.#isPaused && !this.#isGameOver) {
            this.snakes.forEach(snake => snake.update());

            this.snakes.forEach(snake => {
                let collisionFlag = snake.checkCollision(this.snakes, this.apple);

                if (collisionFlag === Constants.collisionFlag.collision) {
                    // TO DO: functionality for determining winner
                    this.#isGameOver = true;
                } else if (collisionFlag === Constants.collisionFlag.apple) {
                    this.apple = null;

                    const emptySquares = this.#getEmptySquares();

                    if (emptySquares.length > 0) {
                        this.#spawnApple(emptySquares);
                    } else {
                        alert("You won");
                        this.#isGameOver = true;
                    }
                }
            });

            if (this.#isGameOver) {
                clearInterval(this.#updateInterval);
                Menu.setMenu(Constants.menuPages.gameOver);
                Menu.showMenu();
            } else {
                Display.draw(this.snakes, this.apple);
            }
        }
    }


    /**
     * Returns a 2D array of coordinates with the spaces occupied by the players filtered out
     * @returns {Array}
     */
    static #getEmptySquares() {
        const allSquares = [];
        for (let y = 0; y < Constants.rows; y++) {
            for (let x = 0; x < Constants.columns; x++) {
                allSquares.push([x, y]);
            }
        }

        // Filter out squares that contain snake blocks.
        return allSquares.filter(square => {
            return this.snakes.every(snake => {
                return snake.coords.every(snakeBlock => {
                    // If a snake is occupying this coordinate, mark it as unavailable
                    if (Utils.coordsEqual(snakeBlock, square)) {
                        return false;
                    } else {
                        return true;
                    };
                });
            });
        });
    }


    /**
     * Places an apple on one of the board's empty spaces
     * @param {Array} emptySquares 
     */
    static #spawnApple(emptySquares) {
        const i = Utils.getRandomInt(0, emptySquares.length - 1);
        this.apple = emptySquares[i];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Game.run();
})