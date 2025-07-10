"use strict";

class Display {
    constructor(
        width = 800,
        height = 600,
        columns = 20,
        rows = 15,
        squareMarginPercent = 5,
        backgroundColor = "#e0e0e0",
        blankSquareColor = "#c0c0c0",
        filledSquareColor = "#505050"
    ) {
        const canvas = document.getElementById("game-canvas");
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext("2d");

        this.width = width;
        this.height = height;

        // These values should be set by the Game class
        this.columns = columns;
        this.rows = rows;

        this.squareWidth = this.width / this.columns;
        this.squareHeight = this.height / this.rows;
        this.squareMarginX = this.squareWidth * (squareMarginPercent / 100);
        this.squareMarginY = this.squareHeight * (squareMarginPercent / 100);

        this.backgroundColor = backgroundColor;
        this.blankSquareColor = blankSquareColor;
        this.filledSquareColor = filledSquareColor;

        //========= FOR TESTING ==========
        let drawTest = document.getElementById("draw-test");
        drawTest.children[0].addEventListener("click", () => this.draw({snake: [], apple: []}));
        drawTest.children[1].addEventListener("click", () => this.drawSnake([
            [1,1], [2,1], [3,1], [4,1], [4,2], [4,3]
        ]));
        drawTest.children[2].addEventListener("click", () => this.drawApple([6,5]));
    }


    draw(e) {
        this.clear();
        this.drawField();

        if (e.snake) {
            this.drawSnake(e.snake);
        }

        if (e.apple) {
            this.drawApple(e.apple);
        }
    }


    drawField() {
        this.drawBackground();

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.drawSquare(col, row, this.blankSquareColor);
            }
        }
    }


    drawBackground() {
        this.ctx.fillStyle = this.backgroundColor;
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
            this.drawSquare(block[0], block[1], this.filledSquareColor);
        })
    }


    drawApple(apple) {
        this.drawSquare(apple[0], apple[1], this.filledSquareColor);
    }
    

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}