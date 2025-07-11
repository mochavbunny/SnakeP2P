"use strict";

class Display {
    constructor(
        canvasID = "game-canvas",
        width = Constants.defaultWidth,
        height = Constants.defaultHeight
    ) {
        const canvas = document.getElementById(canvasID);
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext("2d");

        this.width = width;
        this.height = height;

        this.squareWidth = this.width / Constants.columns;
        this.squareHeight = this.height / Constants.rows;
        this.squareMarginX = this.squareWidth * (Constants.squareMarginPercent / 100);
        this.squareMarginY = this.squareHeight * (Constants.squareMarginPercent / 100);
    }


    draw(snake, apple) {
        this.clear();
        this.drawField();

        if (typeof snake !== undefined) {
            this.drawSnake(snake);
        }

        if (typeof apple !== undefined) {
            this.drawApple(apple);
        }
    }


    drawField() {
        this.drawBackground();

        for (let row = 0; row < Constants.rows; row++) {
            for (let col = 0; col < Constants.columns; col++) {
                this.drawSquare(col, row, Constants.blankSquareColor);
            }
        }
    }


    drawBackground() {
        this.ctx.fillStyle = Constants.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    drawSquare(col, row, color) {
        let x = col * this.squareWidth + this.squareMarginX;
        let y = row * this.squareHeight + this.squareMarginY;
        let width = this.squareWidth - (this.squareMarginX * 2);
        let height = this.squareHeight - (this.squareMarginY * 2);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }


    drawSnake(snake) {
        snake.forEach(block => {
            this.drawSquare(block[0], block[1], Constants.filledSquareColor);
        })
    }


    drawApple(apple) {
        this.drawSquare(apple[0], apple[1], Constants.filledSquareColor);
    }
    

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

new Display();