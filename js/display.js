"use strict";

class Display {
    static #backgroundColor = "#e0e0e0";
    static #blankSquareColor = "#c0c0c0";
    static #player1BodyColor = "#00FF00";
    static #player1HeadColor = "#00D700";
    static #player2BodyColor = "#00EFFF";
    static #player2HeadColor = "#00CFFF";
    static #appleColor = "#FF0000";

    static #squareMarginPercent = 5;

    static #defaultWidth = 800;
    static #defaultHeight = 600;


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


    static draw(snake, apple) {
        this.clear();
        this.drawField();

        if (typeof snake !== "undefined") {
            this.drawSnake(snake, this.#player1HeadColor, this.#player1BodyColor);

            if (Game.multiplayer) {
                this.drawSnake(snake, this.#player2HeadColor, this.#player2BodyColor);
            }
        }

        if (typeof apple !== "undefined") {
            this.drawApple(apple);
        }
    }


    static drawField() {
        this.drawBackground();

        for (let row = 0; row < Constants.rows; row++) {
            for (let col = 0; col < Constants.columns; col++) {
                this.drawSquare(col, row, this.#blankSquareColor);
            }
        }
    }


    static drawBackground() {
        this.ctx.fillStyle = this.#backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    static drawSquare(col, row, color) {
        let x = col * this.squareWidth + this.squareMarginX;
        let y = row * this.squareHeight + this.squareMarginY;
        let width = this.squareWidth - (this.squareMarginX * 2);
        let height = this.squareHeight - (this.squareMarginY * 2);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }


    static drawSnake(snake, headColor, bodyColor) {
        snake.forEach((block, index) => {
            const snakeColor = (index === 0) ? headColor : bodyColor;
            this.drawSquare(block[0], block[1], snakeColor);
        })
    }


    static drawApple(apple) {
        this.drawSquare(apple[0], apple[1], this.#appleColor);
    }
    

    static clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}