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

    /**
     * The coordinates of the tail before the snake is moved one space.
     * Used to extend the length of the snake if the apple is eaten
     */
    #lastTailBlock = [0,0];
    
    /**
     * The number of this player. Used for various purposed in the multiplayer modes.
     */
    playerNumber;

    /**
     * A queue of direction constants to facilitate responsive multi-tap input
     */
    #inputQueue = [];

    /**
     * The size limit of #inputQueue
     */
    #inputQueueLimit = 10;
    
    /**
     * Stores whether the multi-tap
     */
    #queueInUse = false;

    /**
     * The index used for selecting an element of #startingConfig in the constructor
     */
    #startingConfig;

    /**
     * An array that stores various starting configurations for the snake.
     * Gives position and direction.
     * Different players should have different starting configs.
     */
    static #startingConfigs = [
        {
            position: [
                [1, 1],
                [1, 1]
            ],
            direction: Constants.dir.right
        },
        {
            position: [
                [Constants.columns - 3, Constants.rows - 2],
                [Constants.columns - 2, Constants.rows - 2]
            ],
            direction: Constants.dir.left
        }
    ];


    /**
     * Initialises the snake
     * @param {number} playerNumber 
     */
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.#startingConfig = Snake.#startingConfigs[playerNumber - 1];
        this.#init();
        this.#initControls();
    }


    /**
     * Set the snake's coordinates to the starting position
     */
    #init() {
        // Creates a deep copy of the starting position
        this.coords = this.#startingConfig.position.map(coord => {
            return [...coord];
        });
        this.direction = this.#startingConfig.direction;
    }

    
    /**
     * Adds the event listeners for the player input
     */
    #initControls() {
        /*
        TO DO: For online multiplayer, no event listener should be added if this
        snake represents the opposing player.
        */
        document.addEventListener("keydown", e => {
            let inputAction;

            if (Game.gameMode === Constants.gameModes.multiLocal) {
                inputAction = this.#getInputAction(this.playerNumber, e.code);
            } else {
                inputAction = this.#getInputAction(1, e.code);
            }
            
            switch (inputAction) {
                case Constants.inputAction.up:
                case Constants.inputAction.down:
                case Constants.inputAction.left:
                case Constants.inputAction.right:
                    e.preventDefault();
                    this.#queueInUse = true;
                    this.#handleDirectionalInput(inputAction);
                    break;
            }
        });
    }


    /**
     * Gets the inputAction constant based on the player number of the snake
     * The difference in player number is only relevant in local multiplayer
     * All other game modes will assume the player 1 controls
     * @param {number} actionSet
     * @param {string} keyCode 
     * @returns {string}
     */
    #getInputAction(actionSet, keyCode) {
        return Constants.inputActionMap[actionSet][keyCode];
    }


    /**
     * Performs the associated task based on the key being pressed
     * @param {string} inputAction
     */
    #handleDirectionalInput(inputAction) {
        switch (inputAction) {
            case Constants.inputAction.up:
                this.#addDirectionToInputQueue(Constants.dir.up);
                break;
            case Constants.inputAction.down:
                this.#addDirectionToInputQueue(Constants.dir.down);
                break;
            case Constants.inputAction.left:
                this.#addDirectionToInputQueue(Constants.dir.left);
                break;
            case Constants.inputAction.right:
                this.#addDirectionToInputQueue(Constants.dir.right);
                break;
        }
    }


    /*
    #setNewDirection(dir) {
        if (this.#newDirection === Constants.dir.none) {
            this.#newDirection = dir;
        }
    }
    */


    /**
     * Adds a direction constant value to the end of #inputQueue
     * @param {string} dir
     */
    #addDirectionToInputQueue(dir) {
        if (this.#inputQueue.length <= this.#inputQueueLimit &&
            this.#inputQueue[this.#inputQueue.length - 1] !== dir
        ) {
            this.#inputQueue.push(dir);
        }
    }


    /**
     * Removes a value from the start of #inputQueue
     */
    #removeFromInputQueue() {
        this.#inputQueue.splice(0, 1);
    }

    
    /** 
     * Movement is implemented in reverse.
     * The last block is moved into the position of the next one.
     * And the next block is moved into the position of the one after.
     * The process is repeated until the head.
     * Then the head is moved in the requested direction.
     */
    update() {
        this.#updateDirectionUsingQueue();
        this.#newDirection = Constants.dir.none;
        this.#moveTail();
        this.#moveBlock(this.coords[0], this.direction);
        this.#resetQueueCheck();
    }


    /*
    #updateDirection() {
        if (Utils.areOppositeDirections(this.#newDirection, this.direction)) {
            return;
        }

        if (this.#newDirection === Constants.dir.none) {
            return;
        }

        this.direction = this.#newDirection;
    }
    */


    /**
     * Updates the direction based on the first element of #inputQueue (i.e. the front)
     * If the direction is the opposite of the current direction, it is removed and the next value is used instead
     */
    #updateDirectionUsingQueue() {
        let validDirection = false;
        do {
            if (this.#inputQueue.length === 0) {
                return;
            }

            if (Utils.areOppositeDirections(this.#inputQueue[0], this.direction)) {
                this.#removeFromInputQueue();
            } else {
                validDirection = true;
            }
        } while (validDirection === false);

        this.direction = this.#inputQueue[0];
        this.#removeFromInputQueue();
    }


    /**
     * Checks the collisions and returns true if there is a collision, otherwise returns false
     * Called by the Game's #update function after the Snake's update function is called
     */
    checkCollision(snakes, apple) {
        const currentHead = this.coords[0];
        let collisionFlag = Constants.collisionFlag.none;

        // Apple collision
        if (Utils.coordsEqual(currentHead, apple)) {
            //Game.apple = null;
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
        snakes.forEach(snake => {
            snake.coords.forEach((coord, i) => {
                //const block = this.coords[i];

                // If this is the head of the current snake, ignore it
                if (i === 0 && this.playerNumber === snake.playerNumber) {
                    return;
                }

                if (Utils.coordsEqual(currentHead, coord)) {
                    collisionFlag = Constants.collisionFlag.collision;
                }
            });
        });
        
        return collisionFlag;
    }


    /**
     * Takes in a coordinate and a direction, and moves the coordinate one step in that direction
     * @param {Array} block 
     * @param {string} direction 
     */
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


    /**
     * Shifts everything in coords one position in the array forward.
     * The first element is left the same as the second element.
     * The last element is overwritten, but saved in #lastTailBlock.
     */
    #moveTail() {
        this.#lastTailBlock = this.coords[this.coords.length - 1];
        for (let i = this.coords.length - 1; i >= 1; i--) {
            const nextBlock = this.coords[i - 1];
            this.coords[i] = [nextBlock[0], nextBlock[1]];
        }
    }


    /**
     * Responsible for determining if the input queue is being used, and clears it if not.
     */
    #resetQueueCheck() {
        if (this.#queueInUse) {
            this.#queueInUse = false
        } else {
            if (this.#inputQueue.length > 0) {
                this.#inputQueue = [this.#inputQueue[this.#inputQueue.length - 1]];
            } else {
                this.#inputQueue = [];
            }
        }
    }
}