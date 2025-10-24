"use strict";

class Display {
    /*
    Stores colours for various things that will be rendered.
    */
    static #backgroundColor = "#e0e0e0";
    static #blankSquareColor = "#c0c0c0";
    static #bodyColors = ["#00FF00", "#00EFFF"];
    static #headColors = ["#00D700", "#00CFFF"];
    static #appleColor = "#FF0000";

    /**
     * Percentage of the height and width of the squares used to define the space between squares
     */
    static #squareMarginPercent = 5;

    /**
     * The default width of the display
     */
    static #defaultWidth = 800;

    /**
     * The default height of the display
     */
    static #defaultHeight = 600;


    /**
     * Initializes various things needed for rendering the display, including retrieving the canvas and setting up calculated values
     * @param {string} canvasID 
     * @param {number} width 
     * @param {number} height 
     */
    static initialize(
        canvasID = "game-canvas",
        width = this.#defaultWidth,
        height = this.#defaultHeight
    ) {
        const canvas = document.getElementById(canvasID);
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext("2d");

        this.width = width;
        this.height = height;

        this.squareWidth = this.width / Constants.columns;
        this.squareHeight = this.height / Constants.rows;
        this.squareMarginX = this.squareWidth * (this.#squareMarginPercent / 100);
        this.squareMarginY = this.squareHeight * (this.#squareMarginPercent / 100);
    }


    /**
     * Takes an array of snake coordinates, and an apple coordinate, and draws a frame of the game's display
     * @param {Array} snakes 
     * @param {Array} apple 
     */
    static draw(snakes, apple) {
        this.clear();
        this.drawField();

        if (typeof snakes !== "undefined") {
            snakes.forEach((snake, index) => {
                this.drawSnake(snake, this.#headColors[index], this.#bodyColors[index]);
            });
        }

        if (typeof apple !== "undefined") {
            this.drawApple(apple);
        }
    }


    /**
     * Draws the grid that the snakes move around in.
     * Uses #blankSquareColor for the squares' colour
     */
    static drawField() {
        this.drawBackground();

        for (let row = 0; row < Constants.rows; row++) {
            for (let col = 0; col < Constants.columns; col++) {
                this.drawSquare(col, row, this.#blankSquareColor);
            }
        }
    }


    /**
     * Draws a static background colour based on #backgroundColor
     */
    static drawBackground() {
        this.ctx.fillStyle = this.#backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    /**
     * Draws a square for a given row, column, and colour
     * Intended for drawing as part of a grid
     * The size is determined by squareWidth, squareHeight, 
     * The position is determined by the aforementioned size, squareMarginX, squareMarginY
     * @param {number} col 
     * @param {number} row 
     * @param {string} color 
     */
    static drawSquare(col, row, color) {
        let x = col * this.squareWidth + this.squareMarginX;
        let y = row * this.squareHeight + this.squareMarginY;
        let width = this.squareWidth - (this.squareMarginX * 2);
        let height = this.squareHeight - (this.squareMarginY * 2);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }


    /**
     * Draws a given snake on the grid using the given headColor and bodyColor
     * @param {Snake} snake 
     * @param {string} headColor 
     * @param {string} bodyColor 
     */
    static drawSnake(snake, headColor, bodyColor) {
        snake.coords.forEach((block, index) => {
            const snakeColor = (index === 0) ? headColor : bodyColor;
            this.drawSquare(block[0], block[1], snakeColor);
        })
    }


    /**
     * Draws an apple on the grid at the given coordinate
     * @param {Array} apple 
     */
    static drawApple(apple) {
        this.drawSquare(apple[0], apple[1], this.#appleColor);
    }
    

    /**
     * Clear what's rendered on the canvas
     */
    static clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}