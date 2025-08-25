"use strict";

class Game {
    static #display;

    static snakes = [];
    
    static #isGameOver = false;
    static #isPaused = true;
    static #updateInterval;
    static gameMode;
    static startingCoords;

    static apple;


    static run() {
        Display.initialize();
        
        Menu.setMenu(Constants.menuPages.gameMode);
        this.#initButtons();
        Display.draw();
    }


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
            alert("Coming soon!");
            /*Menu.hideMenu();
            //this.gameMode = Constants.gameModes.multiOnline;
            this.gameMode = Constants.gameModes.multiLocal;
            this.#initGame();
            */
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
        let collisionFlag = Constants.collisionFlag.none;

        if (!this.#isPaused && !this.#isGameOver) {
            this.snakes.forEach(snake => snake.update());

            const collisionSet = [];
            this.snakes.forEach(snake => {
                collisionFlag = snake.checkCollision();
                if (collisionFlag === Constants.collisionFlag.collision) {
                    collisionSet.push(snake);
                }
            });

            if (collisionSet.length > 0) {
                this.#isGameOver = true;
                // TO DO: functionality for determining winner
                
            } else {
                // Apple was consumed.
                if (collisionFlag === Constants.collisionFlag.apple) {
                    const emptySquares = this.#getEmptySquares();

                    if (emptySquares.length > 0) {
                        this.#spawnApple(emptySquares);
                    } else {
                        alert("You won");
                        this.#isGameOver = true;
                    }
                }

                Display.draw(this.snakes, this.apple);
            }
        } else if (this.#isGameOver) {
            clearInterval(this.#updateInterval);
            Menu.setMenu(Constants.menuPages.gameOver);
            Menu.showMenu();
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
        return allSquares.filter(square => {
            return this.snakes.every(snake => {
                return snake.coords.every(snakeBlock => {
                    if (snakeBlock[0] === square[0] && snakeBlock[1] === square[1]) {
                        return false;
                    } else {
                        return true;
                    };
                });
            });
        });
    }


    static #spawnApple(emptySquares) {
        const i = Utils.getRandomInt(0, emptySquares.length - 1);
        this.apple = emptySquares[i];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Game.run();
})