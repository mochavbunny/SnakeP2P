"use strict";

class Snake {
    /**
     * The first element is the head.
     * The last element is the last block of the tail.
     *
     * Example snake: [[1, 0], [2, 0]]
    */
    coords;

    /**
     * up, down, left or right.
     */
    direction;

    //static #snakeDirection;
    /**
     * Direction which we request the snake moves in on the next update().
     * If it's not null and not the opposite to the #snakeDirection, it will be applied.
     */
    #newDirection = Constants.dir.none;

    #lastTailBlock = [0,0];
    
    playerNumber;

    wins = 0;

    
    static #startingConfigs = [
        {
            position: [
                [2, 1],
                [1, 1]
            ],
            direction: Constants.dir.right
        },
        {
            position: [
                [Constants.columns - 3, Constants.columns - 2],
                [Constants.rows - 2, Constants.rows - 2]
            ],
            direction: Constants.dir.left
        }
    ];

    #startingConfig;


    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.#startingConfig = Snake.#startingConfigs[playerNumber - 1];
        this.#init();
        this.#initControls();
    }


    #init(coords) {
        // Creates a deep copy of the starting position
        this.coords = this.#startingConfig.position.map(coord => {
            return [...coord];
        });
        this.direction = this.#startingConfig.direction;
    }


    #initControls() {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    this.#newDirection = Constants.dir.up;
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    this.#newDirection = Constants.dir.down;
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.#newDirection = Constants.dir.left;
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    this.#newDirection = Constants.dir.right;
                    break;
            }
        })
    }


    update() {
        this.#updateDirection();
        this.#moveSnake()
    }


    #updateDirection() {
        if (this.#newDirection === Constants.dir.none) {
            return;
        }

        if (Utils.areOppositeDirections(this.#newDirection, this.direction)) {
            return;
        }

        this.direction = this.#newDirection;
        this.#newDirection = Constants.dir.none;
    }


    /**
     * Movement is implemented in reverse.
     * The last block is moved into the position of the next one.
     * And the next block is moved into the position of the one after.
     * The process is repeated until the head.
     * Then the head is moved in the requested direction.
     */
    #moveSnake() {
        this.#moveTail();
        this.#moveBlock(this.coords[0], this.direction);
    }


    /**
     * Checks the collisions and returns true if there is a collision, otherwise returns false
     */
    checkCollision() {
        const currentHead = this.coords[0];
        let collisionFlag = Constants.collisionFlag.none;

        // Apple collision
        if (Utils.coordsEqual(currentHead, Game.apple)) {
            Game.apple = null;
            this.coords.push([...this.#lastTailBlock]);
            collisionFlag = Constants.collisionFlag.apple;
        }

        // Wall collisions
        const horizontalCollision = currentHead[0] < 0 || currentHead[0] > Constants.columns - 1;
        const verticalCollision = currentHead[1] < 0 || currentHead[1] > Constants.rows - 1;

        if (horizontalCollision || verticalCollision) {
            collisionFlag = Constants.collisionFlag.collision;
        }

        // Snake collisions
        Game.snakes.forEach(snake => {
            snake.coords.forEach((coord, i) => {
                const block = this.coords[i];

                // If this is the head of the current snake, ignore it
                if (i === 0 && this.playerNumber === snake.playerNumber) {
                    return;
                }

                if (Utils.coordsEqual(currentHead, block)) {
                    collisionFlag = Constants.collisionFlag.collision;
                }
            });
        });
        
        return collisionFlag;
    }


    #moveBlock(block, direction) {
        switch (direction) {
            case Constants.dir.left:
                block[0] -= 1;
                break;
            case Constants.dir.right:
                block[0] += 1;
                break;
            case Constants.dir.up:
                block[1] -= 1;
                break;
            case Constants.dir.down:
                block[1] += 1;
                break;
        }
    }


    #moveTail() {
        // Save the current tail block in case 
        this.#lastTailBlock = this.coords[this.coords.length - 1];
        for (let i = this.coords.length - 1; i >= 1; i--) {
            const nextBlock = this.coords[i - 1];
            this.coords[i] = [nextBlock[0], nextBlock[1]];
        }
    }
}